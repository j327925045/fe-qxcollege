<template>
  <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑权限' : '新建权限'"
    @closeDrower="closeDrower"
    @submit="submitForm"
  >
    <ImForm ref="ImForm" :form="formConfig">
      <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
      <PermissionCascader slot="PermissionCascader" ref="PermissionCascader" v-model="formConfig.props.parentId" style="width: 100%;"></PermissionCascader>
    </ImForm>
  </ImDrawer>
</template>

<script>
import { addPermissionItem, getPermissionDetail, updatePermissionItem } from '@/api/permission'
import { mapGetters } from 'vuex'
import PermissionCascader from '@/views/components/PermissionCascader'
export default {
  name: 'AddOrEdit',
  components: {
    PermissionCascader
  },
  data() {
    return {
      formConfig: {
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {
          hide: '0',
          name: undefined,
          orderNum: 0,
          parentId: '0',
          type: undefined,
          url: undefined,
          urls: '/'
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
            label: '菜单名称',
            rules: [{ required: true, message: '请输入菜单名称' }],
            attrs: {
              placeholder: '请输入菜单名称'
            }
          },
          {
            type: 'ImSelect',
            prop: 'hide',
            label: '是否显示',
            rules: [{ required: true, message: '请选择是否显示' }],
            attrs: {
              placeholder: '请选择是否显示',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInputNumber',
            prop: 'orderNum',
            label: '排序',
            rules: [{ required: true, message: '请输入排序' }],
            attrs: {
              placeholder: '请输入菜单名称',
              controlsPosition: 'right',
              min: 0
            }
          },
          {
            type: 'ImSlot',
            prop: 'parentId',
            label: '父菜单',
            slots: {
              parentId: 'PermissionCascader'
            }
          },
          {
            type: 'ImSelect',
            prop: 'type',
            label: '类型',
            rules: [{ required: true, message: '请选择类型' }],
            attrs: {
              placeholder: '请选择类型',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'url',
            label: '菜单URL',
            rules: [{ required: true, message: '请输入菜单URL' }],
            attrs: {
              placeholder: '请输入菜单URL'
            }
          },
          {
            type: 'ImInput',
            prop: 'urls',
            label: '授权',
            rules: [{ required: true, message: '请输入授权地址' }],
            attrs: {
              placeholder: '请输入授权地址'
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
      this.setFormPropOptions('hide', this.enums.permissionHide)
      this.setFormPropOptions('type', this.enums.permissionType)
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

    getPermissionOptions() {
      if (this.$refs.PermissionCascader) {
        this.$refs.PermissionCascader.getOptions()
      }
    },

    add() {
      this.editId = undefined
      this.drawerVisible = true
      this.getPermissionOptions()
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },

    edit(editId) {
      this.editId = editId
      this.drawerVisible = true
      this.getItemDetail()
      this.getPermissionOptions()
    },

    getItemDetail() {
      getPermissionDetail({ objectCode: this.editId }).then((res) => {
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
          updatePermissionItem(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.$emit('update')
              this.closeDrower()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          addPermissionItem(data).then((res) => {
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
