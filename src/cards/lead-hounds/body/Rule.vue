<template>
  <div class="Rule">
    <div class="Rule-name">{{ rule.name }}</div>
    <EffectText :text="rule.desc" />
  </div>
</template>

<script>
import EffectText from '@/cards/lead-hounds/other/EffectText.vue';

export default {
  props: {
    rule: Object
  },
  components: {
    EffectText
  }
};
</script>

<style lang="scss" scoped>
.Rule {
  width: 100%;

  &-name {
    font-weight: bold;
  }
}
</style>
