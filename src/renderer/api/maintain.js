import request from '@/utils/request'
// 保存一个车辆保养信息
export function save(data) {
    return request({
        url: '/api/app/maintain/save',
        method: 'post',
        data: data
    })
}
// 列表
export function getCarMatainInfoList() {
    return request({
        url: '/api/app/maintain/list',
        method: 'get',
    })
}
// 获取单个
export function getCarMaintainInfoById(id) {
    return request({
        url: '/api/app/maintain/get/' + id,
        method: 'get'
    })
}
// 修改
export function updateCarMaintainInfoById(id, data) {
    return request({
        url: '/api/app/maintain/' + id,
        method: 'put',
        data: data
    })
}
// 删除
export function deleteCarMaintainInfoById(id) {
    return request({
        url: '/api/app/maintain/' + id,
        method: 'delete'
    })
}