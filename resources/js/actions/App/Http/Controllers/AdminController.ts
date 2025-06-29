import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::__invoke
 * @see app/Http/Controllers/AdminController.php:9
 * @route '/admin'
 */
const AdminController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: AdminController.url(options),
    method: 'get',
})

AdminController.definition = {
    methods: ['get','head'],
    url: '/admin',
}

/**
* @see \App\Http\Controllers\AdminController::__invoke
 * @see app/Http/Controllers/AdminController.php:9
 * @route '/admin'
 */
AdminController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return AdminController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::__invoke
 * @see app/Http/Controllers/AdminController.php:9
 * @route '/admin'
 */
AdminController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: AdminController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::__invoke
 * @see app/Http/Controllers/AdminController.php:9
 * @route '/admin'
 */
AdminController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: AdminController.url(options),
    method: 'head',
})
export default AdminController