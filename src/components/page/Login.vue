<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" ></el-input>
                </el-form-item>
                <div class="login-btn">
                        <el-button type="primary" @click="login">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: null,
                    password: null,
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {

            login() {
                localStorage.setItem('ms_username',this.ruleForm.username)
                let self = this;
                let info={
                    username: self.ruleForm.username,
                    password: self.ruleForm.password,
                };
                this.$axios.post(`${devops_url}/backen/login/`,
                    JSON.stringify(info),
                ).then(function (res) {
                    var token = 'Token'
                    token = token + res.data.token
                    console.log(token)
                    localStorage.setItem('user_token',token)
                    console.log(res.data['success'])
                    if (res.data['success'] ===  1){
                        self.$router.push('/');
                    }
                    else  if (res.data === 0 ) {
                        alert(' error ')
                    }
                })
            },
            register() {
                console.log('entry register')
                this.$router.push('/register');
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: left;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
