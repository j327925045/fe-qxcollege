<template>
  <el-tree
    ref="tree"
    :default-checked-keys="defaultCheckedKeys"
    :data="treeData"
    show-checkbox
    default-expand-all
    node-key="objectCode"
    highlight-current
    :props="defaultProps"
    @check-change="onUpdate"
  >
  </el-tree>
</template>

<script>
import { getPermissionTree } from '@/api/permission'
export default {
  name: 'PermissionTreeSelect',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'options',
        label: 'name',
        value: 'objectCode'
      },
      defaultCheckedKeys: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.setMyValue()
      }
    }
  },
  created() {
    this.getTreeData()
  },
  methods: {
    setMyValue() {
      try {
        this.defaultCheckedKeys = JSON.parse(JSON.stringify(this.value))
      } catch (error) {
        this.defaultCheckedKeys = []
      }
    },
    getTreeData() {
      getPermissionTree({}).then(res => {
        if (res.code === 200) {
          this.treeData = res.data || []
        } else {
          this.$message(res.message)
        }
      })
    },
    onUpdate(value) {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.$emit('input', checkedKeys)
      this.$emit('change', checkedKeys)
    }
  }
}
</script>
