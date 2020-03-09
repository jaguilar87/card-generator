<template>
  <tr :class="style" v-if="values">
    <td class="StatLine-name">
      <damageIcon class="StatLine-icon" v-if="isDamage" />
      <accuaryIcon class="StatLine-icon" v-if="isAccuracy" />
      <speedIcon class="StatLine-icon" v-if="isSpeed" />
      <cardIcon class="StatLine-icon" v-if="isCards" />
      {{ name }}
    </td>
    <td class="StatLine-value" v-for="(value, i) of values" :key="i">
      {{ value }}
    </td>
  </tr>
</template>

<script>
import damageIcon from '@/assets/lead-hounds/stats/damage.svg';
import accuaryIcon from '@/assets/lead-hounds/stats/accuracy.svg';
import cardIcon from '@/assets/lead-hounds/stats/card.svg';
import speedIcon from '@/assets/lead-hounds/stats/speed.svg';

export default {
  props: {
    name: String,
    values: Array
  },
  computed: {
    style() {
      return {
        StatLine: true,
        [`StatLine--${this.name}`]: true
      };
    },
    isDamage() {
      return this.name === 'Damage';
    },
    isAccuracy() {
      return this.name === 'Accuracy';
    },
    isSpeed() {
      return this.name === 'Speed';
    },
    isCards() {
      return this.name === 'Cards';
    }
  },
  components: {
    damageIcon,
    cardIcon,
    accuaryIcon,
    speedIcon
  }
};
</script>

<style lang="scss" scoped>
.StatLine {
  border-bottom: 1px solid black;
  border-top: 1px solid black;

  &-name {
    font-weight: bold;
  }

  &-icon {
    width: 8px;
    height: 8px;
  }

  &-value {
    text-align: center;
  }

  &--Damage > * {
    font-weight: bold;
  }
}
</style>
