// 列表展示
<template>
    <div class="table-bg">
        <!-- data是表格的数据   会自动循环-->
        <el-table
            border
            :data="menulist"
            row-key="id"
            :tree-props="{children:'children',hasChildren:'hasChildren'}"
        >
            <!-- prop代表本列要渲染的字段 -->
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="title" label="菜单名称" align="center"></el-table-column>
            <el-table-column prop="url" label="菜单地址" align="center"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                    <i :class="scope.row.icon"></i>
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
                    <el-tag type="danger" v-if="scope.row.type==2">菜单</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        @click="edit(scope.row)"
                        icon="el-icon-edit"
                        size="small"
                        circle
                    ></el-button>
                    <el-button
                        type="danger"
                        @click="del(scope.row.id)"
                        icon="el-icon-delete"
                        size="small"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delMenu } from "@/request/menu";
export default {
    data() {
        return {
            info: {
                //这是组件的infoi变量
                isAdd: false,
                isShow: false,
            },
        };
    },
    // 在此处拿Getters获取的menulist数据，渲染vinfo弹窗里的菜单列表选项
    computed: {
        ...mapGetters({
            menulist: "menu/menulist",
        }),
    },
    mounted() {
        // 挂载成功后判断menulist有没有数据是否存在，如果不存在就请求一次数据
        if (!this.menulist.length) {
            this.get_menu_list();
        }
    },
    created() {},

    methods: {
        // 请求menulist里数据的方法
        ...mapActions({
            get_menu_list: "menu/get_menu_list",
        }),
        edit(val) {
            this.$emit('edit',{...val})
        },
        async del(id) {
            this.$confirm("确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    let res = await delMenu(id);
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        this.get_menu_list(); // 重新获取列表！
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(() => {});
        },
    },
};
</script>

<style scoped>
</style>
