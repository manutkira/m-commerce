<template>
  <div class="add-to-cart">
      <button class="text-center my-4 btn btn-warning">Add to Cart</button>
  </div>
</template>

<script>
export default {
    name: 'AddToCart',
    props: {
        name: String,
        price: String,
        productId: String,
    },
    data(){
        return{
            productName: this.name,
            productPrice: this.price,
            product_id: this.productId,
        }
    },
}
</script>

<style>

</style>