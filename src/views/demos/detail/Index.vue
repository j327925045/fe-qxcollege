<template>
  <div>
    <el-card class="gyl-entry-card mb10" :class="{ collapse: isCollapse1 }" shadow="never">
      <div slot="header">
        <span class="title"><i class="el-icon-s-order" /> 基本信息</span>
        <el-button type="text" class="fr btn-expand" @click="isCollapse1 = !isCollapse1">
          {{ isCollapse1 ? '展开' : '收起' }} <i :class="isCollapse1 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" /></el-button>
      </div>
      <InfoList />
    </el-card>

    <el-card class="gyl-entry-card mb10" :class="{ collapse: isCollapse2 }" shadow="never">
      <div slot="header">
        <span class="title"><i class="el-icon-s-order" /> 模块标题1</span>
        <el-button type="text" class="fr btn-expand" @click="isCollapse2 = !isCollapse2">
          {{ isCollapse2 ? '展开' : '收起' }} <i :class="isCollapse2 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" /></el-button>
      </div>
      <ExpandInfo />
    </el-card>

    <el-card class="gyl-entry-card mb10" :class="{ collapse: isCollapse3 }" shadow="never">
      <div slot="header">
        <span class="title"><i class="el-icon-s-order" /> 模块标题2</span>
        <el-button type="text" class="fr btn-expand" @click="isCollapse3 = !isCollapse3">
          {{ isCollapse3 ? '展开' : '收起' }} <i :class="isCollapse3 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" /></el-button>
      </div>
      <ExpandTimeLine />
    </el-card>

    <el-card class="gyl-entry-card mb10" :class="{ collapse: isCollapse4 }" shadow="never">
      <div slot="header">
        <span class="title"><i class="el-icon-s-order" /> 模块标题B</span>
        <el-button type="text" class="fr btn-expand" @click="isCollapse4 = !isCollapse4">
          {{ isCollapse4 ? '展开' : '收起' }} <i :class="isCollapse4 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" /></el-button>
      </div>
      <TableExpand class="mb20" />
      <TableSimple />
    </el-card>
  </div>
</template>

<script>
import TableExpand from './components/TableExpand'
import TableSimple from './components/TableSimple'
import ExpandInfo from './components/ExpandInfo'
import ExpandTimeLine from './components/ExpandTimeline'
import InfoList from './components/InfoList'

export default {
  name: 'DetailDetail',
  components: {
    TableExpand,
    TableSimple,
    ExpandInfo,
    ExpandTimeLine,
    InfoList
  },
  data() {
    return {
      isCollapse1: false,
      isCollapse2: true,
      isCollapse3: true,
      isCollapse4: false
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import '@/views/detail/detail.scss';
</style>
