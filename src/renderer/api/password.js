import request from '@/utils/request'
// 保存一个密码
export function save(data) {
    return request({
        url: '/api/app/password/save',
        method: 'post',
        data: data
    })
}
// 列表
export function getPasswordList() {
    return request({
        url: '/api/app/password/list',
        method: 'get',
    })
}
// 获取单个
export function getPasswordById(id) {
    return request({
        url: '/api/app/password/get/' + id,
        method: 'get'
    })
}
// 修改
export function updatePasswordById(id, data) {
    return request({
        url: '/api/app/password/' + id,
        method: 'put',
        data: data
    })
}
// 删除
export function deletePasswordById(id) {
    return request({
        url: '/api/app/password/' + id,
        method: 'delete'
    })
}