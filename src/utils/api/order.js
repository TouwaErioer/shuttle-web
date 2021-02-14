import {get, post, del} from '@/utils/request/request'

const API = '/order/';

// 添加订单
export const insertOrder = (order, config, isExpired) => post(API + '/insert' + "?isExpired=" + isExpired, order, config);

// 根据oderId删除订单
export const deleteOrder = (oderId, config) => del(API + 'delete', oderId, config);

// 修改订单
export const updateOrder = (order) => post(API + 'update', order);

// 查询全部的已接订单
export const findAllCompleted = (pageNo) => get(API + 'findAll?completed=0&?pageNo=' + pageNo);

// 根据userId查询所有订单
export const findByUserId = (userId, pageNo) => get(API + 'findByCid/' + userId + '?pageNo=' + pageNo);

// 接单
export const Receive = (param) => post(API + 'receive', param);

// 查询全部的待接订单
export const findByReceive = (pageNo) => get(API + 'findByReceive?pageNo=' + pageNo);

// 根据sid查询所有订单
export const findBySid = (userId, pageNo) => get(API + 'findBySid/' + userId + '?pageNo=' + pageNo);

// 完成订单
export const complete = (order) => post(API + 'completed', order);