<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getAllDictionaryItems } from '@/api/dictionary'
export default {
  name: 'App',
  created() {
    this.getEnums()
  },
  methods: {
    getEnums() {
      getAllDictionaryItems().then(res => {
        if (res.code === 200) {
          const enums = {}
          const resData = res.data || []
          for (let i = 0; i < resData.length; i++) {
            const item = resData[i]
            if (item.options) {
              enums[item.sign] = item.options.map(item => {
                return {
                  label: item.name,
                  value: item.sign
                }
              })
            }
          }
          this.$store.commit('app/SET_ENUMS', enums)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/index.scss';
</style>
