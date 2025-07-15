<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Relations\Relation;

trait StockFilterable
{
    /**
     * Applique les filtres de stock à la requête
     *
     * @param Relation $query
     * @param bool $in Produits en stock
     * @param bool $out Produits hors stock
     * @return Relation
     */
    protected function applyStockFilter(Relation $query, bool $in, bool $out): Relation
    {
        if ($in && !$out) {
            $query->where('stock', '>', 0);
        } elseif (!$in && $out) {
            $query->where('stock', '=', 0);
        }

        return $query;
    }
}
