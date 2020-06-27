<template>
  <span class="TypeIcon">
    <special class="TypeIcon-icon" v-if="type === 'Special'" :style="iconStyle" />
    <torso class="TypeIcon-icon" v-if="type === 'Torso'" :style="iconStyle" />
    <propulsion class="TypeIcon-icon" v-if="type === 'Propulsion'" :style="iconStyle" />
    <armLeft class="TypeIcon-icon" v-if="type === 'Left Arm'" :style="iconStyle" />
    <armRight class="TypeIcon-icon" v-if="type === 'Right Arm'" :style="iconStyle" />
  </span>
</template>

<script>
import special from '@/assets/lead-hounds/types/special.svg';
import torso from '@/assets/lead-hounds/types/torso.svg';
import propulsion from '@/assets/lead-hounds/types/jetpack.svg';
import armLeft from '@/assets/lead-hounds/types/hand-left.svg';
import armRight from '@/assets/lead-hounds/types/hand-right.svg';

export default {
  props: {
    type: String,
    iconColor: String,
  },
  computed: {
    iconStyle() {
      return { fill: this.iconColor || 'white' };
    },
  },
  components: {
    special,
    torso,
    propulsion,
    armLeft,
    armRight,
  }
};
</script>

<style lang="scss" scoped>
.TypeIcon {
  &-icon {
    height: 100%;
    width: 100%;
  }
}
</style>
