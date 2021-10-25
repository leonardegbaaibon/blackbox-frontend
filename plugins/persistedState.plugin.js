import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'rch_crpt',
    paths: ['user.authentication.userId'],
  })(store)
}
