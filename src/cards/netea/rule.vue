<template>
  <div class="Rule">
    <div class="Rule-side">
      <div class="Rule-header" :style="titleStyle">
        <Icon class="Rule-icon" type="Rule" />
        <div class="Rule-name">{{ card.name }}</div>
        <div class="Rule-type">Rule</div>
      </div>
      <div class="Rule-body">
        {{ card.desc }}
      </div>
    </div>
    <div class="Rule-side Rule-side--reverse"></div>
  </div>
</template>

<script>
import NeteaIcon from './icon.vue';
import access from 'safe-access';

export default {
  computed: {
    titleStyle() {
      const safeThis = access(this);

      return {
        background: safeThis('$props.catalog.style.titleBg') || 'darkblue',
        color: safeThis('$props.catalog.style.titleText') || 'white'
      };
    }
  },
  props: {
    card: Object,
    catalog: Object,
    system: Object
  },
  components: {
    Icon: NeteaIcon
  }
};
</script>

<style lang="scss" scoped>
$card-color: #000000;
$border-color: #dcdcdc;

@media print {
  .Rule:nth-child(9n):not(:last-child) {
    margin-bottom: 100px;
  }
}

.Rule {
  font-size: 7pt;
  margin-bottom: 12px;

  &-side {
    height: 41mm;
    width: 63mm;
    overflow: hidden;
    border: 1px solid $card-color;
    border-radius: 6px;

    &--reverse {
      transform: rotate(-180deg);
    }
  }

  &-header,
  &-body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &-header {
    padding: 1px 5px;
    border-bottom: 1px solid $card-color;
  }

  &-icon {
    width: 9%;
    padding-right: 2px;
  }

  &-name {
    width: 70%;
    font-size: 10pt;
  }

  &-type {
    width: 20%;
    font-size: 10pt;
    text-align: right;
  }

  &-body {
    padding: 5px;
    text-align: justify;
  }
}
</style>
