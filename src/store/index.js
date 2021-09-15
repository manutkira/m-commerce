import { createStore } from 'vuex'

let cart = window.localStorage.getItem('cart')

export default createStore({
  state: {
    cart: cart ? JSON.parse(cart) : []
  },
  getters: {
    totalPrice: state => {
      let total = 0

      state.cart.filter(item => {
        total += (item.productPrice * item.productQuantity)
      })
      return total
    }
  },
  mutations: {
    addToCart(state, payload){
      const found = state.cart.find(product => product.productId == payload.productId)

      if(found){
        found.productQuantity++
      }else{
        state.cart.push(payload)
      }
      this.commit('saveData')
    },
    saveData(state){
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state,payload){
      let item = state.cart.indexOf(payload)
      state.cart.splice(item,1)
      this.commit('saveData')
    },
  },
  actions: {
  },
  modules: {
  }
})
