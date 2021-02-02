import {get} from '@/utils/request/request'

// 查询全部的服务
export const findAllService = () => get('/service/findAll')

// export const DeleteService = (params) => Delete('/service/delete/',params)