
<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Our Products</h1>
          <div class="row">
              
              <!-- <div class="col-md-4 " v-for="product in products" :key="product">
                  <div class="card product-item" v-for="(image, index) in product.images" :key="index">
                    <img :src="image" class="card-img-top" alt="...">
                        <div class="card-body ">
                            <div class="d-flex justify-content-between">
                            <h5 class="card-title">{{product.name}}</h5>
                            <h5 class="card-title">${{product.price}}</h5>

                            </div>
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
              </div> -->
              <div class="container bg-trasparent my-4 p-3" style="position: relative;">
        <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-3 g-3">
            <div class="col mt-3" v-for="product in products" :key="product">
                <div class="nes-container is-rounded h-100 shadow-sm " v-for="(img, index) in product.images.slice(0,1)" :key="index"> <img :src="img" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary">{{product.brand}}</span> <span class="float-end price-hp">Luxury</span> </div>
                        <h4 class="card-title">{{product.name}}</h4>
                        <h5 class="card-title">${{product.price}}.00</h5>
                        <div class="d-flex">
                       <add-to-cart
                        :image="getImage(product.images)"
                        :name="product.name"
                        :p-id="product.id"
                        :price="product.price" />
                        <details-btn
                        :image="product.images"
                        :name="product.name"
                        :p-id="product.id"
                        :price="product.price"
                        :details="product.description"
                        :brand="product.brand"
                        :color="product.color"
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
          </div>
      </div>
    
  </div>
</template>
<script>
import AddToCart from '../components/AddToCart.vue'
import { firebaseApp,db} from '../firebase/firebaseInit'
import 'firebase/database'
import DetailsBtn from '../components/DetailsBtn.vue';
export default {
  name: "Product",
  props: {
    msg: String
  },
  data(){
      return{
          products: [],
      }
  },
  components: {
    AddToCart,
    DetailsBtn
  },
  methods:{
    getImage(images){
        return images[0]
    },
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
                      images: doc.data().images,
                  }
                  this.products.push(data)
              })
          })
        },
    },
    created(){
        this.readData()
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
    .container-fluid {
    max-width: 1200px
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
    border-top-left-radius: calc(7rem - 50px);
    border-bottom-right-radius: calc(7rem - 50px)
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
    color: rgb(255, 0, 0)
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