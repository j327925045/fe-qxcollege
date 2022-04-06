<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑产品' : '新建产品'"

    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />产品信息</h3>

    </ImForm>
  </ImDrawer>
</template>

<script>
import { addProductItem, getProductDetail, updateProductItem } from '@/api/product'
import { mapGetters } from 'vuex'

export default {
  name: 'AddOrEdit',
  data() {
    return {
      drawerVisible: false,
      editId: undefined,
      formConfig: {
        // column: 3,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          brandCode: null, // 品牌code
          businessType: null, // 业务类型
          category: null, // 材料类别
          imageUrl: null, // 产品url
          indication: '', // 适应症
          level: null, // 设备级别
          name: '', // 名称
          remark: '', // 产品介绍
          type: null// 产品类型

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
            type: 'ImSelect',
            prop: 'brandCode',
            label: '品牌',
            rules: [{ required: true, message: '请选择品牌' }],
            attrs: {
              placeholder: '请选择品牌',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'businessType',
            label: '业务类型',
            rules: [{ required: true, message: '请选择业务类型' }],
            attrs: {
              placeholder: '请选择品牌',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'category',
            label: '材料类别',
            rules: [{ required: true, message: '请选择' }],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'imageUrl',
            label: '产品图',
            rules: [{ required: true, message: '请上传产品图' }]
          },
          {
            type: 'ImInput',
            prop: 'indication',
            label: '适应症',

            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'level',
            label: '设备级别',
            rules: [{ required: true, message: '请选择' }],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'name',
            label: '产品名称',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'remark',
            label: '产品介绍',
            // rules: [{ required: true, message: '请输入' }],
            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'type',
            label: '产品类型',

            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          }

        ]
      }
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
      this.setFormPropOptions('brandCode', this.enums.brandCode) // 男女
      this.setFormPropOptions('businessType', this.enums.businessType)// 医生等级
      this.setFormPropOptions('category', this.enums.category) //
      // this.setFormPropOptions('isCertified', this.enums.isCertified)
      this.setFormPropOptions('level', this.enums.level)// 客户经理
      // this.setFormPropOptions('realOppositePerson', this.enums.realOppositePerson)//对接人
      this.setFormPropOptions('type', this.enums.type)// 科室
    },

    /**
     * 设置form标单项的options，因为enums异步获取，因此这里需要手动指定一下
     * 放到计算属性会有prop绑定失效的问题
     */
    setFormPropOptions(prop, options) {
      console.log(options)
      const formItems = this.formConfig.formItems
      const item = formItems.find(item => item.prop === prop)
      item.attrs.options = options
    },

    /**
     * 暴露添加方法
     */
    add() {
      this.editId = undefined
      this.drawerVisible = true
    },

    /**
     * 暴露编辑方法
     */
    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
    },

    /**
     * 获取详情
     */
    getItemDetail() {
      getProductDetail({ objectCode: this.editId }).then(res => {
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

    /**
     * 提交表单
     */
    submitForm() {
      console.log('提交')
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
          updateProductItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('走进新增产品')
          console.log(data)
          addProductItem(data).then(res => {
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
