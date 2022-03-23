<template>
  <div>
    <el-card class="gyl-entry-card mb20" :class="{ collapse: isCollapse1 }">
      <div slot="header">
        <span class="title"><i class="el-icon-s-order" /> 基本信息</span>
        <el-button type="text" class="fr btn-expand" @click="isCollapse1 = !isCollapse1">
          {{ isCollapse1 ? '展开' : '收起' }} <i :class="isCollapse1 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" /></el-button>
      </div>
      <info-list />
    </el-card>

    <el-card class="gyl-entry-card mb20" :class="{ collapse: isCollapse2 }">
      <div slot="header">
        <span class="title"><i class="el-icon-s-order" /> 收/寄方信息</span>
        <el-button type="text" class="fr btn-expand" @click="isCollapse2 = !isCollapse2">
          {{ isCollapse2 ? '展开' : '收起' }} <i :class="isCollapse2 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" /></el-button>
      </div>
      <info-list-multilevel />
    </el-card>

    <el-card class="gyl-entry-card mb20" :class="{ collapse: isCollapse3 }">
      <div slot="header">
        <span class="title"><i class="el-icon-s-order" /> 基本信息</span>
        <el-button type="text" class="fr btn-expand" @click="isCollapse3 = !isCollapse3">
          {{ isCollapse3 ? '展开' : '收起' }} <i :class="isCollapse3 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" /></el-button>
      </div>
      <info-list2 />
    </el-card>
  </div>
</template>

<script>
import InfoList from './components/InfoList'
import InfoList2 from '@/views/demos/detail/components/InfoList2'
import InfoListMultilevel from './components/InfoListMultilevel.vue'

export default {
  name: 'DetailDetailMultilevel',
  components: {
    InfoList,
    InfoList2,
    InfoListMultilevel
  },
  data() {
    return {
      isCollapse1: false,
      isCollapse2: false,
      isCollapse3: false
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import '@/views/demos/detail/detail.scss';
</style>
