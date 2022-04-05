<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    :current-page="currentPage"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
const defaultPageSize = 10
const defaultCurrentPage = 1
export default {
  name: 'ImPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: defaultCurrentPage
    },
    pageSize: {
      type: Number,
      default: defaultPageSize
    }
  },
  methods: {
    /**
     * 每页个数发生变化事件
     */
    handleSizeChange(val) {
      this.$emit('update:pageSize', val)
      this.$emit('change')
    },

    /**
     * 当前页码发生变化事件
     */
    handleCurrentChange(val) {
      this.$emit('update:currentPage', val)
      this.$emit('change')
    },

    /**
     *  重置
     */
    reset() {
      this.$emit('update:pageSize', defaultPageSize)
      this.$emit('update:currentPage', defaultCurrentPage)
    }
  }
}
</script>
