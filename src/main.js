import { createApp } from 'vue';
import Vue from 'vue'
import jQuery from 'jquery';
import App from './App.vue';
import router from './router';
import store from './store';
import 'popper.js';
import 'bootstrap';
import './assets/app.scss'
import firebase from 'firebase/app';
import 'firebase/auth'
import Vue3Editor from 'vue3-editor'
import Swal from 'sweetalert2'

window.$ = window.jQuery = jQuery;
window.Swal = Swal
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast

let app

firebase.auth().onAuthStateChanged(() =>{
    if(!app){
      app =  createApp(App).use(store).use(router).use(Vue3Editor).mount('#app');
    }
})

