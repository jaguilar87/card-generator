<template>
  <div class="EffectText" v-html="html"></div>
</template>

<script>
import showdown from 'showdown';

const md = new showdown.Converter();

export default {
  props: {
    text: String
  },
  computed: {
    html() {
      return md.makeHtml(this.text);
    }
  }
};
</script>
