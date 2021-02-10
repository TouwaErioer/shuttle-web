import {get, post, del} from '@/utils/request/request'

const api = '/order/';

// 添加订单
export const insertOrder = (order, config, isExpired) => post(api + '/insert' + "?isExpired=" + isExpired, order, config);

// 根据oderId删除订单
export const deleteOrder = (oderId) => del(api + 'delete', oderId);

// 修改订单
export const updateOrder = (order) => post(api + 'update', order);

// 查询全部的待接订单
export const findAllOrders = () => get(api + 'findAll');

// 查询全部的已接订单
export const findAllCompleted = (pageNo) => get(api + 'findAll?completed=0&?pageNo=' + pageNo);

// 根据userId查询所有订单
export const findByUserId = (userId, pageNo) => get(api + 'findByCid/' + userId + '?pageNo=' + pageNo);

// 接单
export const receive = (orderId) => get(api + 'receive/' + orderId);