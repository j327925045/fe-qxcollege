<template>
  <div class="search-box">
    <input
      v-model="searchKey"
      type="text"
      placeholder=""
      @keydown.enter="onSearch"
    >
    <i class="el-icon-search" @click="onSearch" />
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchKey: ''
    }
  },

  methods: {
    onSearch() {
      // todo: 这是实现导航搜索框的功能，关键子为 this.searchKey
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  height: 32px;
  line-height: 1;
  input {
    width: 166px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: #fff;
    padding: 0 40px 0 12px;
  }
  i {
    position: absolute;
    top: 9px;
    right: 10px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
