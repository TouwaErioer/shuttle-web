import {get} from '@/utils/request/request'

// 根据storeId查询products
export const findProductsByStoreID = (storeId) => get('/product/findProductsByStoreID/' + storeId)