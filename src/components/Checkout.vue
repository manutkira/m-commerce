<template>
  <div class="check-out">
      <navbar/>

      <div class="container mt-5 pt-5">
          <div class="row">
              <div class="col-md-8">
                  <h4 class="">Checkout Page</h4>
                  <div class="container-fluid bg-trasparent my-4 p-3" style="position: relative;">
              <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-3 g-3 ">
                <div class="col mt-3" v-for="item in this.$store.state.cart" :key="item">
                    <div class="nes-container  h-100 shadow-sm"> 
                          <div class="float-right time " @click="$store.commit('removeFromCart')">
                             <i class="fa fa-times"></i>
                          </div>
                      <div class="">
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
                

        <div class="nes-container with-title font-weight-bold mtx">
    <form @submit.prevent="handleSubmit">
      <fieldset :class="{ dis: loading }" class="fields">
        <div class="nes-field"></div>

        <div class="nes-field">
          <label for="name_field">Name</label>
          <input
            placeholder="Enter your name"
            type="text"
            name="name"
            id="name_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="email_field">Email</label>
          <input
            placeholder="Enter your email address "
            type="email"
            name="email"
            id="email_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="address_field">Address</label>
          <input
            placeholder="eg. st.103 "
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
        <div class="nes-field">
          <label for="email_field">Credit Card</label>
          <div id="stripe-element-mount-point" class="nes-input" />
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
         Pay ${{ this.$store.getters.totalPrice}}.00
        </button>
      </div>
    </form>
  </div>
              </div>

          </div>
      <mini-cart/>
      </div>
  </div>
</template>

<script> 
import MiniCart from './miniCart.vue'
import Navbar from './Navbar.vue'
import axios from 'axios'

const style = {
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: "800",
      fontFamily: "Press Start 2P",
      fontSize: "12px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "green"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "red"
    }
  }
};
import {  computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    MiniCart
  },
  setup() {
    const router = useRouter();
    let stripe = null;
    let loading = ref(true);
    let elements = null;
    onMounted(async () => {
      const ELEMENT_TYPE = "card";
      stripe = Stripe('pk_test_51JZrutIbWCB3LvS8rPmn7lxPZUQQuM436RnxZmWgUmCWMu1iSUk8slsJgc8Fdl5a4Rdxq5bzdOlHFcn682yAvVx700fIRV23y7');
      elements = stripe.elements();
      const element = elements.create(ELEMENT_TYPE, style);
      element.mount("#stripe-element-mount-point");
      loading.value = false;
    });

    async function handleSubmit(event) {
      if (loading.value) return;
      loading.value = true;
      const { name, email, address, city } = Object.fromEntries(
        new FormData(event.target)
      );
      console.log("here", name, email, address, city);
      const billingDetails = {
        name,
        email,
        address: {
          city,
        }
      };
      const cardElement = elements.getElement("card");
      try {
        const response = await fetch("http://localhost:4001/stripe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount: 6000})
        });
        const { secret } = await response.json();
        console.log("secret", secret);
        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails
        });
        console.log("error?", paymentMethodReq);
        const { error } = await stripe.confirmCardPayment(secret, {
          payment_method: paymentMethodReq.paymentMethod.id
        });
        loading.value = false;
        console.log("error?", error);
        router.push("/success");
      } catch (error) {
        console.log("error", error);
        loading.value = false;
      }
    }
    function redirect() {
      stripe.redirectToCheckout({
        successUrl: "http://localhost:4001/success",
        cancelUrl: "http://localhost:8080",
        lineItems: [
          {
            price: "price_0J1wDR0ADhx7uM8yPL8Wmpoq",
            quantity: 1
          }
        ],
        mode: "payment"
      });
    }
    return { redirect, loading, handleSubmit };
  }
};
</script>

<style scoped>
.time{
  cursor: pointer;
}
.mtx{
  margin-top: 2rem;
}

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