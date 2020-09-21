// 状态层
// 菜单的列表数据要与别人共享
// 获取菜单列表
import { getUser, getTotal, Login } from "@/request/user"
import { Message } from "element-ui"
import router from "@/router"
// 登录之后刷新如果vuex中没有userinfo，就从本地存储读取一下
let userinfo = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : {}

export default {
    namespaced: true,
    /**当项目非常大时，如果所有的状态都集中放到一个对象中，store 对象就有可能变得相当臃肿。为了解决这个问题，Vuex允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。namespaced表示当前模块是否使用命名空间，如果使用的话，那么设置了namespaced属性的模块将和其它模块独立开来，调用时得指定命名空间后才可以访问得到 */
    state: {
        userlist: [],  //菜单列表
        page: 1,  //页码数
        size: 4,  //每页数量
        total: 0, //总条数
        userinfo: userinfo
    },
    // 由getters获取的数据，都会存放在根里面
    getters: {
        // 得到state里面的userlis用于渲染vinfo弹窗里的菜单列表选项，
        userlist: state => state.userlist,
        page: state => state.page,
        size: state => state.size,
        total: state => state.total,
        menus: state => state.userinfo.menus,
        menus_url: state => state.userinfo.menus_url,
        username: state => state.userinfo.username,
    },
    mutations: {

        SET_LIST(state, data) {
            state.userlist = data;
        },
        SET_PAGE(state, data) {
            state.page = data;
        },
        SET_SIZE(state, data) {
            state.size = data;
        },
        SET_TOTAL(state, data) {
            state.total = data;
        },
        SET_USERINFO(state, data) {
            //存入本地存储是为了实现持久化
            localStorage.setItem('userinfo', JSON.stringify(data));
            // 存入vuex是为了各组件方便直接拿取数据
            state.userinfo = data;
        },
        QUIT(state) {
            localStorage.removeItem('userinfo');
            state.userinfo = {};
            router.push('/login')
        }
    },
    /**
     * 页面进来之后会从store拿数据，当列表没有内容时会触发action，action会去请求层读取数据，读取到某个模块的某个请求方法，然后把请求的数据拿回来，再通过mutations把数据设置给state，state会把数据通过getters把数据流向列表。，这样就形成了一个环流。添加和修改是直接发送请求，直接调用请求层
     */
    actions: {
        // 请求菜单的列表数据
        // 解构commit，把res的数据赋给它
        async get_user_list({ commit, state, dispatch }) {
            let res = await getUser(state.page, state.size);
            // console.log(res);
            commit('SET_LIST', res);
            // 添加和删除都让列表的内容发生了变化，所以，只有请求列表，就要请求列表的长度
            dispatch('get_user_total')//在自己里面调用自己的action
        },
        // 获取管理员的总数
        async get_user_total({ commit }) {
            let res = await getTotal();
            commit('SET_TOTAL', res)
        },
        set_page({ commit, dispatch }, data) {
            commit('SET_PAGE', data);//同步修改
            dispatch('get_user_list')
        },
        set_size({ commit, dispatch }, data) {
            commit('SET_SIZE', data);
            dispatch('get_user_list')
        },
        async login({ commit }, data) {
            let res = await Login(data);
            if (res.code == 200) {
                commit('SET_USERINFO', res.list);
                Message.success('登录成功');
                router.push("/");//跳转到后台首页
            } else {
                Message.error(res.msg)
            }
        },
    }
}