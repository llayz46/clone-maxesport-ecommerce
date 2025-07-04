<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Category\HandleCategory;
use App\Actions\Product\HandleProduct;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * @var HandleProduct
     */
    protected HandleProduct $handleProduct;

    /**
     * Admin\ProductController constructor.
     *
     * @param HandleProduct $handleProduct
     */
    public function __construct(HandleProduct $handleProduct)
    {
        $this->handleProduct = $handleProduct;
    }

    public function index(Request $request)
    {
        $search = trim($request->input('search'));

        $query = Product::query()->with('brand');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('slug', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        return Inertia::render('admin/products/index', [
            'breadcrumbs' => [
                ['title' => 'Admin', 'href' => route('admin.dashboard')],
                ['title' => 'Produits', 'href' => route('admin.products.index')],
            ],
            'search' => fn () => $search,
            'products' => Inertia::defer(fn () => ProductResource::collection($query->paginate(16)->withQueryString())),
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('admin/products/show', [
            'breadcrumbs' => [
                ['title' => 'Admin', 'href' => route('admin.dashboard')],
                ['title' => 'Produits', 'href' => route('admin.products.index')],
                ['title' => $product->name, 'href' => route('admin.products.show', $product)],
            ],
            'product' => fn () => ProductResource::make($product->load(['images', 'brand', 'categories', 'group'])),
        ]);
    }

    public function store(Request $request)
    {
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'breadcrumbs' => [
                ['title' => 'Admin', 'href' => route('admin.dashboard')],
                ['title' => 'Produits', 'href' => route('admin.products.index')],
                ['title' => $product->name, 'href' => route('admin.products.show', $product)],
                ['title' => 'Modifier', 'href' => route('admin.products.edit', $product)],
            ],
            'product' => fn () => ProductResource::make($product->load(['images', 'brand:id,name', 'categories:id,parent_id', 'group:id,name'])),
//            'group.products:id,name,product_group_id,created_at,updated_at'
            'brands' => fn () => Brand::select('id', 'name')->orderBy('name')->get(),
            'groups' => fn () => ProductGroup::select('id', 'name')->orderBy('name')->get()->load('products:id,name,product_group_id'),
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();

        try {
            $this->handleProduct->update($product, $data);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }

        return redirect()->route('admin.products.edit', $product);
    }

    public function destroy(Request $request, Product $product)
    {
        $request->validate(
            ['name' => 'required|in:' . $product->name],
            [
                'name.required' => 'Le nom du produit est requis.',
                'name.in' => 'Le nom saisi ne correspond pas au nom du produit à supprimer.',
            ]
        );

        try {
            $product->delete();
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Impossible de supprimer le produit.']);
        }

        return redirect()->route('admin.products.index');
    }
}
