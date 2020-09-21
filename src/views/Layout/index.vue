<template>
    <div>
        <el-container class="page">
            <el-aside :width=" iscollapse?'220px': '64px'" class="page-nav">
                <!-- Aside content -->
                <left />
            </el-aside>
            <el-container class="page-content">
                <el-header height class="page-header">
                    <!-- Header content -->
                    <top />
                </el-header>
                <el-main height class="page-main">
                    <!-- Main content -->
                   <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import top from "./top";
import left from "./left";
import { mapState } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["iscollapse"]),
    },
    created() {},

    methods: {},
    components: {
        left,
        top,
    },
};
</script>
<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.page-nav {
  height: 100%;
  background-color: #444;
}
.page-content {
  height: 100%;
  background-color: #f1f1f1;
}
/* 默认高度为60px */
.page-header {
  background-color: #fff;
  height: 50px !important; /*用来修改他的高度*/
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
    position: relative;
  z-index:1000;
}
</style>