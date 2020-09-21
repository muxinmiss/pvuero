<template>
    <div class="table-bg">
        <el-table :data="rolelist">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="edit(scope.row)"
                        circle
                        icon="el-icon-edit"
                    ></el-button>
                    <el-button
                        type="danger"
                        size="small"
                        @click="del(scope.row.id)"
                        circle
                        icon="el-icon-delete"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delRole } from "@/request/role";
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
    // 在此处拿Getters获取的menulist数据，渲染vinfo弹窗里的角色列表选项
    computed: {
        ...mapGetters({
            rolelist: "role/rolelist",
        }),
    },
    mounted() {
        // 挂载成功后判断menulist有没有数据是否存在，如果不存在就请求一次数据
        if (!this.rolelist.length) {
            this.get_role_list();
        }
    },
    methods: {
        // 请求menulist里数据的方法
        ...mapActions({
            // get_menu_list: "menu/get_menu_list",
            get_role_list: "role/get_role_list",
        }),
        edit(val) {
            this.$emit("edit", { ...val});
        },
        async del(id) {
            this.$confirm("确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    let res = await delRole(id);
                    if (res.code == 200) {
                        this.$message.success(res.msg);

                        this.info.isShow = false;

                        this.get_role_list(); // 重新获取列表！
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
</script>

<style scoped>
</style>
