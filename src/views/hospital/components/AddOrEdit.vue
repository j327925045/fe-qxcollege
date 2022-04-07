<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑机构' : '新建机构'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />基本信息</h3>
      <OrganizationSelect slot="OrganizationSelect" v-model="formConfig.props.organizationCode" placeholder="请选择所属集团"></OrganizationSelect>
      <RegionCascader slot="RegionCascader" v-model="formConfig.props.regionCode" class="w-full" placeholder="请输入所在区域(省市县)"></RegionCascader>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addHospitalItem, getHospitalDetail, updateHospitalItem } from '@/api/hospital'
import { mapGetters } from 'vuex'
import OrganizationSelect from '@/views/components/OrganizationSelect'
import RegionCascader from '@/views/components/RegionCascader'

export default {
  name: 'AddOrEdit',
  components: {
    OrganizationSelect,
    RegionCascader
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
          organizationCode: undefined,
          regionCode: undefined,
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
            label: '机构名称',
            rules: [{ required: true, message: '请输入机构名称' }],
            attrs: {
              placeholder: '请输入机构名称'
            }
          },
          {
            type: 'ImSlot',
            prop: 'organizationCode',
            label: '所属集团',
            rules: [{ required: true, message: '请选择所属集团' }],
            slots: {
              organizationCode: 'OrganizationSelect'
            }
          },
          {
            type: 'ImSlot',
            prop: 'regionCode',
            label: '区域',
            rules: [{ required: true, message: '请选择区域' }],
            slots: {
              regionCode: 'RegionCascader'
            }
          },
          {
            type: 'ImSelect',
            prop: 'status',
            label: '机构状态',
            rules: [{ required: true, message: '请选择机构状态' }],
            attrs: {
              placeholder: '请选择机构状态',
              clearable: true,
              class: 'w-full',
              options: []
            }
          }
        ]
      },
      rules: {
        organizationCode: [{ required: true, message: '请选择所属集团' }],
        regionCode: [{ required: true, message: '请选择区域' }],
        status: [{ required: true, message: '请选择机构状态' }]
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
      this.setFormPropOptions('status', this.enums.hospitalStatus)
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
      getHospitalDetail({ objectCode: this.editId }).then(res => {
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
          ...this.formConfig.props
        }
        if (this.editId) {
          data.objectCode = this.editId
          updateHospitalItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addHospitalItem(data).then(res => {
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
