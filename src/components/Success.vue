<template>
  <div class="mt-5 nes-container with-title is-centered ml-5 mr-5">
  <p class="title font font-weight-bold">Thank you for you support</p>
    <i class="nes-octocat animate"></i>
  <p class="p">We really appreciated your support and money.</p>
    <p class="ps"> Please continue to support us even if you're poor!</p>
  <router-link to="/" class="nes-btn is-primary mt-4">To homepage</router-link>
</div>
</template>

<script>
export default {
    name: 'Success',
}
</script>

<style>
.font{
  color: rgb(66, 193, 66);
  font-size: 6px;
}
.p{
  font-size: 30px;
}
.ps{
  font-size: 25px;
}
</style>