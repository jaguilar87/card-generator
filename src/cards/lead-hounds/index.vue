<template>
  <div class="CardReader">
    <LHCard
      v-for="card in catalog.cards"
      :key="card.name"
      :card="card"
      :catalogId="catalogId"
      :systemId="systemId"
    />
  </div>
</template>

<script>
import LHCard from '@/cards/lead-hounds/Card.vue';

export default {
  computed: {
    systemId() {
      return this.$route.name;
    },
    catalogId() {
      return this.$route.params.catalog;
    },
    catalog() {
      return this.$store.getters.getCatalog(this.systemId, this.catalogId);
    }
  },
  components: {
    LHCard
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
