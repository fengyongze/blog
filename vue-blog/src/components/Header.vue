<template lang="html">
  <div class="Header">
    <div class="banner"></div>
    <div class="header-outer">
      <div class="header-inner">
        <nav class="main-nav">
          <router-link to="/">Home</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App123'
    }
  }
}
</script>

<style lang="scss">
.Header{
  height:300px;
  position: relative;
  .banner{
    background: url(../assets/banner1.jpg) center #000;
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-size: cover;
  }
  .header-outer{
    height:100%;
    position: relative;
    overflow: hidden;
    .main-nav{
      float: left;
      margin: 20px;
      a{
        color:#fff;
        opacity:0.6;
        text-decoration: none;
        text-shadow: 0 1px rgba(0,0,0,0.2);
      }
      a:hover{
        opacity: 1;
      }
    }
  }
}

</style>
