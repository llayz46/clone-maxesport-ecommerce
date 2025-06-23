import { queryParams, type QueryParams } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\WishlistController::store
 * @see app/Http/Controllers/WishlistController.php:44
 * @route '/wishlist/add'
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/wishlist/add',
}

/**
* @see \App\Http\Controllers\WishlistController::store
 * @see app/Http/Controllers/WishlistController.php:44
 * @route '/wishlist/add'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WishlistController::store
 * @see app/Http/Controllers/WishlistController.php:44
 * @route '/wishlist/add'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WishlistController::update
 * @see app/Http/Controllers/WishlistController.php:63
 * @route '/wishlist/remove'
 */
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/wishlist/remove',
}

/**
* @see \App\Http\Controllers\WishlistController::update
 * @see app/Http/Controllers/WishlistController.php:63
 * @route '/wishlist/remove'
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WishlistController::update
 * @see app/Http/Controllers/WishlistController.php:63
 * @route '/wishlist/remove'
 */
update.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WishlistController::destroy
 * @see app/Http/Controllers/WishlistController.php:80
 * @route '/wishlist/clear'
 */
export const destroy = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: destroy.url(options),
    method: 'post',
})

destroy.definition = {
    methods: ['post'],
    url: '/wishlist/clear',
}

/**
* @see \App\Http\Controllers\WishlistController::destroy
 * @see app/Http/Controllers/WishlistController.php:80
 * @route '/wishlist/clear'
 */
destroy.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WishlistController::destroy
 * @see app/Http/Controllers/WishlistController.php:80
 * @route '/wishlist/clear'
 */
destroy.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: destroy.url(options),
    method: 'post',
})
const WishlistController = { index, store, update, destroy }

export default WishlistController