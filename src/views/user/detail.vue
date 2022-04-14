<template>
  <div>
    <div slot="header" class="information mt-2">
      <div class="doctorNumber pb-4">
        医生编号: {{ dataList.doctorNumber }}
        <img width="24px" height="24px" :src="getIcon(dataList.doctorLevel)" alt="" />
        <span class="fr auditStatus" @click="goEdit">编辑</span>
      </div>
      <div class="headContent">
        <div class="headerIcon">
          <img v-if="dataList.personalUrl" :src="dataList.personalUrl" alt="" />
          <img v-else src="~@/assets/img/framework/img-holder.png" alt="" />
        </div>
        <div class="headerDesc">
          <div class="row">
            <div class="col">昵称: {{ dataList.nickname }}</div>
            <div class="col">姓名: {{ dataList.realName }}</div>
          </div>
          <div class="row">
            <div class="col">生日: {{ dataList.birthday ? moment(dataList.birthday).format('YYYY-MM-DD') : '-' }}</div>
            <div class="col">性别: {{ getLabelByValue('gender', dataList.gender) }}</div>
          </div>
          <div class="row">
            <div class="col">手机号: {{ dataList.phone }}</div>
          </div>
        </div>
      </div>
    </div>

    <el-tabs v-model="activeName" class="detail-area" @tab-click="handleClick">
      <el-tab-pane label="医生信息" name="doctor">
        <div class="m-4 mt-0">
          <el-card class="mb-4">
            <div slot="header" class="card-header">医生信息</div>
            <el-descriptions :size="size" label-class-name="descriptionLabelClass">
              <el-descriptions-item label="医生介绍">
                <div class="image-container">
                  <img v-if="dataList.doctorIntroduction" class="image-container-img" :src="dataList.doctorIntroduction" alt="" @click="showImgView(dataList.doctorIntroduction)" />
                  <img v-else src="~@/assets/img/framework/img-holder.png" alt="" />
                </div>
              </el-descriptions-item>
              <el-descriptions-item :span="2" label="医生简介">{{ dataList.doctorProfile }}</el-descriptions-item>

              <el-descriptions-item :span="3" label="医生标签">
                <div v-if="dataList.tagDTOList">
                  <el-tag v-for="(item, index) in dataList.tagDTOShowList" :key="index" size="medium" style="margin-right: 8px; transform: translate(0, -3px)">{{ item }}</el-tag>
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="客户经理">
                <el-tag v-if="dataList.realAccountManager" style="margin-right: 8px; transform: translate(0, -3px)" size="medium">{{ dataList.realAccountManager }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item :span="2" label="对接人">
                <el-tag v-for="(item, index) in dataList.userOppositeDTOShowList" :key="index" style="margin-right: 8px; transform: translate(0, -3px)" size="medium">{{ item }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="职称">{{ getLabelByValue('jobTitle', dataList.realJobTitle) }}</el-descriptions-item>
              <el-descriptions-item label="执业分类">{{ getLabelByValue('realPracticeCategory', dataList.occupationalClassification) }}</el-descriptions-item>
              <el-descriptions-item label="行业协会">{{ dataList.realEmploymentIndustryAssociations }}</el-descriptions-item>
              <el-descriptions-item :span="3" label="所在机构">
                <div style="width: 100%">
                  <div v-for="(item, index) in dataList.userOrgInfoDTOList" :key="index" class="dep-area">
                    <div class="dep-line">
                      <div class="dep-item">
                        <span style="min-width: 70px;">机构名称:</span>
                        <a style="color: #005dbe" href="JavaScript:;" @click="onHospitalClicked(item)">{{ item.hospital }}</a>
                      </div>
                      <div class="dep-item">
                        <span style="min-width: 40px;">科室: </span>
                        <span>{{ getLabelByValue('realDepartment', item.orgDepartment) }}</span>
                      </div>
                      <div class="dep-item">
                        <span style="min-width: 70px;">机构关系: </span>
                        <span>{{ getLabelByValue('relationship', item.relationship) }}</span>
                      </div>
                    </div>
                    <div class="dep-line">
                      <div class="dep-item">
                        <span style="min-width: 70px;">机构职务:</span>
                        <span>{{ getLabelByValue('position', item.post) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card class="mb-4">
            <div slot="header">
              <span class="card-header">资质信息</span>
              <span v-if="dataList.realAuditStatus == 1 || dataList.realAuditStatus == 2" class="fr auditStatus" @click="qualification">上传资质</span>
            </div>
            <el-descriptions title="执业信息" class="mt-4" :size="size" label-class-name="descriptionLabelClass">
              <el-descriptions-item :span="3" label="医师执业证书">
                <div class="image-container">
                  <img
                    v-if="dataList.realDoctorPracticeCertificate"
                    class="image-container-img"
                    :src="dataList.realDoctorPracticeCertificate"
                    alt=""
                    @click="showImgView(dataList.realDoctorPracticeCertificate)"
                  />
                  <img v-else src="~@/assets/img/framework/img-holder.png" alt="" />
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="医师执业证书编码">{{ dataList.realPracticeCertificateCode || '-' }}</el-descriptions-item>
              <el-descriptions-item label="执业地点">{{ dataList.realAddress || '-' }}</el-descriptions-item>
              <el-descriptions-item label="执业类别">{{ dataList.realPracticeCategory || '-' }}</el-descriptions-item>
              <el-descriptions-item label="执业范围">{{ dataList.realPracticeArea || '-' }}</el-descriptions-item>
            </el-descriptions>

            <el-descriptions title="医师资格信息" class="mt-4" :size="size" label-class-name="descriptionLabelClass">
              <el-descriptions-item :span="3" label="医师资格证书">
                <div class="image-container">
                  <img
                    v-if="dataList.realDoctorQualificationCertificate"
                    class="image-container-img"
                    :src="dataList.realDoctorQualificationCertificate"
                    alt=""
                    @click="showImgView(dataList.realDoctorQualificationCertificate)"
                  />
                  <img v-else src="~@/assets/img/framework/img-holder.png" alt="" />
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="医师资格证书编码">{{ dataList.realQualificationCode || '-' }}</el-descriptions-item>
              <el-descriptions-item label="身份证号">{{ dataList.realIdNumber || '-' }}</el-descriptions-item>
              <el-descriptions-item label="学历">{{ dataList.realEducation || '-' }}</el-descriptions-item>
              <el-descriptions-item label="毕业学校">{{ dataList.realGraduationSchool || '-' }}</el-descriptions-item>
              <el-descriptions-item label="类别">{{ dataList.realCategory || '-' }}</el-descriptions-item>
              <el-descriptions-item label="专业">{{ dataList.realMajor || '-' }}</el-descriptions-item>
            </el-descriptions>

            <el-descriptions title="最近审核信息" class="mt-4" :size="size" label-class-name="descriptionLabelClass">
              <el-descriptions-item label="审核状态">
                {{ dataList.realAuditStatus == 1 ? '审核通过' : dataList.realAuditStatus == 2 ? '审核驳回' : dataList.realAuditStatus == 3 ? '审核中' : '' }}
              </el-descriptions-item>
              <el-descriptions-item label="审核编码">
                {{ dataList.userRealApprovalRecordList && dataList.userRealApprovalRecordList[0] && dataList.userRealApprovalRecordList[0].applyCode }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card>
            <div slot="header" class="card-header">账号信息</div>
            <el-descriptions title="" class="mt-4" :column="3" :size="size" label-class-name="descriptionLabelClass">
              <el-descriptions-item label="注册时间">{{ dataList.registrationTime ? moment(dataList.registrationTime).format('YYYY-MM-DD') : '' }}</el-descriptions-item>
              <el-descriptions-item :span="2" label="注册来源">{{ getLabelByValue('registrationSource', dataList.registrationSource) }}</el-descriptions-item>
              <el-descriptions-item :span="3" label="微信绑定">
                <div style="width: 100%">
                  <div class="dep-area">
                    <div class="dep-line">
                      <div class="dep-item" style="display: flex">
                        <span>是否绑定微信: </span>
                        <BindWeChatShow style="margin-left: 8px" :binding-wechat="dataList.bindingWechat"></BindWeChatShow>
                      </div>
                    </div>
                    <div class="dep-line">
                      <div class="dep-item">OpenID: {{ dataList.OpenID || '-' }}</div>
                      <div class="dep-item">UnionID: {{ dataList.UnionID || '-' }}</div>
                    </div>
                    <div class="dep-line">
                      <div class="dep-item">是否关注公众号: {{ getLabelByValue('officialAccount', dataList.officialAccount) }}</div>
                    </div>
                    <div class="dep-line">
                      <div class="dep-item">关注时间: {{ dataList.officialAccountTime ? moment(dataList.officialAccountTime).format('YYYY-MM-DD') : '' }}</div>
                      <div class="dep-item">关注来源: {{ getLabelByValue('officialAccountSource', dataList.officialAccountSource) }}</div>
                    </div>
                  </div>
                </div></el-descriptions-item>
            </el-descriptions>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="dataList.doctorLevel == 4 || dataList.doctorLevel == 5" label="专家信息" name="experts">
        <div class="m-4 mt-0">
          <el-card>
            <div slot="header" class="card-header">专家偏好</div>
            <el-descriptions title="临床相关" :size="size" label-class-name="descriptionLabelClass">
              <el-descriptions-item label="洗手衣规格">{{ getLabelByValue('expertSpecificationsHandWashingClothes', dataList.expertSpecificationsHandWashingClothes + '') }}</el-descriptions-item>
              <el-descriptions-item label="手套规格">{{ getLabelByValue('expertGloveSpecification', dataList.expertGloveSpecification + '') }}</el-descriptions-item>
              <el-descriptions-item label="消毒剂偏好">{{ getLabelByValue('expertDisinfectantPreference', dataList.expertDisinfectantPreference + '') }}</el-descriptions-item>
              <el-descriptions-item :span="3" label="针头习惯">
                <div style="width:100%">
                  <div class="dep-area">
                    <div class="dep-line" style="display: block;">
                      <div v-for="(item, index) in dataList.userHabitAddDTOList" :key="index" class="dep-item" style="margin-bottom:16px;">
                        <span style=" min-width: 200px;margin-right: 32px;">针头: {{ item.name }}</span>
                        <span>规格: {{ getLabelByValue('pinheadHabit', item.details) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="出行相关" class="mt-4" :size="size" label-class-name="descriptionLabelClass">
              <el-descriptions-item label="舱位标准">{{ getLabelByValue('expertStandardAccommodation', dataList.expertStandardAccommodation) }}</el-descriptions-item>
              <el-descriptions-item label="航司偏好">{{ dataList.expertAirlinePreference }}</el-descriptions-item>
              <el-descriptions-item label="酒店偏好">{{ dataList.expertHotelPreference }}</el-descriptions-item>
              <el-descriptions-item label="饮食偏好">{{ dataList.expertEatingHabits }}</el-descriptions-item>
              <el-descriptions-item label="饮酒偏好">{{ dataList.expertDrinkingPreference }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="休闲相关" class="mt-4" :size="size" label-class-name="descriptionLabelClass">
              <el-descriptions-item label="兴趣爱好">{{ dataList.expertHobby }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import moment from 'moment'
import utils from '@/utils/utils'
import { getUserList, getUserDetail } from '@/api/user'
import BindWeChatShow from '@/views/components/BindWeChatShow'

export default {
  name: 'UserDetail-nocache',
  components: {
    BindWeChatShow
  },
  data() {
    return {
      // 表格数据
      moment,
      auditStatus: '',
      formConfig: {
        column: 3,
        attrs: {
          labelWidth: '100px'
        },
        props: {
          name: ''
        },
        formItems: [
          {
            type: 'ImInput',
            prop: 'name',
            label: '沟通编号',
            attrs: {
              type: 'text',
              placeholder: '请输入沟通编号',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'name',
            label: '沟通结果',
            attrs: {
              type: 'text',
              placeholder: '请输入沟通结果',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImInput',
            prop: 'name',
            label: '沟通人',
            attrs: {
              type: 'text',
              placeholder: '请输入沟通人',
              style: 'width: 100%;'
            }
          },
          {
            type: 'ImButton',
            attrs: {
              style: 'flex: 1; text-align: right;',
              options: [
                {
                  label: '重 置',
                  attrs: {
                    type: 'default'
                  },
                  listeners: {
                    click: this.resetForm
                  }
                },
                {
                  label: '查 询',
                  attrs: {
                    type: 'primary'
                  },
                  listeners: {
                    click: this.search
                  }
                }
              ]
            }
          }
        ]
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loading: false,
      // 表格数据结束
      objectCode: this.$route.query.objectCode,
      list: [{ name: 1 }, { name: 2 }],
      dataList: {},
      // tab切换属性名
      activeName: 'doctor',
      // 信息样式
      size: 'medium',
      // 审核内容
      activities: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          color: '#0bbd87'
        },
        {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }
      ],
      activitiesA: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        },
        {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        },
        {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }
      ],
      // 客户经理多标签
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' }
      ]
    }
  },
  computed: {
    tableConfig() {
      return {
        data: [],
        tableItems: [
          {
            prop: 'nickname',
            label: '沟通记录编号',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'realName',
            label: '沟通结果',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'phone',
            label: '沟通人',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'regionFullName',
            label: '沟通时间',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            }
          },
          {
            prop: 'hospitalName',
            label: '关联活动',
            attrs: {
              'show-overflow-tooltip': true,
              'min-width': '120'
            },
            options: [
              {
                title: '濡白天使线上培训',
                type: 'text',
                onClick: this.showDetail
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    this.getdata()
  },

  methods: {
    showImgView(url) {
      this.$viewerApi({
        images: [url]
      })
    },

    onHospitalClicked(item) {
      this.$router.push({ name: 'HospitalDetail', query: { objectCode: item.hospitalCode } })
    },

    // 编辑
    goEdit() {
      this.$router.push(`/user/addOrEdit?objectCode=${this.dataList.objectCode}`)
    },
    // 上传资质
    qualification() {
      this.$router.push(`/user/editExports?objectCode=${this.dataList.objectCode}`)
    },
    // level动态展示
    getIcon(code) {
      if (code) {
        const iconList = require(`../../assets/img/level/v${code}.png`)
        return iconList
      }
    },
    // 获取select默认值
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || '-'
    },
    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.ImForm.reset()
      this.$refs.ImPagination.reset()
      this.getList()
    },

    /**
     * 搜索按钮点击事件，回到第一页
     */
    search() {
      this.$refs.ImPagination.reset()
      this.getList()
    },
    /**
     * 获取列表
     */
    getList() {
      const params = {
        page: this.currentPage,
        limit: this.pageSize
      }
      this.loading = true
      getUserList(params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.total = res.data.totalCount
            this.tableConfig.data = res.data.list || []
          }
        })
        .catch((_) => {
          this.loading = false
        })
    },
    showDetail() {
      console.log('showDetail')
    },
    getdata() {
      const params = {
        objectCode: this.$route.query.objectCode
      }
      this.loading = true
      if (params) {
        getUserDetail(params)
          .then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.dataList = res.data || {}
              this.auditStatus = this.dataList.userRealApprovalRecordList[this.dataList.userRealApprovalRecordList.length - 1]
            }
          })
          .catch((_) => {
            this.loading = false
          })
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.statusT {
  width: 74px;
  height: 28px;
  color: #1989fa;
  font-weight: 400;
  text-align: center;
  background: #e6f1fc;
  border: 1px solid #a3d0fd;
  border-radius: 4px;
}

.timelineDiv {
  padding-left: 20px;
}

.auditStatus {
  display: inline-block;
  float: right;
  height: 32px;
  padding: 0 16px;
  color: #fff;
  font-weight: 400;
  font-size: 12px;
  line-height: 32px;
  text-align: center;
  background: #005dbe;
  border-radius: 4px;
}

//产品认证
.elRow {
  // display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.el-col {
  width: 50%;
}

.productPane {
  display: inline-block;
  text-align: center;
}

.imgBox {
  width: 270px;
  height: auto;
  padding: 20px;
}

.contentTxet {
  padding-top: 14px;

  div {
    padding-top: 20px;

    .button {
      float: right;
    }
  }
}

.productTitle {
  padding-top: 30px;
  padding-left: 79px;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
}

.divCrad {
  margin: 0 16px;
  padding: 24px 32px;
  background: white;
}

.titleDiv {
  padding: 0 0 24px 0;
  overflow: hidden;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #d8d8d8;
}

.information {
  padding: 30px;
  padding-bottom: 0;
  overflow: hidden;
  background: white;

  .doctorNumber {
    font-weight: bold;
    font-size: 16px;
  }

  .doctorMsg {
    float: left;
    width: 70%;
    font-size: 14px;
  }

  .headContent {
    display: flex;
    align-items: center;

    .headerIcon {
      width: 96px;
      height: 96px;
      margin-right: 24px;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        background: #a6dbff;
      }
    }

    .headerDesc {
      padding: 8px;
      padding-top: 12px;
      font-size: 14px;

      .row {
        display: flex;
        margin-bottom: 16px;
        color: #000;
        font-weight: 400;
        line-height: 16px;

        .col {
          min-width: 263px;
        }
      }
    }
  }
}

.detail-area {
  .card-header {
    color: #000;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  .image-container {
    width: 160px;
    height: 160px;
    text-align: center;
    background: rgba(0, 0, 0, 0.02);

    .image-container-img {
      height: 100%;
    }
  }

  .dep-area {
    width: 100%;
    margin-bottom: 16px;
    padding: 27px 54px;
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 4px;

    .dep-line {
      display: flex;
      margin-bottom: 19px;

      &:last-child {
        margin-bottom: 0;
      }

      .dep-item {
        display: flex;
        flex: 1;
        color: #000;
        font-weight: 400;
        line-height: 16px;
      }
    }
  }
}

/deep/ .el-descriptions-row {
  font-size: 14px;
}

/deep/ .el-tabs__nav-scroll {
  padding: 0 32px;
  background: white !important;
}

/deep/ .el-tabs__item {
  height: 60px;
  line-height: 60px;
}

/deep/ .el-tabs__active-bar {
  color: #1989fa;
  background-color: #1989fa;
}

/deep/ .descriptionLabelClass {
  justify-content: right;
  width: 120px;
  margin-bottom: 24px;
}
</style>
