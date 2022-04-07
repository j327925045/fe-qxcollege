<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑项目' : '新建项目'"

    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <!-- <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />项目信息</h3> -->
      <ProjectProductList slot="projectProductList" v-model="formConfig.props.projectProductList" class="w-full" placeholder="请选择机构"></ProjectProductList>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addProjectItem, getProjectDetail, updateProjectItem } from '@/api/project'
import { mapGetters } from 'vuex'

import ProjectProductList from '../components/ProjectProductList'
export default {
  name: 'AddOrEdit',

  components: {
    ProjectProductList
  },
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
          projectProductList: '',
          brandCode: null, // 品牌code
          businessType: null, // 业务类型
          category: null, // 材料类别
          imageUrl: null, // 项目url
          indication: '', // 适应症
          level: null, // 设备级别
          name: '', // 名称
          remark: '', // 项目介绍
          type: null// 项目类型

        },
        formItems: [

          {
            type: 'ImInput',
            prop: 'deteils',
            label: '详情',

            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          },

          {
            type: 'ImInput',
            prop: 'name',
            label: '项目名称',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              type: 'text',
              placeholder: '请输入'
            }
          }, {
            type: 'ImSlot',
            prop: 'projectProductList',
            label: '产品列表',
            // rules: [{ required: true, message: '请选择机构' }],
            slots: {
              multiple: true,
              projectProductListSlot: 'projectProductList'
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
      getProjectDetail({ objectCode: this.editId }).then(res => {
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
          updateProjectItem(data).then(res => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('走进新增项目')
          console.log(data)
          addProjectItem(data).then(res => {
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
