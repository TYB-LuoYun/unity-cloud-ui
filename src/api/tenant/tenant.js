import {http} from '@/utils/http'
const API = '/api';

export function pageList(data) {
  return http.request(
    'get',API+'/ucpm/tenant/page', data
  )
}
export function get(id) {
  return http.request('get',API+'/ucpm/tenant/' + id  )
}

export function del(id) {
  return http.request('delete', API+'/ucpm/tenant/delete/' + id 
  )
}

export function add(data) {
  return http.request('post',API+ '/ucpm/tenant/save', data )
}

export function update(data) {
  return http.request('put',API+'/ucpm/tenant/edit' , data )
}
