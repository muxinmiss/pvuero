import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取菜单列表
 */
export async function getMenu() {
    let res = await $axios.get("/menulist?istree=1")
    // 如果请求成功且res.list存在（res.list不存在的话，它本身是为null的，null是代表 否定的值），返回列表，否则return 为空数组
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export function addMenu(data) {
    return $axios.post("/menuadd", data)
}
/**
 * 修改菜单
 * @param {*}  data  修改的数据
 */
export function editMenu(data) {
    return $axios.post("/menuedit", data)
}
/**
 * 删除菜单
 * @param {*} id  要删除的列表ID
 */
export function delMenu(id) {
    return $axios.post("/menudelete", { id })//post第二个参数为对象
}