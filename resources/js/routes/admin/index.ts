import { queryParams, type QueryParams } from './../../wayfinder'
import categories from './categories'
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:9
 * @route '/admin'
 */
export const dashboard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ['get','head'],
    url: '/admin',
}

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:9
 * @route '/admin'
 */
dashboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:9
 * @route '/admin'
 */
dashboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:9
 * @route '/admin'
 */
dashboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: dashboard.url(options),
    method: 'head',
})
const admin = {
    dashboard,
categories,
}

export default admin