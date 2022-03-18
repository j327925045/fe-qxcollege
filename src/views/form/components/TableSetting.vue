<template>
  <div class="table-setting">
    <el-popover placement="bottom-end" trigger="click" popper-class="gyl-setting-popover">
      <span class="setting-reset"><el-button size="small" type="text">重置</el-button></span>
      <h5 class="setting-header">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">列展示</el-checkbox>
      </h5>
      <el-checkbox-group v-model="checkedItems" @change="handleCheckedItemsChange">
        <ul>
          <vuedraggable v-model="settingList">
            <transition-group>
              <li v-for="city in settingList" :key="city">
                <!-- <i class="mr10 el-icon-setting" /> -->
                <el-checkbox :label="city">{{ city }}</el-checkbox>
              </li>
            </transition-group>
          </vuedraggable>
        </ul>
      </el-checkbox-group>

      <p slot="reference"><i class="el-icon-setting" /></p>
    </el-popover>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
const itemOptions = ['快运配置项1', '快运配置项2', '快运配置项3', '快运配置项4', '快运配置项5', '快运配置项6', '快运配置项7', '快运配置项8']
export default {
  components: { vuedraggable },
  data() {
    return {
      checkAll: false,
      checkedItems: ['快运配置项1', '快运配置项2'],
      settingList: itemOptions,
      isIndeterminate: true
    }
  },
  updated() {
    console.log(this.settingList)
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedItems = val ? itemOptions : []
      this.isIndeterminate = false
    },
    handleCheckedItemsChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.settingList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.settingList.length
    }
  }
}
</script>
