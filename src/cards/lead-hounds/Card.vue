<template>
  <div class="LHCard">
    <div class="LHCard-side">
      <div class="LHCard-header" :style="titleStyle">
        <div class="LHCard-name">Part Name</div>
      </div>
      <div class="LHCard-body">
        <span>Card body...</span>
        <Action v-for="action in actions" :key="action.name" :action="action" />
      </div>
    </div>
    <div class="LHCard-side LHCard-side--reverse"></div>
  </div>
</template>

<script>
import access from 'safe-access';
import parseReferenceExpression from '../../utils/parse-reference-expression';

export default {
  computed: {
    titleStyle() {
      const safeThis = access(this);

      return {
        background: safeThis('$props.catalog.style.titleBg') || 'darkblue',
        color: safeThis('$props.catalog.style.titleText') || 'white'
      };
    },
    actions() {
      if (!this.card.actions) {
        return [];
      }

      return this.card.actions.map(this.resolve);
    }
  },
  methods: {
    resolve(expression) {
      const { libraryId, referenceId } = parseReferenceExpression(expression);

      return this.$store.getters.resolve(this.systemId, libraryId, referenceId);
    }
  },
  props: {
    card: Object,
    catalogId: String,
    systemId: String
  },
  components: {
    Action: () => import('./components/Action.vue')
  }
};
</script>

<style lang="scss">
$card-color: #000000;
$border-color: #dcdcdc;

.LHCard {
  font-size: 7pt;
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;

  &-side {
    height: 64mm;
    width: 45mm;
    overflow: hidden;
    border: 1px solid $card-color;
    border-radius: 6px;
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

  &-name {
    width: 70%;
    font-size: 10pt;
  }

  &-body {
    padding: 5px;
    text-align: justify;
  }
}
</style>
