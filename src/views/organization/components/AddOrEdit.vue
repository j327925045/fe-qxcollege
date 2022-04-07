<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑集团' : '新建集团'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
      <RegionCascader slot="RegionCascader" v-model="formConfig.props.regionCode" class="w-full" placeholder="请输入所在区域(省市县)"></RegionCascader>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addOrganizationItem, getOrganizationDetail, updateOrganizationItem } from '@/api/organization'
import { mapGetters } from 'vuex'
import RegionCascader from '@/views/components/RegionCascader'

export default {
  name: 'OrganizationCreate',
  components: {
    RegionCascader
  },
  data() {
    return {
      formConfig: {
        attrs: {
          labelWidth: '160px',
          labelPosition: 'right'
        },
        props: {
          address: undefined,
          businessScope: undefined,
          name: undefined,
          nature: undefined,
          operateStatus: undefined,
          paidCapital: undefined,
          regionCode: undefined,
          registeredCapital: undefined,
          scale: undefined,
          shortName: undefined,
          status: undefined
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
            label: '集团全称',
            rules: [{ required: true, message: '请输入集团全称' }],
            attrs: {
              placeholder: '请输入集团全称'
            }
          },
          {
            type: 'ImInput',
            prop: 'shortName',
            label: '集团简称',
            rules: [{ required: true, message: '请输入集团简称' }],
            attrs: {
              placeholder: '请输入集团简称'
            }
          },
          {
            type: 'ImInput',
            prop: 'address',
            label: '集团地址(详细地址)',
            rules: [{ required: true, message: '请输入集团地址' }],
            attrs: {
              placeholder: '请输入集团地址'
            }
          },
          {
            type: 'ImInput',
            prop: 'businessScope',
            label: '经营范围',
            attrs: {
              placeholder: '请输入经营范围'
            }
          },
          {
            type: 'ImSelect',
            prop: 'nature',
            label: '集团性质',
            rules: [{ required: true, message: '请选择集团性质' }],
            attrs: {
              placeholder: '请选择集团性质',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'operateStatus',
            label: '经营状态',
            attrs: {
              placeholder: '请选择经营状态',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInputNumber',
            prop: 'registeredCapital',
            label: '注册资本(万)',
            attrs: {
              min: 0,
              'controls-position': 'right',
              placeholder: '请输入注册资本(万)'
            }
          },
          {
            type: 'ImInputNumber',
            prop: 'paidCapital',
            label: '实缴资本(万)',
            attrs: {
              min: 0,
              'controls-position': 'right',
              placeholder: '请输入实缴资本(万)'
            }
          },
          {
            type: 'ImSlot',
            prop: 'regionCode',
            label: '所在区域(省市县)',
            slots: {
              regionSlot: 'RegionCascader'
            }
          },
          {
            type: 'ImSelect',
            prop: 'scale',
            label: '集团规模',
            attrs: {
              placeholder: '请选择集团规模',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'status',
            label: '集团状态',
            attrs: {
              placeholder: '请选择集团状态',
              clearable: true,
              class: 'w-full',
              options: []
            }
          }
        ]
      },
      editId: undefined,
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  created() {
    this.setOptions()
  },
  methods: {
    /**
     * 统一处理options
     */
    setOptions() {
      this.setFormPropOptions('nature', this.enums.organizationNature)
      this.setFormPropOptions('operateStatus', this.enums.organizationOperateStatus)
      this.setFormPropOptions('scale', this.enums.organizationScale)
      this.setFormPropOptions('status', this.enums.organizationStatus)
    },

    /**
     * 设置form标单项的options，因为enums异步获取，因此这里需要手动指定一下
     * 放到计算属性会有prop绑定失效的问题
     */
    setFormPropOptions(prop, options) {
      const formItems = this.formConfig.formItems
      const item = formItems.find(item => item.prop === prop)
      item.attrs.options = options
    },

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
      getOrganizationDetail({ objectCode: this.editId }).then((res) => {
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
      this.$refs.ImForm.validate((valid) => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.formConfig.props
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateOrganizationItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addOrganizationItem(data).then((res) => {
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
    closeDrower() {
      this.$refs.ImForm.reset()
      this.drawerVisible = false
    }
  }
}
</script>
