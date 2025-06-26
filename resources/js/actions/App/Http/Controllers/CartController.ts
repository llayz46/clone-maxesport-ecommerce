import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CartController::checkout
 * @see app/Http/Controllers/CartController.php:138
 * @route '/checkout'
 */
export const checkout = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: checkout.url(options),
    method: 'get',
})

checkout.definition = {
    methods: ['get','head'],
    url: '/checkout',
}

/**
* @see \App\Http\Controllers\CartController::checkout
 * @see app/Http/Controllers/CartController.php:138
 * @route '/checkout'
 */
checkout.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::checkout
 * @see app/Http/Controllers/CartController.php:138
 * @route '/checkout'
 */
checkout.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: checkout.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::checkout
 * @see app/Http/Controllers/CartController.php:138
 * @route '/checkout'
 */
checkout.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: checkout.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CartController::success
 * @see app/Http/Controllers/CartController.php:165
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
 * @see app/Http/Controllers/CartController.php:165
 * @route '/checkout/success'
 */
success.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::success
 * @see app/Http/Controllers/CartController.php:165
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
 * @see app/Http/Controllers/CartController.php:165
 * @route '/checkout/success'
 */
success.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: success.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CartController::buy
 * @see app/Http/Controllers/CartController.php:152
 * @route '/checkout/{product}'
 */
export const buy = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: buy.url(args, options),
    method: 'get',
})

buy.definition = {
    methods: ['get','head'],
    url: '/checkout/{product}',
}

/**
* @see \App\Http\Controllers\CartController::buy
 * @see app/Http/Controllers/CartController.php:152
 * @route '/checkout/{product}'
 */
buy.url = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { product: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                }
    }

    const parsedArgs = {
                        product: typeof args.product === 'object'
                ? args.product.id
                : args.product,
                }

    return buy.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::buy
 * @see app/Http/Controllers/CartController.php:152
 * @route '/checkout/{product}'
 */
buy.get = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: buy.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::buy
 * @see app/Http/Controllers/CartController.php:152
 * @route '/checkout/{product}'
 */
buy.head = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: buy.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:37
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
 * @see app/Http/Controllers/CartController.php:37
 * @route '/cart'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:37
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
 * @see app/Http/Controllers/CartController.php:37
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
* @see \App\Http\Controllers\CartController::addItem
 * @see app/Http/Controllers/CartController.php:51
 * @route '/cart/add'
 */
export const addItem = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: addItem.url(options),
    method: 'post',
})

addItem.definition = {
    methods: ['post'],
    url: '/cart/add',
}

/**
* @see \App\Http\Controllers\CartController::addItem
 * @see app/Http/Controllers/CartController.php:51
 * @route '/cart/add'
 */
addItem.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return addItem.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::addItem
 * @see app/Http/Controllers/CartController.php:51
 * @route '/cart/add'
 */
addItem.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: addItem.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CartController::removeItem
 * @see app/Http/Controllers/CartController.php:80
 * @route '/cart/remove'
 */
export const removeItem = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: removeItem.url(options),
    method: 'post',
})

removeItem.definition = {
    methods: ['post'],
    url: '/cart/remove',
}

/**
* @see \App\Http\Controllers\CartController::removeItem
 * @see app/Http/Controllers/CartController.php:80
 * @route '/cart/remove'
 */
removeItem.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return removeItem.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::removeItem
 * @see app/Http/Controllers/CartController.php:80
 * @route '/cart/remove'
 */
removeItem.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: removeItem.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:101
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
 * @see app/Http/Controllers/CartController.php:101
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
 * @see app/Http/Controllers/CartController.php:101
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
* @see \App\Http\Controllers\CartController::handleItemQuantity
 * @see app/Http/Controllers/CartController.php:114
 * @route '/cart/update'
 */
export const handleItemQuantity = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: handleItemQuantity.url(options),
    method: 'put',
})

handleItemQuantity.definition = {
    methods: ['put'],
    url: '/cart/update',
}

/**
* @see \App\Http\Controllers\CartController::handleItemQuantity
 * @see app/Http/Controllers/CartController.php:114
 * @route '/cart/update'
 */
handleItemQuantity.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return handleItemQuantity.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::handleItemQuantity
 * @see app/Http/Controllers/CartController.php:114
 * @route '/cart/update'
 */
handleItemQuantity.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: handleItemQuantity.url(options),
    method: 'put',
})
const CartController = { checkout, success, buy, index, addItem, removeItem, clear, handleItemQuantity }

export default CartController