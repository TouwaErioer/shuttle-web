import {get} from '@/utils/request/request'

export const findAllService = () => get('/service/findAll?order=ASC');