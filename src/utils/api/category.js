import {get} from "@/utils/request/request";

const API = '/category/'

export const findCategoryByServiceId = (serviceId) => get(API + 'findAllByServiceId/' + serviceId)