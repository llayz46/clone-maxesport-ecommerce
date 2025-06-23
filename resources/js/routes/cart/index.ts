import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:33
 * @route '/cart'
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
    url: '/cart',
}

/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:33
 * @route '/cart'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:33
 * @route '/cart'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:33
 * @route '/cart'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CartController::add
 * @see app/Http/Controllers/CartController.php:47
 * @route '/cart/add'
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
    url: '/cart/add',
}

/**
* @see \App\Http\Controllers\CartController::add
 * @see app/Http/Controllers/CartController.php:47
 * @route '/cart/add'
 */
add.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::add
 * @see app/Http/Controllers/CartController.php:47
 * @route '/cart/add'
 */
add.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: add.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CartController::remove
 * @see app/Http/Controllers/CartController.php:76
 * @route '/cart/remove'
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
    url: '/cart/remove',
}

/**
* @see \App\Http\Controllers\CartController::remove
 * @see app/Http/Controllers/CartController.php:76
 * @route '/cart/remove'
 */
remove.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return remove.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::remove
 * @see app/Http/Controllers/CartController.php:76
 * @route '/cart/remove'
 */
remove.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: remove.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:97
 * @route '/cart/clear/{cart}'
 */
export const clear = (args: { cart: string | number } | [cart: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clear.url(args, options),
    method: 'post',
})

clear.definition = {
    methods: ['post'],
    url: '/cart/clear/{cart}',
}

/**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:97
 * @route '/cart/clear/{cart}'
 */
clear.url = (args: { cart: string | number } | [cart: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cart: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cart: args[0],
                }
    }

    const parsedArgs = {
                        cart: args.cart,
                }

    return clear.definition.url
            .replace('{cart}', parsedArgs.cart.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:97
 * @route '/cart/clear/{cart}'
 */
clear.post = (args: { cart: string | number } | [cart: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clear.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:110
 * @route '/cart/update'
 */
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/cart/update',
}

/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:110
 * @route '/cart/update'
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:110
 * @route '/cart/update'
 */
update.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})
const cart = {
    index,
add,
remove,
clear,
update,
}

export default cart