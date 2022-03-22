import {get} from '@/utils/request/request'

export const findAllService = () => get('/major/service/findAll?order=ASC');

export const businessList = () => get('/major/service/list');
