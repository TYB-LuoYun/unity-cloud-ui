import {http} from '@/utils/http'

const API = '/api';

export function pageList(data) {
  return http.request("get",API+'/ucpm/menu/template/page',   data )
}
export function get(id) {
  return http.request("get",'/ucpm/menu/template/' + id )
}

export function syncTenantMenuPermission(id) {
  return http.request("get",API+'/ucpm/menu/template/sync-tenant-menu-permission/' + id )
}

export function del(id) {
  return http.request("delete",API+'/ucpm/menu/template/delete/' + id )
}

export function add(data) {
  return http.request("post", API+'/ucpm/menu/template/save', data )
}

export function update(data) {
  return http.request("put",API+'/ucpm/menu/template/edit', data )
}

export function menuTemplateList(data) {
  return http.request("get",API+'/ucpm/menu/template/list', data )
}
