<template>
  <div class="home">
  <Navbar/>
    <hero/>
    <product/>

    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="../../public/img/svg/product.svg" width="400" alt="">
        </div>
        <div class="col-md-6">
          <h3>Learn More About Us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis unde praesentium earum perspiciatis assumenda qui nemo possimus nisi, veritatis tempore laudantium voluptatem laboriosam at iure in harum nostrum consequuntur!
          </p>
          <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from '../components/Hero.vue';
import Navbar from '../components/Navbar.vue';
import Product from '../section/Product.vue';
export default {
  name: 'Home',
  components: {
    Hero,
    Navbar,
    Product,
  }
}
</script>
