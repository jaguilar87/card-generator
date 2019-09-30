<template>
  <div class="CardReader">
    <p v-for="card in catalog.cards" :key="card.name">{{card.name}}</p>
  </div>
</template>

<script>
export default {
  computed: {
    catalog() {
      const { system, catalog } = this.$route.params;

      return this.$store.state.data[system].catalogs[catalog];
    }
  }
};
</script>