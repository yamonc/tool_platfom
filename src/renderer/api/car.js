import request from '@/utils/request'
// 保存一个车辆保养信息
export function save(data) {
    return request({
        url: '/api/app/car/save',
        method: 'post',
        data: data
    })
}
// 列表
export function getCarInfoList() {
    return request({
        url: '/api/app/car/list',
        method: 'get',
    })
}
// 获取单个
export function getCarInfoById(id) {
    return request({
        url: '/api/app/car/get/' + id,
        method: 'get'
    })
}
// 修改
export function updateCarInfoById(id, data) {
    return request({
        url: '/api/app/car/' + id,
        method: 'put',
        data: data
    })
}
// 删除
export function deleteCarInfoById(id) {
    return request({
        url: '/api/app/car/' + id,
        method: 'delete'
    })
}