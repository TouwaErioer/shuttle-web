<template>
    <div class="container">
        <div class="forms-container">
            <div class="signin-signup">
                <form class="sign-in-form">
                    <h2 class="title">登录</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input placeholder="请输入邮箱或电话" id="login-user"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input placeholder="请输入密码" id="login-password" type="password"/>
                    </div>
                    <el-button v-text="'Login'" class="btn solid" @click="sign()"/>
                </form>
                <form class="sign-up-form">
                    <h2 class="title">注册</h2>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input placeholder="请输入邮箱" id="register-email"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="请输入密码" id="register-password"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="请重复输入密码" id="register-rePassword"/>
                    </div>
                    <el-button @click="register()" v-text="'Sign up'" class="btn"/>
                </form>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>新注册</h3>
                    <p>
                        快加入我们吧！为你的校园生活带来极大的便捷
                    </p>
                    <button class="btn transparent" id="sign-up-btn" @click="sign_up_btn()">
                        Sign up
                    </button>
                </div>
                <img src="../assets/login.svg" class="image" alt=""/>
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>有账号</h3>
                    <p>
                        快进去瞧瞧，更多的惊喜等着你发现
                    </p>
                    <button class="btn transparent" id="sign-in-btn" @click="sign_in_btn()">
                        Sign in
                    </button>
                </div>
                <img src="../assets/register.svg" class="image" alt=""/>
            </div>
        </div>
    </div>

</template>

<script>

    import {Login, register} from "@/utils/api/user";

    export default {
        name: 'login',
        data() {
            return {}
        },
        methods: {
            sign_in_btn() {
                document.querySelector(".container").classList.remove("sign-up-mode")
            },
            sign_up_btn() {
                document.querySelector(".container").classList.add("sign-up-mode")
            },
            sign() {
                const login_from = {
                    user: document.getElementById('login-user').value,
                    password: document.getElementById('login-password').value
                };
                if (!Object.values(login_from).every(v => !!v)) {
                    this.$message.error('必填输入框未输入')
                } else {
                    let expired = localStorage.getItem('expired');
                    let data = {
                        account: login_from.user,
                        password: login_from.password,
                        expired: expired === null ? 60 : expired
                    };
                    Login(data).then(res => {
                        if (res.code === 1) {
                            let user = res.data.user;
                            localStorage.setItem('token', res.data.token);
                            localStorage.setItem('userInfo', JSON.stringify(user));
                            this.$router.push('/')
                        }
                    })
                }
            },
            register() {
                const regEx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                const register_from = {
                    email: document.getElementById('register-email').value,
                    password: document.getElementById('register-password').value,
                    rePassword: document.getElementById('register-rePassword').value
                };
                if (!Object.values(register_from).every(v => !!v)) {
                    this.$message.error('必填输入框未输入')
                } else if (register_from.password !== register_from.rePassword) {
                    this.$message.error('两次输入密码不一致')
                } else if (!regEx.test(register_from.email)) {
                    this.$message.error('邮箱格式错误')
                } else {
                    const data = {
                        'email': register_from.email,
                        'password': register_from.password
                    };
                    register(data).then(res => {
                        if (res.code === 1) {
                            this.$message.success("注册成功！");
                            let expired = localStorage.getItem('expired');
                            let data = {
                                account: register_from.email,
                                password: register_from.password,
                                expired: expired === null ? 60 : expired
                            };
                            Login(data).then(res => {
                                if (res.code === 1) {
                                    let user = res.data.user;
                                    localStorage.setItem('token', res.data.token);
                                    localStorage.setItem('userInfo', JSON.stringify(user));
                                    this.$router.push('/')
                                }
                            })
                        }
                    })
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

    @import 'src/style/login.scss';
</style>
