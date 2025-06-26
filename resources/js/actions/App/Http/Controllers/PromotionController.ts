import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PromotionController::__invoke
 * @see app/Http/Controllers/PromotionController.php:12
 * @route '/promotions'
 */
const PromotionController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: PromotionController.url(options),
    method: 'get',
})

PromotionController.definition = {
    methods: ['get','head'],
    url: '/promotions',
}

/**
* @see \App\Http\Controllers\PromotionController::__invoke
 * @see app/Http/Controllers/PromotionController.php:12
 * @route '/promotions'
 */
PromotionController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return PromotionController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromotionController::__invoke
 * @see app/Http/Controllers/PromotionController.php:12
 * @route '/promotions'
 */
PromotionController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: PromotionController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PromotionController::__invoke
 * @see app/Http/Controllers/PromotionController.php:12
 * @route '/promotions'
 */
PromotionController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: PromotionController.url(options),
    method: 'head',
})
export default PromotionController