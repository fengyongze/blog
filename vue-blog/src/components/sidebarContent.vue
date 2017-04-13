<template lang="html">
  <aside class="sidebar">
    <div class="widget-wrap">
      <h3 class="widget-title">最新文章</h3>
      <div class="widget">
        <ul>
          <li v-for="titles in article.title">
              <router-link :to="titles.bid">{{titles.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.getCustomers()
  },
  methods: {
    getCustomers: function () {
      this.$http.post('/blog/laravel/public/member/index', {'BID': ''}).then((response) => {
        this.$set(this.article, 'title', response.data.data)
      })
    }
  }
}

</script>

<style lang="scss">
.sidebar{
  display: block;
  .widget-wrap{
    margin:50px 0;
    .widget-title{
      text-transform: uppercase;
      letter-spacing: 2px;
      color:#999;
      margin-bottom: 1em;
      margin-left: 5px;
      line-height: 1em;
      text-shadow: 0 1px #fff;
      font-weight: bold;
    }
    .widget{
      line-height: 1.6em;
      word-wrap: break-word;
      font-size: 0.9em;
      color:#777;
      text-shadow: 0 1px #fff;
      background:#ddd;
      box-shadow: 0 -1px 4px #ccc inset;
      border:1px solid #ccc;
      padding:15px;
      border-radius:3px;
      a{
        color:#258fb8;
        text-decoration: none;
      }
    }
  }
}
@media screen and (min-width: 768px){
  .sidebar{
    float:left;
    width:23.333333333%;
    margin:0 0.83333333%;
  }
}
</style>
