import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CategoryController::__invoke
 * @see app/Http/Controllers/CategoryController.php:13
 * @route '/categories/{category}'
 */
const CategoryController = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: CategoryController.url(args, options),
    method: 'get',
})

CategoryController.definition = {
    methods: ['get','head'],
    url: '/categories/{category}',
}

/**
* @see \App\Http\Controllers\CategoryController::__invoke
 * @see app/Http/Controllers/CategoryController.php:13
 * @route '/categories/{category}'
 */
CategoryController.url = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { category: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.slug
                : args.category,
                }

    return CategoryController.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::__invoke
 * @see app/Http/Controllers/CategoryController.php:13
 * @route '/categories/{category}'
 */
CategoryController.get = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: CategoryController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryController::__invoke
 * @see app/Http/Controllers/CategoryController.php:13
 * @route '/categories/{category}'
 */
CategoryController.head = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: CategoryController.url(args, options),
    method: 'head',
})
export default CategoryController