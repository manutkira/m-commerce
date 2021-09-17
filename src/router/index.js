import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../section/Product.vue'
import Admin from '../views/Admin.vue'
import Overview from '../views/OverView.vue'
import Products from '../views/Products.vue'
import Order from '../views/Order.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Checkout from '../components/Checkout.vue'
import Success from '../components/Success.vue'
import Details from '../components/ProductDetails.vue'
import Profile from '../views/Profile.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'orders',
        name: 'Order',
        component: Order
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from , next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(res => res.meta.requiresAuth)
  if(requiresAuth && !currentUser){
     next('/login')
  } else if(requiresAuth && currentUser){
    next()
  }else{
    next()
  }
})

export default router
