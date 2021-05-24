<template>
  <div class="Loading" v-if="isLoading">
    <b-icon icon="spinner" class="fa-spin App-spinner" size="is-large" />
  </div>
  <div v-else-if="error" class="ErrorPage">{{ error }}</div>
  <div v-else class="App">
    <Nav />
    <main class="App-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Nav from '@/views/Nav.vue';

export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    data() {
      return this.$store.state.data;
    },
    error() {
      return this.$store.state.dataError;
    },
  },
  created() {
    this.$store.dispatch('fetchData');
  },
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
@page {
  size: A4;
}

@media print {
  html,
  body {
    width: 210mm;
    height: 297mm;
  }
}

.Loading {
  text-align: center;
  margin: 48px;
}

.ErrorPage {
  margin: 12px;
}

.App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  display: flex;

  &-content {
    width: 100%;
    margin-top: 12px;
  }

  &-spinner {
    margin: 0 auto;
  }
}
</style>
