<template>
  <div class="CardReader">
    <NetEACard v-for="card in catalog.cards" :key="card.name" :card="card" :catalog="catalog" />
  </div>
</template>

<script>
import NetEACard from '@/cards/netea.vue';

export default {
  computed: {
    catalog() {
      const { system, catalog } = this.$route.params;

      return this.$store.state.data[system].catalogs[catalog];
    }
  },
  components: {
    NetEACard
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
