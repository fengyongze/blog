<template>
  <section class="Content">
    <article class="article" v-for="article in article.item">
      <div class="article-meta">
        <router-link :to="article.bid" class="article-date">{{article.date | capitalize}}</router-link>
      </div>
      <div class="article-inner">
        <router-link :to="article.bid"><h1 class="title">{{article.title}}</h1></router-link>
        <div v-html="compiledMarkdown(article.content[0])">
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import Marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/Darkula.css'
import $ from 'jquery'
export default {
  name: 'Content',
  components: {Marked, highlightjs, $},
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.getCustomers()
  },
  watch: {
    '$route': 'getCustomers'
  },
  filters: {
    capitalize: function (value) {
      return value.slice(0, 10)
    }
  },
  methods: {
    getCustomers: function () {
      let id
      if (this.$route.params.id != null) {
        id = this.$route.params.id
      } else {
        id = ''
      }
      this.$http.post('/blog/laravel/public/member/index', {'BID': id}).then((response) => {
        this.$set(this.article, 'item', response.data.data)
      })
    },
    compiledMarkdown: function (value) {
      setTimeout(function () {
        $('pre').addClass('hljs')
      }, 0)
      return Marked(value, {sanitize: true, highlight: (code) => highlightjs.highlightAuto(code).value})
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
h1{
  font-size: 2em;
}
.Content{
  display: block;
  margin-left: 10px;
  .article{
    margin:50px 0;
    .article-date{
      display: inline-block;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing:2px;
      color:#999;
      margin-bottom:1em;
      margin-left: 5px;
      line-height: 1em;
      text-shadow: 0 1px #fff;
      font-weight: bold;
    }
    .article-inner{
      overflow: hidden;
      background-color: #fff;
      box-shadow:1px 2px 3px #ddd;
      padding:20px;
      a{
        text-decoration: none;
      }
      .title{
          text-align: center;
          font-size: 24px;
          color: #555353;
        }
      }
    .article-entry{
      color:#555;
      padding:0 20px;
      p,table{
        line-height: 1.6rem;
        margin:1.6em 0;
      }
    }
  }
}
@media screen and (min-width: 768px){
  .Content{
    float: left;
    width: 73.3333333333%;
  }
}
.Content:before,.Content:after{
  content: "";
  display: table;
}
.Content:after{
  clear: both;
}

</style>
