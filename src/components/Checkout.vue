<template>
  <div class="check-out">
      <navbar/>

      <div class="container mt-5 pt-5">
          <div class="row">
              <div class="col-md-8">
                  <h4 class="">Checkout Page</h4>
                  <div class="container-fluid bg-trasparent my-4 p-3" style="position: relative;">
              <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 ">
                <div class="col mt-3" v-for="item in this.$store.state.cart" :key="item">
                    <div class="card h-100 shadow-sm"> 
                      <div class="card-body">
                          <div class="float-right time" @click="$store.commit('removeFromCart')">
                             <i class="fa fa-times"></i>
                          </div>
                      <img :src="item.productImage" class="card-img-top" alt="...">

                      </div>
                        <div class="card-body">
                            <div class="clearfix mb-3">
                                <span class="float-end price-hp">{{item.productName}}</span> 
                            </div>
                                <h6 class="float-end price-hp">${{item.productPrice}}.00</h6> 
                                <h5 class="card-title">Quantity: {{item.productQuantity}}</h5>
                        </div>
                    </div>
                </div>
            </div>
            </div>
              </div>
              <div class="col-md-4">

        <div class="nes-container with-title is-centered">
    <form @submit.prevent="handleSubmit">
      <fieldset :class="{ dis: loading }" class="fields">
        <div class="nes-field"></div>
        
        <div class="nes-field">
          <label for="email_field">Email</label>
          <input
            placeholder="Enter your email "
            type="email"
            name="email"
            id="email_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="address_field">Address</label>
          <input
            placeholder="Enter your address"
            type="text"
            name="address"
            id="address_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="city_field">City</label>
          <input
            placeholder="eg. Phnom Penh"
            type="text"
            name="city"
            id="city_field"
            class="nes-input"
          />
        </div>

        <div class="">
               <h4>
                Total Price: ${{this.$store.getters.totalPrice}}.00
               </h4>
            </div>
      </fieldset>
      <div class="nes-field">
        <button
          type="submit"
          class="nes-btn is-primary"
          :class="{ dis: loading }"
        >
         Pay ${{this.$store.getters.totalPrice}}.00
        </button>
      </div>
    </form>
  </div>
              </div>

          </div>
      </div>
  </div>
</template>

<script> 
import Navbar from './Navbar.vue'
export default {
  components: { Navbar },
    name: 'checkOut',
    mounted(){
        this.loadIntent()
    },
    methods: {
        loadIntent(){

        }
    }
}
</script>

<style scoped>

.checkout {
  border: 1px solid black;
  padding: 3px;
}
.fields {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 30px;
}
.img {
  display: flex;
  justify-content: center;
}
.showcase {
  margin-bottom: 20px;
}
.mt {
  margin-top: 20px;
}
.dis {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}
button {
  margin-top: 30px;
}
</style>