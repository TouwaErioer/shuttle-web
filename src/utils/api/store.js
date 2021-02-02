import {get} from '@/utils/request/request'

// 根据serviceId查询store
export const findStoreByServiceID = (serviceId) => get('/store/findStoreByServiceID/' + serviceId)

// 查询热门store
export const findPopularStore = () => get('/store/popular')