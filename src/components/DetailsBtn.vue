<template>
  <div class="view-details">
      <button @click="viewProduct" class="text-center nes-btn ml-3 my-4 is-primary">View Details </button>
  </div>
</template>

<script>
export default {
    name: 'ViewDetails',
    props: {
        name: String,
        price: String,
        pId: String,
        image: String,
        details: String,
        brand: String,
        color: String,
    },
    data(){
        return{
            productName: this.name,
            productPrice: this.price,
            productId: this.pId,
            productImage: this.image,
            productDetails: this.details,
            productBrand: this.brand,
            productColor: this.color,
        }
    },
    methods: {
        viewProduct(){
            this.$store.commit('viewDetail', {
                productName: this.productName,
                productPrice: this.productPrice,
                productId: this.productId,
                productImage: this.productImage,
                productQuantity: 1,
                productDetails: this.productDetails,
                productBrand: this.productBrand,
                productColor: this.productColor,
            })
            this.$router.push('/details')
        }
    }
}
</script>

<style>

</style>