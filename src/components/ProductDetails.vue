<template>
  <!--Section: Block Content-->
  <div>
<navbar/>

<section class="mt ml-3">

  <div class="row mt">
    <div class="col-md-6">

      <div id="mdb-lightbox-ui"></div>

      <div class="mdb-lightbox">

        <div class="row product-gallery mx-1">

          <div class="col-12 mb-0" v-for="item in this.$store.state.products" :key="item">
            <figure class="view overlay rounded z-depth-1 main-img">
              <a href="#"
                data-size="710x823">
                <img :src="item.productImage[0]"
                  class="img-fluid z-depth-1">
              </a>
            </figure>
            
          
            <div class="row">
              <div class="col-3">
                <div class="view overlay rounded z-depth-1 gallery-item">
                  <img :src="item.productImage[1]"
                    class="img-fluid">
                  <div class="mask rgba-white-slight"></div>
                </div>
              </div>
              <div class="col-3">
                <div class="view overlay rounded z-depth-1 gallery-item">
                  <img :src="item.productImage[2]"
                    class="img-fluid">
                  <div class="mask rgba-white-slight"></div>
                </div>
              </div>
              <div class="col-3">
                <div class="view overlay rounded z-depth-1 gallery-item">
                  <img :src="item.productImage[3]"
                    class="img-fluid">
                  <div class="mask rgba-white-slight"></div>
                </div>
              </div>
              <div class="col-3">
                <div class="view overlay rounded z-depth-1 gallery-item">
                  <img :src="item.productImage[4]"
                    class="img-fluid">
                  <div class="mask rgba-white-slight"></div>
                </div>
              </div>
            </div>
        </div>

      </div>
</div>
    </div>
    <div class="col-md-6 " v-for="item in this.$store.state.products" :key="item">

      <h5 class="ml-5">{{item.productName}}</h5>
      <p class="mb-2 text-muted text-uppercase small ml-5">{{item.productBrand}}</p>
      <ul class="rating">
        <li class="ml-5">
          <i class="nes-icon is-large star"></i>
          <i class="nes-icon is-large star"></i>
          <i class="nes-icon is-large star"></i>
          <i class="nes-icon is-large star"></i>
          <i class="nes-icon is-large star is-half"></i>
          <!-- <i class="nes-icon is-large star is-half"></i>
          <i class="nes-icon is-large star is-half"></i>
          <i class="nes-icon is-large star is-half"></i> -->
          <!-- <i class="fas fa-star fa-sm text-primary"></i>
          <i class="fas fa-star fa-sm text-primary"></i>
          <i class="fas fa-star fa-sm text-primary"></i> -->
          <!-- <i class="far fa-star fa-sm text-primary"></i> -->
        </li>
      </ul>
      <p><span class="mr-1 ml-5"><strong>${{item.productPrice}}.00</strong></span></p>
      <p class="pt-1 mr-4 ml-5" v-html="item.productDetails"></p>
      <div class="table-responsive ml-5">
        <table class="table table-sm table-borderless mb-0">
          <tbody>
            <tr>
              <th class="pl-0 w-25" scope="row"><strong>Model</strong></th>
              <td>{{item.productName}}</td>
            </tr>
            <tr>
              <th class="pl-0 w-25" scope="row"><strong>Color</strong></th>
              <td>{{item.productColor}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr>
      <div class="table-responsive mb-2 ml-5">
        <table class="table table-sm table-borderless">
        </table>
      </div>
      <button type="button" class=" ml-5 btn btn-warning btn-md mr-1 mb-2"><i
          class="fas fa-shopping-cart pr-2"></i>Add to cart</button>
    </div>
  </div>

</section>
<!--Section: Block Content-->
<div class="nes-container is-rounded m-5 text-center font-weight-bold">
  <p class="nes-select is-success">Other Product</p>
</div>
  <product/>
  <mini-cart/>
  </div>
</template>

<script>
import AddToCart from '../components/AddToCart.vue'
import {db, firebaseApp } from '../firebase/firebaseInit'
import Product from '../section/Product.vue'
import MiniCart from './miniCart.vue'
import Navbar from './Navbar.vue'
export default {
  components: { Navbar, AddToCart, Product, MiniCart },
    name: 'ProductDetails',
    data(){
      return{
          products: [],
      }
  },
  methods:{
    // getImage(images){
    //     return images[0]
    // },
    readData(){ 
          db.collection('products').get().then(snapshot => {
              snapshot.forEach(doc => {
                  const data = {
                      id: doc.id,
                      name: doc.data().name,
                      description: doc.data().description,
                      brand: doc.data().brand,
                      color: doc.data().color,
                      price: doc.data().price,
                      tag: doc.data().tag,
                      images: doc.data().images
                  }
                  this.products.push(data)
              })
          })
        },
    },
    created(){
        this.readData()
    },
}
</script>

<style>
.mt{
    margin-top: 7.5rem;
}

</style>