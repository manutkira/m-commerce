<template>
  <div class="add-to-cart">
      <button class="text-center my-4 btn btn-warning" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script>
export default {
    name: 'AddToCart',
    props: {
        name: String,
        price: String,
        pId: String,
        image: String,
    },
    data(){
        return{
            productName: this.name,
            productPrice: this.price,
            productId: this.pId,
            productImage: this.image,
        }
    },
    methods: {
        addToCart(){
            $('#miniCart').modal('show')
            this.$store.commit('addToCart', {
                productName: this.productName,
                productPrice: this.productPrice,
                productId: this.productId,
                productImage: this.productImage,
                productQuantity: 1,
            })
        }
    }
}
</script>

<style>

</style>