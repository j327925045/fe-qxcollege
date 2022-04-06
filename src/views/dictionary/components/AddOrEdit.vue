<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑字段' : '新建字段'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
      <EnumOption slot="EnumOption" v-model="formConfig.props.options"></EnumOption>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { setDictionaryByOnce, getDictionaryDetail, updateDictionaryItem } from '@/api/dictionary'
import EnumOption from './EnumOption'

export default {
  name: 'AddOrEdit',
  components: {
    EnumOption
  },
  data() {
    return {
      formConfig: {
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          name: undefined,
          sign: undefined,
          status: undefined,
          options: []
        },
        formItems: [
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              firstSlot: 'infoSlot'
            }
          },
          {
            type: 'ImInput',
            prop: 'name',
            label: '字段名称',
            rules: [{ required: true, message: '请输入字段名称' }],
            attrs: {
              placeholder: '请输入字段名称'
            }
          },
          {
            type: 'ImInput',
            prop: 'sign',
            label: '字段标识',
            rules: [{ required: true, message: '请输入字段标识' }],
            attrs: {
              placeholder: '请输入字段标识'
            }
          },
          {
            type: 'ImSelect',
            prop: 'status',
            label: '字段状态',
            rules: [{ required: true, message: '请选择字段状态' }],
            attrs: {
              placeholder: '请选择字段状态',
              clearable: true,
              class: 'w-full',
              options: [{ label: '启用', value: '0' }, { label: '停用', value: '1' }]
            }
          },
          {
            type: 'ImSlot',
            prop: 'options',
            label: '字段选项',
            rules: [{ required: true, message: '请配置字段选项' }],
            slots: {
              options: 'EnumOption'
            }
          }
        ]
      },
      editId: undefined,
      drawerVisible: false
    }
  },
  methods: {
    add() {
      this.editId = undefined
      this.drawerVisible = true
    },

    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    getItemDetail() {
      getDictionaryDetail({ objectCode: this.editId }).then(res => {
        if (res.code === 200) {
          const props = this.formConfig.props
          const keys = Object.keys(props)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            props[key] = res.data[key] || undefined
          }
        }
      })
    },

    submitForm() {
      this.$refs.ImForm.validate(valid => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          icon: '',
          level: 0,
          parentId: 0,
          ...this.formConfig.props
        }
        if (this.formConfig.props.options && this.formConfig.props.options.length > 0) {
          data.options = this.formConfig.props.options.filter(item => {
            return typeof item.label !== 'undefined' && typeof item.value !== 'undefined'
          })
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateDictionaryItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          setDictionaryByOnce(data).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.$emit('add')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },

    /**
     * 关闭弹层
     */
    closeDrower() {
      this.$refs.ImForm.reset()
      this.drawerVisible = false
    }
  }
}
</script>
