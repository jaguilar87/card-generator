<template>
  <div class="Action">
    <div class="Action-header">
      <div class="Action-name">
        <ActionIcon v-for="i in action.apCost" :key="i" />
        {{ action.name }}
      </div>
      <div class="Action-range">{{ action.range }}</div>
      <div class="Action-targetValue">{{ action.targetValue }}</div>
      <div class="Action-suits">
        <Suit v-for="suit in action.suits" :key="suit" :type="suit" />
      </div>
    </div>
    <div class="Action-body" v-html="resultHtml"></div>
  </div>
</template>

<script>
import Suit from '@/cards/lead-hounds/components/Suit.vue';
import ActionIcon from '@/cards/lead-hounds/components/ActionIcon.vue';
import showdown from 'showdown';

const md = new showdown.Converter();

export default {
  props: {
    action: Object
  },
  computed: {
    resultHtml() {
      console.log(this.action.result);
      return md.makeHtml(this.action.result);
    }
  },
  components: {
    Suit,
    ActionIcon
  }
};
</script>

<style lang="scss" scoped>
.Action {
  width: 100%;

  &-header {
    width: 100%;
    display: block;
  }

  &-name {
    width: 50%;
    display: inline-block;
    font-weight: bold;
  }

  &-range {
    width: 16.6%;
    display: inline-block;
  }

  &-targetValue {
    width: 16.6%;
    display: inline-block;
    text-align: center;
  }

  &-suits {
    width: 16.6%;
    display: inline-block;
    text-align: right;
  }
}
</style>
