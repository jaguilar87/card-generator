<template>
  <span class="Stat">
    <shield class="Stat-icon" v-if="type === 'armor'" :style="iconStyle" />
    <speed class="Stat-icon" v-if="type === 'speed'" :style="iconStyle" />
    <card class="Stat-icon" v-if="type === 'card'" :style="iconStyle" />

    <span class="Stat-value" :style="valueStyle">
      {{ value }}
    </span>
  </span>
</template>

<script>
import shield from '@/assets/lead-hounds/stats/shield.svg';
import speed from '@/assets/lead-hounds/stats/speed.svg';
import card from '@/assets/lead-hounds/stats/card.svg';

export default {
  props: {
    type: String,
    value: Number,
    iconColor: String,
    valueColor: String
  },
  computed: {
    iconStyle() {
      return { fill: this.iconColor || 'b8a9c9' };
    },
    valueStyle() {
      return { color: this.valueColor || 'black' };
    }
  },
  components: {
    shield,
    speed,
    card
  }
};
</script>

<style lang="scss" scoped>
.Stat {
  height: 20px;
  width: 20px;
  position: relative;
  z-index: 0;

  &-icon {
    height: 18px;
    width: 18px;
    position: absolute;
    z-index: 1;
    right: 0px;
  }

  &-value {
    font-size: 9pt;
    position: absolute;
    z-index: 2;
    right: 5px;
  }
}
</style>
