import {get} from "@/utils/request/request";

const API = '/poster/';

export const findAllAds = () => get(API + 'findAll');