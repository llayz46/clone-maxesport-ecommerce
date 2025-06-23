import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\WishlistController::index
 * @see app/Http/Controllers/WishlistController.php:34
 * @route '/wishlist'
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
    url: '/wishlist',
}

/**
* @see \App\Http\Controllers\WishlistController::index
 * @see app/Http/Controllers/WishlistController.php:34
 * @route '/wishlist'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WishlistController::index
 * @see app/Http/Controllers/WishlistController.php:34
 * @route '/wishlist'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WishlistController::index
 * @see app/Http/Controllers/WishlistController.php:34
 * @route '/wishlist'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WishlistController::add
 * @see app/Http/Controllers/WishlistController.php:44
 * @route '/wishlist/add'
 */
export const add = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: add.url(options),
    method: 'post',
})

add.definition = {
    methods: ['post'],
    url: '/wishlist/add',
}

/**
* @see \App\Http\Controllers\WishlistController::add
 * @see app/Http/Controllers/WishlistController.php:44
 * @route '/wishlist/add'
 */
add.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WishlistController::add
 * @see app/Http/Controllers/WishlistController.php:44
 * @route '/wishlist/add'
 */
add.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: add.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WishlistController::remove
 * @see app/Http/Controllers/WishlistController.php:63
 * @route '/wishlist/remove'
 */
export const remove = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: remove.url(options),
    method: 'post',
})

remove.definition = {
    methods: ['post'],
    url: '/wishlist/remove',
}

/**
* @see \App\Http\Controllers\WishlistController::remove
 * @see app/Http/Controllers/WishlistController.php:63
 * @route '/wishlist/remove'
 */
remove.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return remove.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WishlistController::remove
 * @see app/Http/Controllers/WishlistController.php:63
 * @route '/wishlist/remove'
 */
remove.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: remove.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WishlistController::clear
 * @see app/Http/Controllers/WishlistController.php:80
 * @route '/wishlist/clear'
 */
export const clear = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clear.url(options),
    method: 'post',
})

clear.definition = {
    methods: ['post'],
    url: '/wishlist/clear',
}

/**
* @see \App\Http\Controllers\WishlistController::clear
 * @see app/Http/Controllers/WishlistController.php:80
 * @route '/wishlist/clear'
 */
clear.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return clear.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WishlistController::clear
 * @see app/Http/Controllers/WishlistController.php:80
 * @route '/wishlist/clear'
 */
clear.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clear.url(options),
    method: 'post',
})
const wishlist = {
    index,
add,
remove,
clear,
}

export default wishlist