<template>
  <table class="Stats" v-if="shouldShow">
    <StatLine name="Damage" :values="damageTrack" />
    <StatLine name="Accuracy" :values="accuracyValues" />
    <StatLine name="Speed" :values="speedValues" />
    <StatLine name="Cards" :values="cardsValues" />
  </table>
</template>

<script>
import StatLine from '@/cards/lead-hounds/body/StatLine.vue';

export default {
  props: {
    stats: Object,
    disabled: Boolean
  },
  computed: {
    shouldShow() {
      return (
        this.stats &&
        (this.speedValues || this.cardsValues || this.accuracyValues)
      );
    },
    damageTrack() {
      return this.disabled ? ['Disabled'] : this.stats.damage;
    },
    accuracyValues() {
      return this.disabled ? null : this.stats.accuracy;
    },
    speedValues() {
      return this.disabled ? this.stats.disabledSpeed : this.stats.speed;
    },
    cardsValues() {
      return this.disabled ? this.stats.disabledCards : this.stats.cards;
    }
  },
  components: {
    StatLine
  }
};
</script>

<style lang="scss" scoped>
.Stats {
  width: 100%;
}
</style>
