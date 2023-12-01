import http from '../http/request'
const API = '/api'
export const userlogin = (params) => http.post(API+'/login', params)

export const upload = (params) => http.upload(API+'/upload', params)

export const showImage = (params) => http.get(API+'/image', params, {'Content-Type': 'application/octet-stream', 'needArraybuffer': true})
