// 弹窗
<template>
    <div>
        <el-dialog :title="info.isAdd?'添加':'修改'" center :visible.sync="info.isShow" width="40%"  @close="cancel">
            <!-- 表单 -->
            <el-form :model="forminfo" :rules="rules" ref="form" label-width="120px">
                <!-- 单选按钮组 -->
                <el-form-item label="菜单类型">
                    <el-radio-group v-model="forminfo.type">
                        <el-radio :label="1">目录</el-radio>
                        <el-radio :label="2">菜单</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item v-if="forminfo.type==2" label="上级菜单">
                    <el-select v-model="forminfo.pid" placeholder="请选择">
                        <el-option label="顶级目录" :value="0"></el-option>
                        <el-option
                            v-for="item in menulist"
                            v-if="item.type==1"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                        <!--  v-if="item.type==1"用来过滤页面，如果是页面，就不能当做下拉列表的目录被选中 -->
                    </el-select>
                </el-form-item>
                <!-- 可清空的输入框 -->
                <el-form-item :label="forminfo.type==1?'目录名称':'菜单名称'" prop="title">
                    <el-input placeholder="请输入名称" v-model="forminfo.title" clearable></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="forminfo.icon" placeholder="请输入图标class"></el-input>
                </el-form-item>

                <el-form-item label="菜单地址" v-if="forminfo.type==2" prop="url">
                    <el-input placeholder="请输入菜单地址" v-model="forminfo.url" clearable></el-input>
                </el-form-item>

                <el-form-item label="状态">
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
import { addMenu, editMenu } from "@/request/menu";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
    pid: 0,
    title: "",
    icon: "",
    type: 1, //1--目录  2--菜单
    url: "",
    status: 1, // 状态1--正常   2--禁用   1位数字类型
};
let resetItem = { ...defaultItem };
export default {
    props: {
        info: {
            type: Object,
            default() {
                return {
                    isAdd: false,
                    isShow: false,
                };
            },
        },
    },
    data() {
        return {
            input: "",
            forminfo: { ...defaultItem },
            options: [],
            rules: {
                //验证规则对象,    注意格式
                title: [{ required: true, message: "必填", trigger: "blur" }],
                icon: [{ required: true, message: "必填", trigger: "blur" }],
                type: [{ required: true, message: "必填", trigger: "blur" }],
                url: [{ required: true, message: "必填", trigger: "blur" }],
            },
        };
    },
    created() {
        console.log(this);
    },
    mounted() {
        // 挂载成功后判断menulist有没有数据是否存在，如果不存在就请求一次数据
        if (!this.menulist.length) {
            this.get_menu_list();
        }
    },
    // 在此处拿Getters获取的menulist数据，渲染vinfo弹窗里的菜单列表选项
    computed: {
        ...mapGetters({
            menulist: "menu/menulist",
        }),
    },
    methods: {
        // 请求menulist里数据的方法
        ...mapActions({
            get_menu_list: "menu/get_menu_list",
        }),
        // 重置方法  将数据赋值给默认的defaultItem,,,再赋值给表单
        setinfo(val) {
            defaultItem = { ...val };
            this.forminfo = { ...val };
        },
        async submit() {
            // console.log(this.$refs.form);
            // 框架里的方法
            //  this.$refs.form.validate()  里面不传值，他就是一个promise，传值就是undefined
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    //如果验证通过
                    let res;
                    //判断是添加还是修改
                    if (this.info.isAdd) {
                        res = await addMenu(this.forminfo);
                    } else {
                        res = await editMenu(this.forminfo);
                    }
                    // 如果修改或者添加成功，就发送相关的消息
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        // 关闭弹窗
                        this.info.isShow = false;
                        this.get_menu_list(); //再次重新获取列表，让仓库里面的数据是最新的
                        this.cancel()//修改添加成功都应该让表单为空
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            });
        },
        // 重置功能
        reset() {
                if (this.info.isAdd) {
                // 添加时候的重置！  所有的内容都为空
                this.forminfo = { ...resetItem };
            } else {
                // 修改时候的重置！
                this.setinfo({ ...defaultItem });
            }
        },
        cancel(){//无论是添加成功还是修改成功，都要让表单为空  或者弹框关闭的时候
            this.forminfo = { ...resetItem };
        }
    },
};
</script>

<style scoped>
</style>
