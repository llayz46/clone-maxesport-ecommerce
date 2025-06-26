import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\NewsController::__invoke
 * @see app/Http/Controllers/NewsController.php:12
 * @route '/news'
 */
const NewsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: NewsController.url(options),
    method: 'get',
})

NewsController.definition = {
    methods: ['get','head'],
    url: '/news',
}

/**
* @see \App\Http\Controllers\NewsController::__invoke
 * @see app/Http/Controllers/NewsController.php:12
 * @route '/news'
 */
NewsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return NewsController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsController::__invoke
 * @see app/Http/Controllers/NewsController.php:12
 * @route '/news'
 */
NewsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: NewsController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NewsController::__invoke
 * @see app/Http/Controllers/NewsController.php:12
 * @route '/news'
 */
NewsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: NewsController.url(options),
    method: 'head',
})
export default NewsController