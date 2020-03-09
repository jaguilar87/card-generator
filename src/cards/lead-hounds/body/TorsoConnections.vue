<template>
  <div class="TorsoConnections" v-if="connections">
    <Suit class="TorsoConnections-top" :type="connections[0]" />
    <Suit class="TorsoConnections-right" :type="connections[1]" />
    <Suit class="TorsoConnections-bottom" :type="connections[2]" />
    <Suit class="TorsoConnections-left" :type="connections[3]" />
  </div>
</template>

<script>
import Suit from '@/cards/lead-hounds/other/Suit.vue';

export default {
  props: {
    connections: Array
  },
  components: {
    Suit
  }
};
</script>

<style lang="scss" scoped>
$side: 18px;

.TorsoConnections {
  position: relative;
  height: $side;
  width: $side;
  bottom: 1px;
  right: 0px;

  &-top {
    position: absolute;
    left: ($side / 2) - 4px;
    top: 0px;
  }

  &-right {
    position: absolute;
    right: 0px;
    top: ($side / 2) - 4px;
  }

  &-bottom {
    position: absolute;
    left: ($side / 2) - 4px;
    bottom: -1px;
  }

  &-left {
    position: absolute;
    left: 0px;
    top: ($side / 2) - 4px;
  }
}
</style>
