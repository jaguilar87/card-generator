<template>
  <div class="Speed">
    <div class="Speed-title">Speed</div>
    <div :class="style">{{speed}}</div>
  </div>
</template>

<script>
export default {
  props: {
    speed: Number,
  },
  computed: {
    style() {
      return {
        'Speed-value': true,
        'Speed-value--positive': this.speed > 0,
        'Speed-value--negative': this.speed < 0,
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Speed {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
  padding-top: 10px;

  &-value {
    margin-top: -3px;
    font-size: 12pt;
    font-weight: bold;

    &--positive {
      color: #405d27;

      &::before { 
        content: "+";
      }
    }

    &--negative {
      color: #7a3b2e;
    }
  }

  &-title {
    font-size: 6pt;
  }
}
</style>
