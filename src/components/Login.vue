<template>
    <div class="form-wrap">
            <loading v-show="loading"/>
        <form class="login">
            <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{name: 'Register'}">Register</router-link>
            </p>
            <h2>Login to M-Commerce</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                </div>
                <div class="input">
 <input type="password" placeholder="Password" v-model="password">
                </div>
                <div class="error" v-show="error">{{errorMsg}}</div>
            </div>
            <router-link class="forgot-password" to="#">Forgot Your Password</router-link>
            <router-link class="forgot-password" to="/">Back To Homepage</router-link>
            <button @click.prevent="signIn">Sign In</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import loading from './loading.vue'
export default {
  components: { loading },
    name: 'Login',
    data(){
        return{
            email: null,
            password: null,
            error: null,
            errorMsg: '',
            loading: null
        }
    },
    methods: {
        signIn(){
            this.loading = true
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() =>{
                this.$router.push('/admin')
                this.error = false
                this.errorMsg = ''
            }).catch(err => {
                this.loading = false
                this.error = true
                this.errorMsg = err.message
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.error{
  color: red;
  text-align: center;
  font-size: 12px;
}
.form-wrap{
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    margin: 0 auto; 
    width: 90%;
    @media (min-width: 900px) {
        width: 100%
    }
    .login-register{
        margin-bottom: 32px;
        .router-link{
            color: rgb(206, 48, 48);
        }
    }
    form{
        min-height: 100vh;
        height: 100%;
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        @media (min-width: 900px) {
           padding: 0 50px; 
        }
        h2{
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;
            @media (min-width: 900px) {
                font-size: 30px;
            }
        }
        .inputs{
            width: 100%;
            max-width: 350px;
            .input{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;
                input{
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus{
                        outline: none;
                    }
                }
                .icon{
                    width: 12px;
                    position: absolute;
                    left: 6px;
                }
            }
        }
       .forgot-password{ 
              text-decoration: none;
              color: rgb(82, 189, 255);
              cursor: pointer;
              font-size: 14px;
              margin: 16px 0 2px;
             border-bottom: 1px solid transparent;
             transition: .5s ease all;
             &:hover{
                    border-color: #303030;
                }
          }
        .angle{
            display: none;
            position: absolute;
            background-color: #fff;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;
            @media (min-width: 900px) {
                display: initial;
            }
        }
    }
    .background{
        display: none;
        flex: 2;
        background-size: cover;
        background-image: url('../../public/img/backgroud-3.jpeg');
        width: 100%;
        height: 100%;
        @media (min-width: 900px) {
            display: initial;
        }
    }
}
button{
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus{
    outline: none;
  }
  &:hover{
    background-color: rgba(48, 48, 48, 0.7);
  }
}
</style>