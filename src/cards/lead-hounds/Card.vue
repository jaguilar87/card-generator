<template>
  <div class="LHCard">
    <div class="LHCard-side">
      <div class="LHCard-header" :style="headerStyle">
        <div class="LHCard-name">{{ card.name }}</div>
        <div class="LHCard-type">{{ card.type }}</div>
      </div>
      <div class="LHCard-body">
        <Stats :stats="card.stats" />
        <span
          class="LHCard-restrictions"
          v-if="card.restrictions"
        >{{ card.restrictions.join('/') }} only.</span>
        <Action v-for="action in actions" :key="action.name" :action="action" />
        <Rule v-for="rule in rules" :key="rule.name" :rule="rule" />
        <div class="LHCard-keywords">
          <div class="LHCard-tags">{{ card.tags.join(' · ') }}</div>
          <div class="LHCard-manufacturer">{{ catalog.name }}</div>
        </div>
      </div>
      <Footer
        class="LHCard-footer"
        :hp="card.hp"
        :armor="card.armor"
        :connections="card.connections"
      />
    </div>
    <div class="LHCard-side LHCard--reverse">
      <div class="LHCard-header">
        <div class="LHCard-name">{{ card.name }}</div>
        <div class="LHCard-type">{{ card.type }}</div>
      </div>
      <div class="LHCard-body">
        <Stats :stats="card.stats" disabled />
        <Action v-for="action in disabledActions" :key="action.name" :action="action" />
        <div class="LHCard-keywords">
          <div class="LHCard-tags">{{ card.tags.join(' · ') }}</div>
          <div class="LHCard-manufacturer">{{ catalog.name }}</div>
        </div>
      </div>
      <Footer class="LHCard-footer" disabled />
    </div>
  </div>
</template>

<script>
import parseReferenceExpression from '@/utils/parse-reference-expression';
import Action from '@/cards/lead-hounds/body/Action.vue';
import Rule from '@/cards/lead-hounds/body/Rule.vue';
import Stats from '@/cards/lead-hounds/body/Stats.vue';
import Footer from '@/cards/lead-hounds/footer/Footer.vue';

export default {
  computed: {
    actions() {
      return this.card.actions && this.card.actions.map(this.resolve);
    },
    disabledActions() {
      return (
        this.card.disabledActions && this.card.disabledActions.map(this.resolve)
      );
    },
    rules() {
      return this.card.rules && this.card.rules.map(this.resolve);
    },
    catalog() {
      return this.$store.getters.getCatalog(this.systemId, this.catalogId);
    },
    headerStyle() {
      const catalog = this.catalog;

      return {
        backgroundColor: catalog.style.accent,
        color: catalog.style.inverted
      };
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
    Action,
    Rule,
    Footer,
    Stats
  }
};
</script>

<style lang="scss">
$card-color: #000000;

@media print {
  .LHCard {
    page-break-inside: avoid;
  }
}

.LHCard {
  font-size: 7pt;
  margin-bottom: 12px;
  margin: 10px;
  display: inline-flex;

  &-side {
    height: 64mm;
    width: 45mm;
    overflow: hidden;
    border: 1px solid $card-color;
    border-radius: 6px;
    display: inline-flex;
    flex-direction: column;
  }

  &-header,
  &-body,
  &-footer {
    width: 100%;
    display: flex;
  }

  &-header {
    padding: 1px 5px;
    border-bottom: 1px solid $card-color;
    flex-direction: column;

    .LHCard--reverse & {
      background-color: lightgray;
      color: black;
    }
  }

  &-body {
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 100;

    & > *:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &-restrictions {
    font-style: italic;
  }

  &-keywords {
    font-size: 90%;
    margin-top: auto;
    text-align: center;
    opacity: 0.7;
    font-style: italic;
  }

  &-footer {
    height: 20px;
    border-top: 1px solid $card-color;
  }

  &-name {
    font-size: 9pt;
  }

  &-type {
    font-size: 8pt;
    font-style: italic;
  }

  &-body {
    padding: 5px;
    text-align: justify;
  }
}
</style>
