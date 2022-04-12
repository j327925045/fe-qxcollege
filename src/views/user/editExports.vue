<template>
  <ImWrapper>
    <div class="mb-[32px] bg-white p-4">
      <ImForm ref="ImForm" :form="formConfig">
        <h3 slot="hospitalzizhiSlot" style="width: 100%" class="gyl-title"><i class="el-icon-s-order" />医生资质信息</h3>
      </ImForm>
    </div>
    <div class="fixed bottom-0 text-right right-0 w-full p-2 bg-white shadow-dark-50 shadow-2xl">
      <el-button @click="closeCurrent">取 消</el-button>
      <el-button type="primary" @click="submitForm">保 存</el-button>
    </div>
  </ImWrapper>
</template>

<script>
import { getUserDetail, realPcAuthentication } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'editExports',
  data() {
    return {
      drawerVisible: true,
      editId: undefined,
      formConfig: {
        column: 3,
        gutter: 42,
        attrs: {
          labelWidth: '140px',
          labelPosition: 'top'
        },
        props: {
          realDoctorPracticeCertificate: undefined,
          realPracticeCertificateCode: undefined,
          realAddress: undefined,
          realPracticeCategory: undefined,
          realPracticeArea: undefined,
          realDoctorQualificationCertificate: undefined,
          realQualificationCode: undefined,
          realIdNumber: undefined,
          realEducation: undefined,
          realGraduationSchool: undefined,
          realCategory: undefined,
          realMajor: undefined
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
            type: 'ImImgUpload',
            prop: 'realDoctorPracticeCertificate',
            label: '医师执业证书',
            span: 24,
            rules: [{ required: true, message: '请上传医师执业证书' }]
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCertificateCode',
            label: '医师执业证书编号',
            rules: [{ required: true, message: '请输入医师执业证书编号' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realAddress',
            label: '执业地点',
            rules: [{ required: true, message: '请输入执业地点' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeCategory',
            rules: [{ required: true, message: '请输入执业类别' }],
            label: '执业类别',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realPracticeArea',
            rules: [{ required: true, message: '请输入执业范围' }],
            label: '执业范围',
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImImgUpload',
            prop: 'realDoctorQualificationCertificate',
            span: 24,
            rules: [{ required: true, message: '请上传医师资格证书' }],
            label: '医师资格证书'
          },
          {
            type: 'ImInput',
            prop: 'realQualificationCode',
            label: '医师资格证书编号',
            rules: [{ required: true, message: '请输入医师资格证书编号' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realIdNumber',
            rules: [{ required: true, message: '请输入身份证号' }],
            label: '身份证号',
            attrs: {
              maxLength: 18,
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realEducation',
            rules: [{ required: true, message: '请输入学历' }],
            label: '学历',
            attrs: {
              placeholder: '请输入',
              class: 'w-full'
            }
          },
          {
            type: 'ImInput',
            prop: 'realGraduationSchool',
            label: '毕业学校',
            rules: [{ required: true, message: '请输入毕业学校' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realCategory',
            label: '类别',
            rules: [{ required: true, message: '请输入类别' }],
            attrs: {
              placeholder: '请输入'
            }
          },
          {
            type: 'ImInput',
            prop: 'realMajor',
            label: '专业',
            rules: [{ required: true, message: '请输入专业' }],
            attrs: {
              placeholder: '请输入'
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
  activated() {
    this.editId = this.$route.query.objectCode
    if (this.editId) {
      this.getItemDetail()
    }
  },
  methods: {
    /**
     * 获取详情
     */
    getItemDetail() {
      getUserDetail({ objectCode: this.editId }).then((res) => {
        if (res.code === 200) {
          const props = this.formConfig.props
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
          realPcAuthentication(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('更新成功！')
              this.closeCurrent()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    closeCurrent() {
      this.$router.replace({ name: 'UserList' })
    }
  }
}
</script>
