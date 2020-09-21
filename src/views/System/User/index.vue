<template>
    <div>
        <el-button type="primary" @click="add">添加角色</el-button>
        <!-- 列表组件 -->
        <v-list @edit="edit"></v-list>
        <!-- 添加/修改组件 -->
        <v-info :info="info" ref="dialog"></v-info>
    </div>
</template>
<script>
import VList from "./vlist";
import VInfo from "./vinfo";
export default {
    data() {
        return {
            info: {
                //组件的info变量
                isAdd: false,
                isShow: false,
            },
        };
    },
    created() {},
    methods: {
        add() {
            this.info.isAdd = this.info.isShow = true;
        },
        edit(val) {
            this.info.isAdd=false,
            this.info.isShow=true;
            // console.log(val);//把这个值赋给弹框
            // this.$refs.dialog.forminfo=val;//如果这样写点击重置的话，弹窗里的内容会全部清空
            // 调用弹框组件中的setinfo方法
            this.$refs.dialog.setinfo(val);
        },
    },
    components: {
        VList,
        VInfo,
    },
};
</script>
<style scoped>
</style>