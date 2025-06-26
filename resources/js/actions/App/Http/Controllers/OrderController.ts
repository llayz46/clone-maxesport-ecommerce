import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:13
 * @route '/orders'
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
    url: '/orders',
}

/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:13
 * @route '/orders'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:13
 * @route '/orders'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:13
 * @route '/orders'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OrderController::invoice
 * @see app/Http/Controllers/OrderController.php:0
 * @route '/orders/{order}/invoice'
 */
export const invoice = (args: { order: string | number } | [order: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: invoice.url(args, options),
    method: 'post',
})

invoice.definition = {
    methods: ['post'],
    url: '/orders/{order}/invoice',
}

/**
* @see \App\Http\Controllers\OrderController::invoice
 * @see app/Http/Controllers/OrderController.php:0
 * @route '/orders/{order}/invoice'
 */
invoice.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    const parsedArgs = {
                        order: args.order,
                }

    return invoice.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::invoice
 * @see app/Http/Controllers/OrderController.php:0
 * @route '/orders/{order}/invoice'
 */
invoice.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: invoice.url(args, options),
    method: 'post',
})
const OrderController = { index, invoice }

export default OrderController