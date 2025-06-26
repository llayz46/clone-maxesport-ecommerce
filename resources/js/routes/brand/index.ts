import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BrandController::index
 * @see app/Http/Controllers/BrandController.php:16
 * @route '/brands'
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
    url: '/brands',
}

/**
* @see \App\Http\Controllers\BrandController::index
 * @see app/Http/Controllers/BrandController.php:16
 * @route '/brands'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrandController::index
 * @see app/Http/Controllers/BrandController.php:16
 * @route '/brands'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrandController::index
 * @see app/Http/Controllers/BrandController.php:16
 * @route '/brands'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BrandController::show
 * @see app/Http/Controllers/BrandController.php:44
 * @route '/brands/{brand}'
 */
export const show = (args: { brand: string | { slug: string } } | [brand: string | { slug: string } ] | string | { slug: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/brands/{brand}',
}

/**
* @see \App\Http\Controllers\BrandController::show
 * @see app/Http/Controllers/BrandController.php:44
 * @route '/brands/{brand}'
 */
show.url = (args: { brand: string | { slug: string } } | [brand: string | { slug: string } ] | string | { slug: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { brand: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { brand: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    brand: args[0],
                }
    }

    const parsedArgs = {
                        brand: typeof args.brand === 'object'
                ? args.brand.slug
                : args.brand,
                }

    return show.definition.url
            .replace('{brand}', parsedArgs.brand.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrandController::show
 * @see app/Http/Controllers/BrandController.php:44
 * @route '/brands/{brand}'
 */
show.get = (args: { brand: string | { slug: string } } | [brand: string | { slug: string } ] | string | { slug: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrandController::show
 * @see app/Http/Controllers/BrandController.php:44
 * @route '/brands/{brand}'
 */
show.head = (args: { brand: string | { slug: string } } | [brand: string | { slug: string } ] | string | { slug: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})
const brand = {
    index,
show,
}

export default brand