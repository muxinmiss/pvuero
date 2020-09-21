<template>
    <div>
        <h3 class="logo">小U商城后台</h3>
        <!-- 菜单组件 -->
        <el-menu
            class="page-menu"
            background-color="#444"
            text-color="#fff"
            router
            :collapse="!iscollapse"
            :default-active="$route.path"
        >
            <el-menu-item index="/index">
                <i class="el-icon-house"></i>
                <span slot="title">后台首页</span>
            </el-menu-item>
            <!-- 当想包裹一个元素，但是不想用一个真实的元素，可以使用template，他在渲染的时候并不会出现，只起一个包裹的作用 -->
            <template v-for="(item,index) in menus">
                <!-- 要求他是菜单并且没有子集 ：!item.children && item.type==2   也可以写成!item.type==2-->

                <el-menu-item v-if="item.type==2" :index="item.url">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>

                <!-- 此处的index值要求为字符串 -->
                <el-submenu v-else :index="index+''">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <!-- 如果目录还没有建它的下一级，要判断它是否是一个目录，目录是否有子集 如果没有子集，此处会出现问题，此问题未解决-->
                    <el-menu-item
                        :index="val.url"
                        v-for="(val,idx) in item.children"
                        :key="idx"
                    >{{val.title}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {},
    computed: {
        ...mapState(["iscollapse"]),
        ...mapGetters({
            menus: "user/menus",
        }),
    },
};
</script>

<style scoped>
.logo {
    line-height: 60px;
    text-align: center;
    color: #fff;
    background-color: #666;
    white-space: nowrap;
    overflow: hidden;
}
.page-menu {
    border: none;
}
</style>
