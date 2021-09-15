<template>
  <div class="mini-cart">
      <div class="modal fade" id="miniCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
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
          <div class="modal-footer">
            <button type="button" class="secondary" data-dismiss="modal">Continue Shopping</button>
            <button @click="checkout" type="button" class="primary">Check Out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'miniCart',
    methods: {
        checkout(){
            $('#miniCart').modal('hide')
            this.$router.push('/checkout')
        },
    }
}
</script>

<style scoped lang="scss">
.time{
    cursor: pointer;
}
.primary{
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
.secondary{
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #5dc4a7;
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

.card {
    background: #fff;
    box-shadow: 0 6px 10px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
    transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s box-shadow, .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
    border: 0;
    border-radius: 1rem
}

.card-img,
.card-img-top {
    border-top-left-radius: calc(1rem - 1px);
    border-bottom-right-radius: calc(1rem - 1px)
}

.card h5 {
    overflow: hidden;
    height: 56px;
    font-weight: 900;
    font-size: 1rem
}

.card-img-top {
    width: 100%;
    max-height: 180px;
    object-fit: contain;
    padding: 30px
}

.card h2 {
    font-size: 1rem
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06)
}

.label-top {
    position: absolute;
    background-color: #8bc34a;
    color: #fff;
    top: 8px;
    right: 8px;
    padding: 5px 10px 5px 10px;
    font-size: .7rem;
    font-weight: 600;
    border-radius: 3px;
    text-transform: uppercase
}

.top-right {
    position: absolute;
    top: 24px;
    left: 24px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    font-size: 1rem;
    font-weight: 900;
    background: #ff5722;
    line-height: 90px;
    text-align: center;
    color: white
}

.top-right span {
    display: inline-block;
    vertical-align: middle
}

@media (max-width: 768px) {
    .card-img-top {
        max-height: 250px
    }
}

.over-bg {
    background: rgba(53, 53, 53, 0.85);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(0.0px);
    -webkit-backdrop-filter: blur(0.0px);
    border-radius: 10px
}

.btn {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    padding: 5px 50px 5px 50px
}

.box .btn {
    font-size: 1.5rem
}

@media (max-width: 1025px) {
    .btn {
        padding: 5px 40px 5px 40px
    }
}

@media (max-width: 250px) {
    .btn {
        padding: 5px 30px 5px 30px
    }
}

.btn-warning {
    background: none #f7810a;
    color: #ffffff;
    fill: #ffffff;
    border: none;
    text-decoration: none;
    outline: 0;
    box-shadow: -1px 6px 19px rgba(247, 129, 10, 0.25);
    border-radius: 100px
}

.btn-warning:hover {
    background: none #ff962b;
    color: #ffffff;
    box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35)
}

.bg-success {
    font-size: 1rem;
    background-color: #f7810a !important
}

.bg-danger {
    font-size: 1rem
}

.price-hp {
    font-size: 1rem;
    font-weight: 600;
    color: darkgray
}

.amz-hp {
    font-size: .7rem;
    font-weight: 600;
    color: darkgray
}

.fa-question-circle:before {
    color: darkgray
}

.fa-plus:before {
    color: darkgray
}

.box {
    border-radius: 1rem;
    background: #fff;
    // box-shadow: 0 6px 10px rgb(0 0 0 / 8%), 0 0 6px rgb(0 0 0 / 5%);
    // transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s box-shadow, .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12)
}

.box-img {
    max-width: 300px
}

.thumb-sec {
    max-width: 300px
}

@media (max-width: 576px) {
    .box-img {
        max-width: 200px
    }

    .thumb-sec {
        max-width: 200px
    }
}

.inner-gallery {
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 1px;
    display: inline-block;
    overflow: hidden;
    -o-object-fit: cover;
    object-fit: cover
}

@media (max-width: 370px) {
    .box .btn {
        padding: 5px 40px 5px 40px;
        font-size: 1rem
    }
}

.disclaimer {
    font-size: .9rem;
    color: darkgray
}

.related h3 {
    font-weight: 900
}

footer {
    background: #212529;
    height: 80px;
    color: #fff
}
body {
    font-family: var(--font3);
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)
}
</style>