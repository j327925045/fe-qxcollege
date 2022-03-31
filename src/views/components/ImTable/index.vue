<template>
  <AffixedTable v-loading="loading" :data="table.data" v-bind="table.attrs" stripe border v-on="table.listeners">
    <template v-for="item in tableList">
      <el-table-column v-if="item.type === 'selection'" :key="item.label" type="selection" :prop="item.prop" :label="item.label" v-bind="item.attrs"></el-table-column>
      <el-table-column v-else :key="item.label" :prop="item.prop" :label="item.label" v-bind="item.attrs">
        <template slot="header">
          <slot :name="item.headSlot" />
        </template>
        <template slot-scope="scope">
          <template v-if="item.type === 'index'">
            {{ scope.$index + 1 }}
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select v-model="scope.row[item.prop]" v-bind="item.componentAttrs" @change="item.onChage(scope.$index, scope.row, item.prop, scope.row[item.prop])">
              <el-option v-for="opt in item.options" :key="opt.label" :label="opt.label" :value="opt.value" />
            </el-select>
          </template>
          <template v-else-if="item.type === 'edit'">
            <ImPopover :scope="scope" :item="item" />
          </template>
          <template v-else-if="item.type === 'tooltip'">
            <ImToolTip :scope="scope" :item="item" />
          </template>
          <template v-else-if="item.type === 'mapList'">
            <span :style="scope.row[item.prop] | filterOperation(item.options, 1)">{{ scope.row[item.prop] | filterOperation(item.options) }}</span>
            <el-tooltip v-if="item.getToolTip && item.getToolTip(scope.row)" :open-delay="300" placement="top">
              <div slot="content" v-html="item.getToolTip(scope.row)" />
              <svg-icon style="cursor: pointer" icon-class="reson" />
            </el-tooltip>
          </template>
          <template v-else-if="item.type === 'buttons'">
            <el-tooltip v-for="(opt, idx) in item.options" :key="idx" :disabled="!opt.tipTitle" :open-delay="300" :content="opt.tipTitle" placement="top">
              <el-button
                :key="opt.title"
                :disabled="opt.disabled || (opt.disabledFunc && opt.disabledFunc(scope.row))"
                :type="opt.type || 'default'"
                v-bind="opt.attrs"
                @click="opt.onClick(scope.$index, scope.row)"
              >
                {{ opt.title }}
              </el-button>
            </el-tooltip>
          </template>
          <template v-else-if="item.type === 'val2btn'">
            <el-button
              v-for="(opt, idx) in btnList(item.options, scope)"
              :key="idx"
              v-bind="opt.attrs"
              @click="opt.onClick(scope.$index, scope.row)"
            >
              {{ opt.label }}
            </el-button>
          </template>
          <template v-else-if="item.type === 'val2tag'">
            <el-tag
              v-for="(opt, idx) in btnList(item.options, scope)"
              :key="idx"
              v-bind="opt.attrs"
              @click="opt.onClick(scope.$index, scope.row)"
            >
              {{ opt.label }}
            </el-tag>
          </template>
          <div v-else-if="item.type === 'photo'" style="text-align: center">
            <img :width="item.photoWidth || 50" :height="item.photoHeight || 50" :src="scope.row[item.prop]" style="margin: 5px auto; vertical-align: middle; border: 1px solid gray" />
          </div>
          <template v-else-if="item.type === 'tags'">
            <el-tag v-for="tag in scope.row[item.prop]" :key="tag" style="margin-right: 5px" type="success">
              {{ tag | filterOperation(item.options) }}
            </el-tag>
            <span v-if="scope.row[item.prop].length === 0">暂无</span>
          </template>
          <template v-else-if="item.type === 'datetime'">
            {{ scope.row[item.prop] | setDateTime(item.prop) }}
          </template>
          <template v-else-if="item.type === 'customFilter'">
            <div @click="item.onClick && item.onClick(scope.$index, scope.row, $event)" v-html="customFilter(scope.row[item.prop], item, scope.row, scope.$index)" />
          </template>
          <template v-else-if="item.type === 'progress'">
            <el-progress :percentage="getCurrentProp(scope.row, item.prop)" />
          </template>
          <template v-else>
            <div :style="item.style">
              {{ getCurrentProp(scope.row, item.prop) }}
            </div>
          </template>
        </template>
      </el-table-column>
    </template>
  </AffixedTable>
</template>

<script>
import ImPopover from './components/ImPopover'
import ImToolTip from './components/ImTooltip'
import AffixedTable from '../AffixedTable'

export default {
  name: 'ImTable',

  filters: {
    /**
     * 过滤器,对应有值与title对应关系的数据进行映射
     */
    filterOperation(val, map, style) {
      if (val === null) {
        return '暂无'
      }
      for (let i = 0; i < map.length; i++) {
        const cur = map[i]
        if (cur.value.toString() === val.toString()) {
          if (style) {
            return cur.style
          }
          return cur.label
        }
      }
      return '暂无'
    },

    /**
     * 过滤器，将时间戳转成时间格式 2017-02-09 20:22:14
     */
    setDateTime(val) {
      let newdate = ''
      if (val) {
        const date = new Date(val)
        if (!date) {
          return ''
        }
        const YYYY = date.getFullYear()
        const mm = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        const dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        const hh = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
        const MM = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
        const ss = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
        newdate = YYYY + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss
      }
      return newdate
    }
  },

  components: {
    ImPopover,
    ImToolTip,
    AffixedTable
  },

  props: {
    table: {
      type: Object,
      default() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },

  computed: {
    tableList() {
      return this.table.tableItems.filter((item) => {
        return !item.isHide
      })
    }
  },

  methods: {
    /**
     * 获取当前属性，如果通过.连接，需要下方属性
     * 目前只支持普通属性的展示使用
     */
    getCurrentProp(row, prop) {
      const resArr = prop.split('.')
      let result = ''
      if (prop.indexOf('.') === -1) {
        return row[prop]
      } else {
        result = row[resArr[0]]
        for (let i = 1; i < resArr.length; i++) {
          result = result && result[resArr[i]]
        }
        return result
      }
    },

    btnList(data, scope) {
      return data.filter((item) => {
        return item.isNot ? item.value && item.value.indexOf(scope.row[item.prop]) === -1 : item.value && item.value.indexOf(scope.row[item.prop]) > -1
      })
    },

    /**
     * 自定义过滤器
     */
    customFilter(val, item, row, idx) {
      if (item && item.filter) {
        return item.filter(val, row, idx)
      } else {
        return val
      }
    },

    selectionChange($event, select) {
      if (select && select.selectChange) {
        select.selectChange($event)
      }
    }
  }
}
</script>
