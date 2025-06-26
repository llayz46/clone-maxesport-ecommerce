import { queryParams, type QueryParams } from './../../../../../wayfinder'
/**
* @see \Laravel\Cashier\Http\Controllers\PaymentController::show
 * @see vendor/laravel/cashier/src/Http/Controllers/PaymentController.php:30
 * @route '/stripe/payment/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/stripe/payment/{id}',
}

/**
* @see \Laravel\Cashier\Http\Controllers\PaymentController::show
 * @see vendor/laravel/cashier/src/Http/Controllers/PaymentController.php:30
 * @route '/stripe/payment/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Laravel\Cashier\Http\Controllers\PaymentController::show
 * @see vendor/laravel/cashier/src/Http/Controllers/PaymentController.php:30
 * @route '/stripe/payment/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Laravel\Cashier\Http\Controllers\PaymentController::show
 * @see vendor/laravel/cashier/src/Http/Controllers/PaymentController.php:30
 * @route '/stripe/payment/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})
const PaymentController = { show }

export default PaymentController