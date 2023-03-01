<template>
    <div class="home">
        <el-container>
            <el-header>
                <div>
                    <el-button type="text">首页</el-button>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <el-button class="typeButton" type="text">分类</el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="headerMain">
                    <div><h2 class="headerTitle">贴吧</h2></div>
                    <div>
                        <el-input style="width: 30vw" placeholder="请输入内容" v-model="selectInput"
                                  class="input-with-select">
                            <el-button slot="append" icon="el-icon-search">全吧搜索</el-button>
                        </el-input>
                    </div>
                </div>
                <div class="headerRight">
                    <div>
                        <el-button class="loginButton" type="text" @click="loginFormVisible = true">登录</el-button>
                    </div>
                    <div>
                        <el-button type="text" @click="registerFormVisible = true">注册</el-button>
                    </div>
                </div>
            </el-header>
            <!--     主体       -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>

        <!--登陆的弹窗    :visible.sync="true or false"是否显示窗口-->
        <el-dialog width="25vw" center title="登录" :visible.sync="loginFormVisible">
            <el-form :model="userLogin" :rules="loginRules" ref="loginForm">
                <!--prop属性的name对应loginForm.name-->
                <el-form-item prop="name">
                    <el-input v-model="userLogin.name" placeholder="请输入用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <!--  密文输入type="password"  小眼睛:show-password属性-->
                    <el-input type="password" show-password v-model="userLogin.password" placeholder="请输入密码" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <!--primary样式    login()里面参数与form表单理ref对应-->
            <el-button class="buttonLogin" type="primary" @click="login('loginForm')">登 录</el-button>
        </el-dialog>
        <!--   注册的弹窗     -->
        <el-dialog width="25vw" center title="注册" :visible.sync="registerFormVisible">
            <el-form :model="userRegister" :rules="RegisterRules" ref="registerForm">
                <!--prop属性的name对应registerForm.name-->
                <el-form-item prop="name">
                    <el-input v-model="userRegister.name" placeholder="请输入用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="nickName">
                    <el-input v-model="userRegister.nickName" placeholder="请输入昵称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="userRegister.password" placeholder="请输入密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input v-model="userRegister.confirmPassword" placeholder="请输入确认密码"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pic">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon">点击上传</i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!--primary样式    login()里面参数与form表单理ref对应-->
            <el-button class="buttonLogin" type="primary" @click="register('registerForm')">注 册</el-button>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'HomeView',
        /*定义初始化变量*/
        data() {
            return {
                selectInput:'',
                userLogin: {
                    name: '',
                    password: ''
                },
                /*默认不展示*/
                loginFormVisible: false,
                registerFormVisible: false,
                loginRules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ]
                },
                userRegister: {
                    name: '',
                    password: '',
                    nickName: '',
                    confirmPassword: '',
                    pic: ''
                },
                RegisterRules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    nickName: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    pic: [
                        {required: true, message: '请输入上传头像', trigger: 'blur'}
                    ]
                }
            }
        },
        /*事件绑定的函数*/
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    // true or false
                    if (valid) {
                        /*验证正确->发送异步请求*/
                        alert('submit!');
                    } else {
                        // console.log('error submit!!');
                        this.$message.error('表单参数有误')
                        return false;
                    }
                });
            },
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    // true or false
                    if (valid) {
                        /*验证正确->发送异步请求*/
                        alert('submit!');
                    } else {
                        // console.log('error submit!!');
                        this.$message.error('表单参数有误')
                        return false;
                    }
                });
            }
        },
        /*生命周期：页面加载完毕就执行的方法*/
        created() {
        }
    }
</script>
<!--只对本标签下的样式 只对本页面起作用，不会影响其他页面样式-->
<style scoped>

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
        border-bottom: 1px solid #4c5056;
        display: flex;
        justify-content: space-between;
    }

    .headerMain {
        display: flex;
        /*垂直方向居中*/
        align-items: center;
    }

    .headerTitle {
        margin-right: 20px;
    }

    .headerRight {
        display: flex;
        /*垂直方向居中*/
        align-items: center;
        border: 1px solid #ff0000;
    }

    .loginButton {
        margin-right: 20px;
    }

    /*弹窗登录*/
    .buttonLogin {
        width: 100%;
        margin-bottom: 40px;
    }

    /*图片上传*/
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    .el-container {
        height: 100%;
    }

    .home {
        height: 100%;
    }

    .typeButton {
        margin-left: 30px;
    }
</style>