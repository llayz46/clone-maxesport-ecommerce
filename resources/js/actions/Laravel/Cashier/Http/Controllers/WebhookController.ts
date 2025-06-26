import { queryParams, type QueryParams } from './../../../../../wayfinder'
/**
* @see \Laravel\Cashier\Http\Controllers\WebhookController::handleWebhook
 * @see vendor/laravel/cashier/src/Http/Controllers/WebhookController.php:40
 * @route '/stripe/webhook'
 */
export const handleWebhook = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: handleWebhook.url(options),
    method: 'post',
})

handleWebhook.definition = {
    methods: ['post'],
    url: '/stripe/webhook',
}

/**
* @see \Laravel\Cashier\Http\Controllers\WebhookController::handleWebhook
 * @see vendor/laravel/cashier/src/Http/Controllers/WebhookController.php:40
 * @route '/stripe/webhook'
 */
handleWebhook.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return handleWebhook.definition.url + queryParams(options)
}

/**
* @see \Laravel\Cashier\Http\Controllers\WebhookController::handleWebhook
 * @see vendor/laravel/cashier/src/Http/Controllers/WebhookController.php:40
 * @route '/stripe/webhook'
 */
handleWebhook.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: handleWebhook.url(options),
    method: 'post',
})
const WebhookController = { handleWebhook }

export default WebhookController