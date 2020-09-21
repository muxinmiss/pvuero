// 弹窗
<template>
    <div>
        <el-dialog :title="info.isAdd?'添加角色':'修改角色'" center :visible.sync="info.isShow" @close="cancel" width="40%">
            <!-- 表单 -->
            <el-form :model="forminfo" :rules="rules" ref="form" label-width="140px">
                <el-form-item label="角色名称" prop="rolename">
                    <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
                </el-form-item>

                <el-form-item label="角色权限">
                    <el-tree
                      default-expand-all 
                        :data="menulist"
                        :props="{children:'children',
                        label:'title'}"
                         :check-strictly="checkStrictly"
                        show-checkbox
                        ref="tree"
                        node-key="id"
                    ></el-tree>
                </el-form-item>

                <el-form-item label="角色状态">
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
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
    rolename: "",
    menu: "",
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
                rolename: [
                    { required: true, message: "必填", trigger: "blur" },
                ],
            },
             checkStrictly:false   // false表示父子关联！ true表示父子不关联！
        };
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
            get_role_list: "role/get_role_list",
        }),
        // 重置方法  将数据赋值给默认的defaultItem,,,再赋值给表单
        setinfo(val){ 
            // 将权限节点，回显到树中去！
            let idarr = val.menus.split(",");
            // 判断第一个值存不存在，如果第一个值为空串，那么也表示否定
            if(idarr[0]){
                this.checkStrictly = true;   // 父子互不关联！
                // 等到节点渲染完成再做某个事情！ this.$nextTick(()=>{  等到vue把节点渲染完成再做某些事情！ })
                this.$nextTick(()=>{
                     this.$refs.tree.setCheckedKeys(idarr)
                     this.checkStrictly = false;  // 又要父子互相关联！
                })
            }
            defaultItem = {...val};
            this.forminfo = {...val};
        },
        async submit() {
            // 怎么获取树形控件选中的节点
            // console.log(this.$refs.tree.getCheckedKeys());
            let idarr = this.$refs.tree
                .getCheckedKeys()
                .concat(this.$refs.tree.getHalfCheckedKeys());

            this.forminfo.menus = idarr;
            if (idarr.length) {
                this.forminfo.menus = idarr;
            } else {
                this.$message.warning("请选择权限");
                return;
            }
            // console.log(this.forminfo.menu);
            // 框架里的方法
            //  this.$refs.form.validate()  里面不传值，他就是一个promise，传值就是undefined
            this.$refs.form.validate(async valid => {
                if (valid) {
                    //如果验证通过
                    let res;
                    //判断是添加还是修改
                    if (this.info.isAdd) {
                        res = await addRole(this.forminfo);
                    } else {
                        res = await editRole(this.forminfo);
                    }
                    // 如果修改或者添加成功，就发送相关的消息
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        // 关闭弹窗
                        this.info.isShow = false;
                        this.get_role_list();//重新获得角色列表
                      this.cancel();
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            });
        },
       reset(){
            if(this.info.isAdd){ // 添加时候的重置！  所有的内容都为空
             this.cancel();
            }else{ // 修改时候的重置！
                this.setinfo({...defaultItem})
            }
        },
        cancel(){
            this.$refs.tree.setCheckedKeys([])//让树没有被选中
            this.forminfo = {...resetItem}
        }
    },

};
</script>

<style scoped>
</style>
