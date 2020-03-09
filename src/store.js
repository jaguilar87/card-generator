import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    dataError: null,
    isLoading: true
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setData(state, data) {
      state.data = data;
    },
    setDataError(state, err) {
      state.dataError = err;
    }
  },
  actions: {
    fetchData({ commit }) {
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          commit('setData', data);
          commit('setLoading', false);
        })
        .catch(err => {
          console.error(err);

          commit('setDataError', err);
          commit('setLoading', false);
        });
    }
  },
  getters: {
    resolve: state => (systemId, libraryId, referenceId) => {
      try {
        const ref = state.data[systemId].references[libraryId][referenceId];

        if (!ref) throw new Error();

        return ref;
      } catch (e) {
        throw new Error(
          `Cannot resolve ${systemId}:${libraryId}:${referenceId}`
        );
      }
    },
    getCatalog: state => (systemId, catalogId) => {
      return state.data[systemId].catalogs[catalogId];
    }
  }
});
