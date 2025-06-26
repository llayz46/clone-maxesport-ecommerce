import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CartController::success
 * @see app/Http/Controllers/CartController.php:138
 * @route '/checkout/success'
 */
export const success = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ['get','head'],
    url: '/checkout/success',
}

/**
* @see \App\Http\Controllers\CartController::success
 * @see app/Http/Controllers/CartController.php:138
 * @route '/checkout/success'
 */
success.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::success
 * @see app/Http/Controllers/CartController.php:138
 * @route '/checkout/success'
 */
success.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: success.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::success
 * @see app/Http/Controllers/CartController.php:138
 * @route '/checkout/success'
 */
success.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: success.url(options),
    method: 'head',
})
const checkout = {
    success,
}

export default checkout