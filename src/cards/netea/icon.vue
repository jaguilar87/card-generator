<template>
  <div class="NeteaIcon">
    <acIcon v-if="type === 'AC'" />
    <acweIcon v-if="type === 'AC/WE'" />
    <avIcon v-if="type === 'AV'" />
    <chaIcon v-if="type === 'Cha'" />
    <lvIcon v-if="type === 'LV'" />
    <scIcon v-if="type === 'SC'" />
    <weIcon v-if="type === 'WE'" />
    <infIcon v-if="type === 'Inf'" />
    <ruleIcon v-if="type === 'Rule'" />
  </div>
</template>
<script>
import acIcon from '../../assets/netea/ac.svg';
import acweIcon from '../../assets/netea/acwe.svg';
import avIcon from '../../assets/netea/av.svg';
import chaIcon from '../../assets/netea/cha.svg';
import lvIcon from '../../assets/netea/lv.svg';
import scIcon from '../../assets/netea/sc.svg';
import weIcon from '../../assets/netea/we.svg';
import infIcon from '../../assets/netea/inf.svg';
import ruleIcon from '../../assets/netea/rule.svg';

export default {
  props: {
    type: String,
  },
  components: {
    acIcon,
    acweIcon,
    avIcon,
    chaIcon,
    lvIcon,
    scIcon,
    weIcon,
    infIcon,
    ruleIcon,
  },
};
</script>

<style lang="scss" scoped>
.NeteaIcon {
  svg {
    fill: white;
  }
}
</style>
