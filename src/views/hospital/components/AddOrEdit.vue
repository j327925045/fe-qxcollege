<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑机构' : '新建机构'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />机构信息</h3>
      <h3 slot="qualification" class="gyl-title"><i class="el-icon-s-order" />资质信息</h3>
      <OrganizationSelect slot="OrganizationSelect" v-model="formConfig.props.organizationCode" placeholder="请选择"></OrganizationSelect>
      <RegionCascader slot="RegionCascader" v-model="formConfig.props.regionCode" class="w-full" placeholder="请选择"></RegionCascader>
      <EmployeeSelect slot="employeeSelect" v-model="formConfig.props.salesCounterpartCode" class="w-full"></EmployeeSelect>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addHospitalItem, getHospitalDetail, updateHospitalItem } from '@/api/hospital'
import { mapGetters } from 'vuex'
import OrganizationSelect from '@/views/components/OrganizationSelect'
import RegionCascader from '@/views/components/RegionCascader'
import EmployeeSelect from '@/views/components/EmployeeSelect'

export default {
  name: 'AddOrEdit',
  components: {
    EmployeeSelect,
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
          nature: undefined,
          establishedTime: undefined,
          regionCode: undefined,
          location: undefined,
          organizationCode: undefined,
          contactName: undefined,
          contactPhone: undefined,
          salesCounterpartCode: undefined,
          licencePictureUrl: undefined,
          orgPictureUrl: undefined,
          registrationNo: undefined
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
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'nature',
            label: '机构性质',
            rules: [{ required: true, message: '请选择机构性质' }],
            attrs: {
              placeholder: '请选择',
              options: []
            }
          },
          {
            type: 'ImDatePicker',
            prop: 'establishedTime',
            label: '成立时间',
            attrs: {
              style: 'width: 100%',
              type: 'date',
              placeholder: '请选择'
            }
          },
          {
            type: 'ImSlot',
            prop: 'regionCode',
            label: '所在城市',
            rules: [{ required: true, message: '请选择' }],
            slots: {
              regionCode: 'RegionCascader'
            }
          },
          {
            type: 'ImInput',
            prop: 'location',
            label: '机构地址',
            attrs: {
              placeholder: '请输入'
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
            type: 'ImInput',
            prop: 'contactName',
            label: '联系人姓名',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'contactPhone',
            label: '联系电话',
            rules: ['phone'],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSlot',
            prop: 'salesCounterpartCode',
            label: '销售对接人',
            slots: {
              salesCounterpartCode: 'employeeSelect'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'orgPictureUrl',
            label: '机构图片'
          },
          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              secondSlot: 'qualification'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'licencePictureUrl',
            label: '医疗机构执业许可证'
          },
          {
            type: 'ImInput',
            prop: 'registrationNo',
            label: '登记号',
            attrs: {
              placeholder: '请输入'
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
      this.setFormPropOptions('nature', this.enums.hospitalNature)
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
