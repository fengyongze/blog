<template lang="html">
  <div id="editor">
    <textarea v-model="input"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import Marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/Darkula.css'
import $ from 'jquery'
export default {
  name: 'markdown',
  components: {Marked, highlightjs},
  data () {
    return {
      input: '# hello'
    }
  },
  computed: {
    compiledMarkdown: function () {
      return Marked(this.input, {sanitize: true, highlight: (code) => highlightjs.highlightAuto(code).value})
    }
  },
  watch: {
    compiledMarkdown: function () {
      setTimeout(function () {
        $('pre').addClass('hljs')
      }, 0)
    }
  }
}
</script>
<style media="screen">
#editor {
  height: 500px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

</style>
