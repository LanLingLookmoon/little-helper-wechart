import http from '../http/request'
const API = '/api'
export const userlogin = (params) => http.post(API+'/example', params)