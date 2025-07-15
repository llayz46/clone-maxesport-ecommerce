<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait StockFilterable
{
    /**
     * Applique les filtres de stock à la requête
     *
     * @param Builder $query
     * @param bool $in Produits en stock
     * @param bool $out Produits hors stock
     * @return Builder
     */
    protected function applyStockFilter(Builder $query, bool $in, bool $out): Builder
    {
        if ($in && !$out) {
            $query->where('stock', '>', 0);
        } elseif (!$in && $out) {
            $query->where('stock', '=', 0);
        }

        return $query;
    }
}
