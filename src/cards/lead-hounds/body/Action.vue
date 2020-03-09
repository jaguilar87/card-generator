<template>
  <div class="Action">
    <div class="Action-header">
      <div class="Action-name">
        <span v-for="i in action.apCost" :key="i">➧</span>
        <span v-if="action.disabledResponse">𝝮</span>
        {{ action.name }}
      </div>
      <div class="Action-range">{{ action.range }}</div>
      <div class="Action-targetValue">{{ action.targetValue }}</div>
      <div class="Action-suits">
        <Suit v-for="suit in action.suits" :key="suit" :type="suit" />
        <span v-show="!action.suits.length">-</span>
      </div>
    </div>
    <EffectText :text="action.result" />
  </div>
</template>

<script>
import Suit from '@/cards/lead-hounds/other/Suit.vue';
import EffectText from '@/cards/lead-hounds/other/EffectText.vue';

export default {
  props: {
    action: Object
  },
  components: {
    Suit,
    EffectText
  }
};
</script>

<style lang="scss" scoped>
.Action {
  width: 100%;

  &-header {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  &-name {
    text-align: left;
    width: 50%;
    flex-grow: 100;
    font-weight: bold;
  }

  &-range {
    width: 16.6%;
  }

  &-targetValue {
    width: 16.6%;
    text-align: center;
  }

  &-suits {
    width: 16.6%;
    text-align: right;
  }
}
</style>
