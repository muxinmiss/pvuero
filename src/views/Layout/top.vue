<template>
    <div class="header">
        <!-- 左侧 -->
        <div class="lt">
            <el-button
                v-if="iscollapse"
                type="primary"
                size="small"
                class="toggle-btn"
                @click="TOGGLE"
                icon="el-icon-s-unfold"
            ></el-button>
            <el-button
                v-else
                type="primary"
                size="small"
                @click="TOGGLE"
                class="toggle-btn"
                icon="el-icon-s-fold"
            ></el-button>

            <el-breadcrumb
                separator-class="el-icon-arrow-right"
                style="margin-left:10px"
                class="mbx"
            >
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button
                type="primary"
                icon="el-icon-back"
                size="small"
                circle
                v-if="$router.path!='/index'"
                @click="$router.back()"
            ></el-button>
        </div>
        <!-- 右侧 -->
        <div>
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{username}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="togglescreenfull">
                        <i class="el-icon-full-screen"></i>
                        {{isfull?'退出全屏':' 全屏操作'}}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="QUIT">
                        <i class="el-icon-switch-button"></i>
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
// 导入全屏第三方模块
import screenfull from "screenfull";
export default {
    data() {
        return {
            // 全屏/不全屏
            isfull: false,
        };
    },
    created() {},
    mounted() {},
    methods: {
        ...mapMutations({
            TOGGLE: "TOGGLE",
            QUIT: "user/QUIT",
        }),
        togglescreenfull() {
            if (!screenfull.isEnabled) {
                this.$message.warning("您的浏览器不支持全屏");
                return false;
            }
            this.isfull = !this.isfull;
            screenfull.toggle();
        },
    },
    computed: {
        ...mapState(["iscollapse"]),
        ...mapGetters({
            username: "user/username",
        }),
    },
};
</script>

<style scoped>
.header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.toggle-btn {
    font-size: 16px;
}
.header .lt {
    display: flex;
    align-items: center;
}
.mbx {
    margin: 0 20px;
}
</style>
