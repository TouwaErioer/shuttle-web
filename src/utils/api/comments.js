import {del, get, post} from '@/utils/request/request'

const API = '/comments/';

export const insertComments = (comments) => post(API + 'insert', comments);

export const updateComments = (comments) => post(API + 'update', comments);

export const findByStoreId = (storeId) => get(API + 'findByStoreId/' + storeId);

export const delComments = (comments) => del(API + 'delete', comments);