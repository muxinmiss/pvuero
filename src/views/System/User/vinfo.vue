// 弹窗
<template>
    <div>
        <el-dialog
            :title="info.isAdd?'添加管理员':'修改管理员'"
            center
            :visible.sync="info.isShow"
            @close="cancel"
            width="40%"
        >
            <!-- 表单 -->
            <el-form :model="forminfo" :rules="rules" ref="form" label-width="140px">
                <el-form-item label="管理员角色" prop="roleid">
                    <el-select v-model="forminfo.roleid" placeholder="请输入角色">
                        <el-option
                            v-for="item in rolelist"
                            :key="item.id"
                            :label="item.rolename"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理员名称" prop="username">
                    <el-input v-model="forminfo.username" placeholder="请输入管理员名称"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" prop="password">
                    <el-input
                        v-model="forminfo.password"
                        :placeholder="info.isAdd ? '请输入密码':'留空表示不修改'"
                    ></el-input>
                </el-form-item>

                <el-form-item label="管理员状态">
                    <el-switch
                        v-model="forminfo.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="2"
                    ></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
// 导入添加和修改模块的请求方法封装
import { addUser, editUser } from "@/request/user";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
    roleid: "",
    username: "",
    password: "",
    status: 1, // 状态1--正常   2--禁用   1位数字类型
};
let resetItem = { ...defaultItem };
export default {
    props: {
        info: {
            type: Object,
            default() {
                return {
                    isAdd: true,
                    isShow: false,
                };
            },
        },
    },
    data() {
        return {
            forminfo: { ...defaultItem },

            rules: {
                //验证规则对象,    注意格式
                roleid: [{ required: true, message: "必填", trigger: "blur" }],
                username: [
                    { required: true, message: "必填", trigger: "blur" },
                ],
            },
        };
    },

    mounted() {
        // 挂载成功后判断menulist有没有数据是否存在，如果不存在就请求一次数据
        if (!this.rolelist.length) {
            this.get_role_list();
        }
    },
    // 在此处拿Getters获取的menulist数据，渲染vinfo弹窗里的菜单列表选项
    computed: {
        ...mapGetters({
            rolelist: "role/rolelist",
        }),
    },
    methods: {
        // 请求menulist里数据的方法
        ...mapActions({
            get_role_list: "role/get_role_list",
            get_user_list: "user/get_user_list",
        }),
        // 重置方法  将数据赋值给默认的defaultItem,,,再赋值给表单
        setinfo(val) {
            val.password = "";
            defaultItem = { ...val };
            this.forminfo = { ...val };
        },
        async submit() {
            if (this.isAdd && !this.forminfo.password) {
                this.$message.warning("请输入密码");
                return;
            }
            // 框架里的方法
            //  this.$refs.form.validate()  里面不传值，他就是一个promise，传值就是undefined
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    //如果验证通过
                    let res;
                    //判断是添加还是修改
                    if (this.info.isAdd) {
                        res = await addUser(this.forminfo);
                    } else {
                        res = await editUser(this.forminfo);
                    }
                    // 如果修改或者添加成功，就发送相关的消息
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        // 关闭弹窗
                        this.info.isShow = false;
                        this.get_user_list(); //重新获得管理员列表
                        this.cancel();
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            });
        },
        reset() {
            if (this.info.isAdd) {
                // 添加时候的重置！  所有的内容都为空
                this.forminfo = { ...resetItem };
            } else {
                // 修改时候的重置！
                this.setinfo({ ...defaultItem });
            }
        },
        cancel() {
            // this.$refs.tree.setCheckedKeys([]); //让树没有被选中
            this.forminfo = { ...resetItem };
        },
    },
};
</script>

<style scoped>
</style>
