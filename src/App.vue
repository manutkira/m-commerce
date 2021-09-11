<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
};
</script>

<style lang="scss" scoped>
button, .router-button{
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
.button-ghost{
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }
  i{
    margin-left: 8px;
  }
}
.button-light{
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
</style>
