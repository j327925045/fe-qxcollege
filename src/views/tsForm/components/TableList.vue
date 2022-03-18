<template>
  <div class="gyl-table-view">
    <!-- 按钮组 -->
    <div class="table-tools jbox">
      <div class="left-btns">
        <el-button>批量重算</el-button>
        <el-button>全局重算</el-button>
      </div>
      <el-button type="primary" plain icon="el-icon-export" @click="handleImport">导出</el-button>
    </div>
    <template v-if="tableData && tableData.length">
      <!-- 表格 -->
      <el-table border :data="tableData">
        <el-table-column v-for="(col, index) in tableColumns" :key="index" :prop="col.prop" :label="col.label" :width="col.width" :min-width="col.minWidth || 120" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-button type="text" @click="handleItemDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <footer class="gyl-pagination jcbox">
        <span class="totals">共 {{ total }} 条记录</span>
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="prev, pager, next,sizes, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </footer>
    </template>
    <div v-else class="table-empty">
      <img src="~@/assets/img/framework/null-data-bg.png" />
      <p class="text">搜索无结果</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableList',
  props: {
    // 表格信息
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    // 表格头部字段
    tableColumns: {
      type: Array,
      default() {
        return []
      }
    },
    // 初始每页多少条
    pageSize: {
      type: Number,
      default: 0
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 0
    },

    // 总的信息条数
    total: {
      type: Number,
      default: 0
    }
  },

  methods: {
    // 改变当前页条数
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },

    // 删除一条表格数据
    handleItemDelete(index) {
      this.$emit('handleItemDelete', index)
    },

    // 导出
    handleImport() {
      this.$emit('handleImport')
    }
  }
}
</script>
