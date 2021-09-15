<template>
    <div class="form-wrap">
        <form class="register">
            <loading v-show="loading"/>
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
            </p>
                <router-link class="forgot-password" to="/">Back To Homepage</router-link>
            <h2>Create your M-Commerce account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName">
                    <user class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName">
                    <user class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Usename" v-model="userName">
                    <user class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <email class="icon"/>
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password">
                    <password class="icon"/>
                </div>
                <div class="error" v-show="error">{{errorMsg}}</div>
            </div>
            <button @click.prevent="register">Sign Up</button>
            <div class="position-relative w-75 mt-3">
            <div class="position-absolute top-0 bottom-0 start-0 end-0 d-flex w-100 align-items-center h-100">
                <div class="w-100 border-top border-primary"></div>
            </div>
                <div class="position-relative d-flex justify-content-center">
                    <span class="px-2 text-grey bg-white">Or Continue with</span>
                </div>
            </div>
            <button @click="facebookSignIn" class="btn btn-primary" type="submit"> 
                <i class="fab fa-facebook"></i>
            </button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import {db} from '../firebase/firebaseInit'
import firebase from 'firebase/app'
import 'firebase/auth'
// import {getAuth, signInWithPopup, FacebookAuthProvider} from 'firebase/auth'
import loading from './loading.vue'
export default {
  components: { loading },
    name: 'Register',
    data(){
        return{
            loading: null,
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            error: null,
            errorMsg: '',
        }
    },
    methods:{
        async register(){
            this.loading = true
            if(this.fireName !== '' && this.lastName !== '' && this.userName !== '' && this.email !== '' && this.password !== ''){
                // this.loading = false
                this.error = false
                this.errorMsg = ''
                const firebaseAuth = await firebase.auth()
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
                const result = await createUser
                const dataBase = db.collection('user').doc(result.user.uid)
                await dataBase.set({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    userName: this.userName,
                    email: this.email,
                })
                this.$router.push({name: 'Admin'})
                return
            }
            this.loading = false
            this.error = true
            this.errorMsg = 'Please fill out all the fields'
            return
        },
        facebookSignIn(){
            let provider = new firebase.auth.FacebookAuthProvider()

            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken

                let user = result.user
                console.log(user);
                this.$router.push({name: 'Home'})
            }).catch(err => {
                let errorCode = err.code
                let errorMsg = err.message
                console.log(errorMsg);

                let email = err.email
                let creadential = err.creadential
                this.$router.push({name: 'Home'})
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
            color: rgb(215, 49, 49);
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
                font-size: 40px;
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
              margin: -15px 0 12px;
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
        background-image: url('../../public/img/background-2.jpeg');
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