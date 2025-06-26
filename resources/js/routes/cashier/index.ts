import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \Laravel\Cashier\Http\Controllers\PaymentController::payment
 * @see vendor/laravel/cashier/src/Http/Controllers/PaymentController.php:30
 * @route '/stripe/payment/{id}'
 */
export const payment = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: payment.url(args, options),
    method: 'get',
})

payment.definition = {
    methods: ['get','head'],
    url: '/stripe/payment/{id}',
}

/**
* @see \Laravel\Cashier\Http\Controllers\PaymentController::payment
 * @see vendor/laravel/cashier/src/Http/Controllers/PaymentController.php:30
 * @route '/stripe/payment/{id}'
 */
payment.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return payment.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Laravel\Cashier\Http\Controllers\PaymentController::payment
 * @see vendor/laravel/cashier/src/Http/Controllers/PaymentController.php:30
 * @route '/stripe/payment/{id}'
 */
payment.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: payment.url(args, options),
    method: 'get',
})
/**
* @see \Laravel\Cashier\Http\Controllers\PaymentController::payment
 * @see vendor/laravel/cashier/src/Http/Controllers/PaymentController.php:30
 * @route '/stripe/payment/{id}'
 */
payment.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: payment.url(args, options),
    method: 'head',
})

/**
* @see \Laravel\Cashier\Http\Controllers\WebhookController::webhook
 * @see vendor/laravel/cashier/src/Http/Controllers/WebhookController.php:40
 * @route '/stripe/webhook'
 */
export const webhook = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: webhook.url(options),
    method: 'post',
})

webhook.definition = {
    methods: ['post'],
    url: '/stripe/webhook',
}

/**
* @see \Laravel\Cashier\Http\Controllers\WebhookController::webhook
 * @see vendor/laravel/cashier/src/Http/Controllers/WebhookController.php:40
 * @route '/stripe/webhook'
 */
webhook.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return webhook.definition.url + queryParams(options)
}

/**
* @see \Laravel\Cashier\Http\Controllers\WebhookController::webhook
 * @see vendor/laravel/cashier/src/Http/Controllers/WebhookController.php:40
 * @route '/stripe/webhook'
 */
webhook.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: webhook.url(options),
    method: 'post',
})
const cashier = {
    payment,
webhook,
}

export default cashier