<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑角色' : '新建角色'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addRoleItem, getRoleDetail, updateRoleItem } from '@/api/role'
import ImDrawer from '@/views/components/ImDrawer'
import ImForm from '@/views/components/ImForm'
export default {
  name: 'AddOrEdit',
  components: {
    ImDrawer,
    ImForm
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
          remark: undefined
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
            label: '角色名称',
            rules: [{ required: true, message: '请输入角色名称' }],
            attrs: {
              placeholder: '请输入角色名称'
            }
          },
          {
            type: 'ImInput',
            prop: 'remark',
            label: '角色备注',
            rules: [{ required: true, message: '请输入角色备注' }],
            attrs: {
              placeholder: '请输入角色备注'
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
      getRoleDetail({ objectCode: this.editId }).then((res) => {
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
          updateRoleItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addRoleItem(data).then((res) => {
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
