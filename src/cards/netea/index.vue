<template>
  <div class="CardReader">
    <NetEARuleCard
      v-for="rule in catalog.rules"
      :key="rule.name"
      :card="rule"
      :catalog="catalog"
      :system="system"
    />
    <NetEAUnitCard
      v-for="unit in catalog.units"
      :key="unit.name"
      :card="unit"
      :catalog="catalog"
      :system="system"
    />
  </div>
</template>

<script>
import NetEARuleCard from '@/cards/netea/rule.vue';
import NetEAUnitCard from '@/cards/netea/unit.vue';

export default {
  computed: {
    system() {
      return this.$store.state.data[this.$route.name];
    },
    catalog() {
      return this.system.catalogs[this.$route.params.catalog];
    }
  },
  components: {
    NetEAUnitCard,
    NetEARuleCard
  }
};
</script>

<style lang="scss">
.CardReader {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
