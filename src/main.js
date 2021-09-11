import { createApp } from 'vue';
import jQuery from 'jquery';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/app.scss'
import 'popper.js';
import firebase from 'firebase/app';
import 'firebase/auth'

window.$ = window.jQuery = jQuery;

let app

firebase.auth().onAuthStateChanged(() =>{
    if(!app){
      app =  createApp(App).use(store).use(router).mount('#app');

    }
})

