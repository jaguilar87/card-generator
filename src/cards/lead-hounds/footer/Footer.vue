<template>
  <div class="HitPoints" v-if="disabled">
    <div class="HitPoints-disabled">DISABLED</div>
  </div>
  <div class="HitPoints" v-else>
    <span class="HitPoints-track">
      <span class="HitPoints-point" v-for="i of hp" :key="i">{{ i }}</span>
    </span>
    <TorsoConnections v-if="isTorso" />
    <span class="HitPoints-track">
      <shield class="HitPoints-icon" v-for="i of armor" :key="i" />
    </span>
  </div>
</template>

<script>
import shield from '@/assets/lead-hounds/stats/shield.svg';
import TorsoConnections from '@/cards/lead-hounds/body/TorsoConnections.vue';

export default {
  props: {
    hp: Number,
    armor: Number,
    isTorso: Boolean,
    disabled: Boolean
  },
  components: {
    shield,
    TorsoConnections
  }
};
</script>

<style lang="scss" scoped>
.HitPoints {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &-disabled {
    line-height: 20px;
    height: 20px;
    width: 100%;
    text-align: center;
    color: darkgray;
  }

  &-point {
    height: 17px;
    width: 17px;
    border: 1px solid black;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    font-size: 8.5pt;
    margin-left: 1px;
    margin-top: 1px;
    margin-bottom: 1px;
  }

  &-armor {
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    z-index: 0;
  }

  &-icon {
    fill: #30254a;
    height: 16px;
    width: 16px;
    margin-right: 1px;
    margin-top: 1px;
    margin-bottom: 1px;
  }
}
</style>
