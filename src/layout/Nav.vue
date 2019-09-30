<template>
  <div class="App-nav column is-3">
    <b-menu>
      <b-menu-list
        v-for="(system, systemKey) in data"
        v-bind:key="systemKey"
        :label="systemKey.toUpperCase()"
      >
        <b-menu-item
          v-for="(catalog, catalogKey) in system.catalogs"
          v-bind:key="catalogKey"
          :label="catalog.name"
          :to="`/${systemKey}/${catalogKey}`"
          tag="router-link"
          icon="address-card"
        />
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.state.data;
    }
  }
};
</script>

<style>
.App-nav {
  margin: 12px;
  height: 100%;
  border-right: 1px solid darkgray;
}
</style>