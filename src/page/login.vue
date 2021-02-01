<template>
    <div class="container">
        <div class="forms-container">
            <div class="signin-signup">
                <form class="sign-in-form">
                    <h2 class="title">登录</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input placeholder="Email" id="login-email" type="email"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input placeholder="Password" id="login-password" type="password"/>
                    </div>
                    <el-button v-text="'Login'" class="btn solid" @click="sign()"/>
                </form>
                <form class="sign-up-form">
                    <h2 class="title">注册</h2>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="email" placeholder="Email" id="register-email"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="Password" id="register-password"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="rePassword" id="register-rePassword"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-address-card"></i>
                        <input type="text" placeholder="address" id="register-address"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-phone"></i>
                        <input type="text" placeholder="phone" id="register-phone"/>
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
                    email: document.getElementById('login-email').value,
                    password: document.getElementById('login-password').value
                }
                const regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                if (!Object.values(login_from).every(v => !!v)) {
                    this.$message.error('请输邮箱或密码')
                } else if (!regExp.test(login_from.email)) {
                    this.$message.error('邮箱格式错误')
                } else {
                    let data = {
                        email: login_from.email,
                        password: login_from.password,
                        expired: 60
                    }
                    console.log('登录 ' + data)
                    this.$router.push('/home')
                    // login({
                    //     email: login_from.email,
                    //     password: login_from.password,
                    //     expired: 60
                    // }).then(res => {
                    //     if (res != null) {
                    //         let user = res.data.user
                    //         localStorage.setItem('token', res.data.token)
                    //         localStorage.setItem('userInfo', JSON.stringify(user))
                    //         this.$router.push('/service')
                    //         console.log(res, '登录')
                    //     }
                    // })
                }
            },
            register() {
                const regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                const phoneRegEx = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
                const register_from = {
                    email: document.getElementById('register-email').value,
                    password: document.getElementById('register-password').value,
                    rePassword: document.getElementById('register-rePassword').value,
                    address: document.getElementById('register-address').value,
                    phone: document.getElementById('register-phone').value,
                }
                if (!Object.values(register_from).every(v => !!v)) {
                    this.$message.error('请输入 邮箱 或 密码 或 寝室号')
                } else if (!regExp.test(register_from.email)) {
                    this.$message.error('邮箱格式错误')
                } else if (register_from.password != register_from.rePassword) {
                    this.$message.error('两次输入密码不一致')
                } else if (!phoneRegEx.test(register_from.phone)) {
                    this.$message.error('号码格式错误')
                } else {
                    const data = {
                        'email': register_from.email,
                        'password': register_from.password,
                        'address': register_from.address,
                        'type': 0
                    }
                    console.log('注册 ' + data)
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

    @import 'src/style/login.scss';
</style>