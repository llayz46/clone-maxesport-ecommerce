import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrandController::index
 * @see app/Http/Controllers/BrandController.php:16
 * @route '/brands'
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/brands',
}

/**
* @see \App\Http\Controllers\BrandController::index
 * @see app/Http/Controllers/BrandController.php:16
 * @route '/brands'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrandController::index
 * @see app/Http/Controllers/BrandController.php:16
 * @route '/brands'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrandController::index
 * @see app/Http/Controllers/BrandController.php:16
 * @route '/brands'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})
const BrandController = { index }

export default BrandController