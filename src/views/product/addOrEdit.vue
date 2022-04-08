<template>
  <ImWrapper>
    <div class="bg-white p-4 mb-[32px]">
      <ImForm ref="ImForm" :form="formConfig">
        <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />产品信息</h3>
      </ImForm>
    </div>
    <div class="fixed bottom-0 text-right right-0 w-full p-2 bg-white shadow-dark-50 shadow-2xl">
      <el-button @click="closeCurrent">取 消</el-button>
      <el-button type="primary" @click="submitForm">保 存</el-button>
    </div>
  </ImWrapper>
</template>

<script>
import { addProductItem, getProductDetail, updateProductItem } from '@/api/product'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductAddOrEdit--nocache',
  data() {
    return {
      formConfig: {
        column: 3,
        gutter: 42,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'top'
        },
        props: {
          name: undefined,
          businessType: undefined,
          category: undefined,
          type: undefined,
          indication: undefined,
          imageUrl: undefined,
          skuId: undefined
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
            label: '产品名称',
            rules: [{ required: true, message: '请输入产品名称' }],
            attrs: {
              maxLength: 32,
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'businessType',
            label: '业务类型',
            rules: [{ required: true, message: '请选择业务类型' }],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'category',
            label: '材料类别',
            rules: [{ required: true, message: '请选择材料类别' }],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'type',
            label: '产品类型',
            rules: [{ required: true, message: '请选择产品类型' }],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'indication',
            label: '产品介绍',
            span: 24,
            attrs: {
              maxLength: 500,
              style: 'width: 31%',
              type: 'textarea',
              placeholder: '请输入'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'imageUrl',
            span: 24,
            label: '产品图片'
          },
          {
            type: 'ImInput',
            prop: 'skuId',
            label: 'SKU',
            span: 24,
            attrs: {
              placeholder: '请输入',
              maxLength: 128,
              style: 'width: 31%',
              class: 'w-full',
              options: []
            }
          }
        ]
      },
      editId: this.$route.query.objectCode
    }
  },
  computed: {
    ...mapGetters(['enums'])
  },
  created() {
    this.setOptions()
    if (this.editId) {
      this.getItemDetail()
    }
  },
  methods: {
    /**
     * 统一处理options
     */
    setOptions() {
      this.setFormPropOptions('businessType', this.enums.businessType)
      this.setFormPropOptions('category', this.enums.category)
      this.setFormPropOptions('type', this.enums.type)
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

    getItemDetail() {
      getProductDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200) {
          console.log(res.data)
          if (res.data.salesCounterpart === '0') {
            res.data.salesCounterpart = undefined
          }
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
          updateProductItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.closeCurrent()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addProductItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.closeCurrent()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    closeCurrent() {
      this.$refs.ImForm.reset()
      this.$router.replace({ name: 'ProductList' })
    }
  }
}
</script>
