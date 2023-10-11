export const HOST = 'http://192.168.15.99:3000'

export interface DataObject {
    code?: number,
    message?: string,
    data?: object | Array<any>
}

export interface RequestParams {  
    url: string;  
    data?: object;  
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';  
    header?: object;  
}
