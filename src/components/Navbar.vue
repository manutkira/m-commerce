<template>
  <div class="hello">
   <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light">
     <div class="container">
        <router-link class="navbar-brand" to="/">E-Shop</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product" class="nav-link" href="#">Products</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/about" class="nav-link" href="#">About</router-link>
            </li>
          
          </ul>
          <form class="form-inline my-2 my-lg-0 d-flex align-items-start">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <router-link to="/login" class="btn btn-outline-success my-2 my-sm-0" >Get Start</router-link>
            <a href="#" class="btn btn-outline-success my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#miniCart">
              <i class="fas fa-cart-plus"> My cart</i> </a>
          </form>
        </div>
     </div>
</nav>
    
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props:{
    msg: String
  },
  components: {
  }
};
</script>

<style scoped lang="scss">
  @media (min-width: 992px) { 
    
    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background-color: #fff !important;
    }
   }
</style>
