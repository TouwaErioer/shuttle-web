import {get, post} from '@/utils/request/request'

const API = '/approve';

export const insertStore = (param) => post(API + '/insertStore', param);

export const insertProduct = (param) => post(API + '/insertProduct', param);

export const findStoreByUserId = (userId) => get(API + '/findStoreByUserId/' + userId);