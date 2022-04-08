<template>
  <!-- <ImDrawer
    :visible.sync="drawerVisible"
    :title="editId ? '编辑医生' : '新建医生'"

    @closeDrower="closeDrower"
    @submit="submitForm"
  > -->
  <section>
    <ImWrapper>
      <div class="box">
        <!-- <ImForm  ref="ImForm1" :form="formConfig1">
          <h3 slot="infoSlot" class="gyl-title"><i class="el-icon-s-order" />个人信息</h3>
        </ImForm> -->
        <ImForm ref="ImForm2" :form="formConfig2">

          <h3 slot="hospitalzizhiSlot" style="width: 100%" class="gyl-title"><i class="el-icon-s-order" />医生资质信息</h3>
        </ImForm>
        <!-- <ImForm  ref="ImForm3" :form="formConfig3">
          <h3 slot="expertsSlot" class="gyl-title"><i class="el-icon-s-order" />专家信息</h3>
        </ImForm> -->
      </div>
    </ImWrapper>
    <div class="btnWrap">
      <el-row>
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitForm">{{ btnFont }}</el-button>
      </el-row>
    </div>
  </section>

  <!-- </ImDrawer> -->
</template>

<script>
import { getUserDetail, realPcAuthentication } from '@/api/user'
import { mapGetters } from 'vuex'
// import HospitalSelect from '@/views/components/HospitalSelect'
// import RegionCascader from '@/views/components/RegionCascader'
// import SelectSearchMore from './components/SelectSearchMore'
// import AccountManagerSelect from './components/AccountManagerSelect'
// import doctorLabelSelectMore from './components/doctorLabelSelectMore'
export default {
  // name: 'AddOrEdit',
  name: 'editExports',
  // components: {
  // HospitalSelect,
  // RegionCascader,
  // SelectSearchMore,
  // AccountManagerSelect,
  // doctorLabelSelectMore
  // },
  data() {
    return {
      drawerVisible: true,
      editId: undefined,
      btnFont: '提交',

      formConfig2: {
        column: 3,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'right'
        },
        props: {

          realQualification: undefined,
          realDoctorPracticeCertificate: undefined, // 医师执业证书编号
          realAddress: undefined, // 执业地点
          realPracticeCategory: undefined, // 执业类别
          realPracticeArea: undefined, // 职业范围
          realDoctorQualificationCertificate: undefined,
          realQualificationCode: undefined, // 医师资格证书编号
          realIdNumber: undefined, // 身份证号
          realEducation: undefined, // 学历
          realGraduationSchool: undefined, // 毕业学校
          realCategory: undefined, // 类别
          realMajor: undefined // 专业
        },
        formItems: [

          {
            type: 'ImSlot',
            notInForm: true,
            slots: {
              secondSlot: 'hospitalzizhiSlot'
            }
          },
          {
            type: 'ImInput',
            prop: 'realDoctorPracticeCertificate',
            label: '医师执业证书',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCertificateCode',
            label: '医师执业证书编号',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realAddress',
            label: '执业地点',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCategory',
            rules: [{ required: true, message: '请输入' }],
            label: '执业类别',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realDoctorQualificationCertificate',
            rules: [{ required: true, message: '请输入' }],
            label: '医师资格证书',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realQualificationCode',
            label: '医师资格证书编号',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realIdNumber',
            rules: [{ required: true, message: '请输入' }],
            label: '身份证号',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realEducation',
            rules: [{ required: true, message: '请选择' }, 'realEducation'],
            label: '学历',
            attrs: {
              placeholder: '请选择学历',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImInput',
            prop: 'realGraduationSchool',
            label: '毕业学校',
            rules: [{ required: true, message: '请输入' }],
            attrs: {
              placeholder: '请输入毕业学校'
            }
          },
          {
            type: 'ImSelect',
            prop: 'realCategory',
            label: '类别',
            rules: [{ required: true, message: '请选择' }, 'realCategory'],
            attrs: {
              placeholder: '请选择',
              clearable: true,
              class: 'w-full',
              options: []
            }
          },
          {
            type: 'ImSelect',
            prop: 'realMajor',
            label: '专业',
            rules: [{ required: true, message: '请选择' }, 'realMajor'],
            attrs: {
              placeholder: '请选择专业',
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

    // 写法跟method里面一样。这个名字随意取

  },
  created() {
    this.editId = this.$route.query.objectCode
    console.log(this.editId)
    if (this.editId) {
      this.getItemDetail()
    }

    this.setOptions2()
  },
  methods: {
    realOppositePersonChange(val) {
      console.log(val)
    },
    /**
     * 统一处理options
     */

    setOptions2() {
      // this.setFormPropOptions2('realPracticeCategory', this.enums.realPracticeCategory) // 执业类别
      // this.setFormPropOptions2('realJobTitle', this.enums.jobTitle) // 职称
      this.setFormPropOptions2('realEducation', this.enums.realEducation) // 学历
      this.setFormPropOptions2('realCategory', this.enums.realCategory) // 类别
      this.setFormPropOptions2('realMajor', this.enums.realMajor) // 专业
    },

    /**
     * 设置form标单项的options，因为enums异步获取，因此这里需要手动指定一下
     * 放到计算属性会有prop绑定失效的问题
     */

    setFormPropOptions2(prop, options) {
      const formItems = this.formConfig2.formItems
      const item = formItems.find((item) => item.prop === prop)
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
      getUserDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200) {
          const props = this.formConfig2.props
          const keys = Object.keys(props)
          // 直接遍历进行赋值，特殊属性需要单独拿出来处理
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            props[key] = res.data[key] + '' || undefined
          }
        }
      })
    },

    /**
     * 提交表单
     */
    submitForm() {
      console.log('提交')

      this.$refs.ImForm2.validate((valid) => {
        if (!valid) {
          this.$message('请检查表单项！')
          return
        }
        const data = {
          ...this.formConfig2.props
        }
        if (this.editId) {
          data.objectCode = this.editId
          realPcAuthentication(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              // this.$emit('update')
              // this.closeDrower()
              this.$router.push('/user/list')
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
<style scoped>
.box {
  margin-bottom: 1rem;
  background: white;
  padding: 24px;
}
.btnWrap {
  width: 100%;
  /* position: fixed; */
  bottom: 0;
  right: 0;
  background: #fff;
  text-align: right;
  padding: 1rem;
}
</style>
