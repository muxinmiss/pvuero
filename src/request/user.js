import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取管理员列表
 */
export async function getUser(page = 1, size = 10) {
    let res = await $axios.get("/userlist", {
        params: {
            page,
            size
        }
    })
    // 如果请求成功且res.list存在（res.list不存在的话，它本身是为null的，null是代表 否定的值），返回列表，否则return 为空数组
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
/**
 * 添加管理员
 * @param {*} data  添加的数据
 */
export function addUser(data){
    return  $axios.post("/useradd",data)
}
/**
 * 修改管理员
 * @param {*}  data  修改的数据
 */
export function editUser(data) {
    return $axios.post("/useredit", data)
}
/**
 * 删除管理员
 * @param {*} id  要删除的用户ID
 * 本函数中没有使用async await 表示在页面中请求等待
 */
export function delUser(uid) {
    return $axios.post("/userdelete", { uid })//post第二个参数为对象
}

/**
 * 获取管理员个数
 * @param {*} 
 * 本函数中使用async await 表示在函数中就完成了请求等待
 */
export async function getTotal(){
    let res = await $axios.get("/usercount")
    return res.list[0].total
}


/**
 * 管理员登录
 * @param {*} 
 * 本函数中使用async await 表示在函数中就完成了请求等待
 */
export  function Login(data){
    return  $axios.post("/userlogin",data)
 
}