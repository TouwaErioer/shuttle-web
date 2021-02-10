import {get} from '@/utils/request/request'

const API = '/product/'

// 根据storeId查询products
export const findProductsByStoreId = (storeId) => get(API + 'findByStoreId/' + storeId)

export const findPopularProduct = () => get(API + 'rank')