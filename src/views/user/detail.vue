<template>
  <div class="content pt-4 pl-4 pr-4">
    <div class="information">
      <div class="doctorNumber pb-4">{{ dataList.doctorNumber }} <span>V{{ dataList.doctorLevel }}</span></div>
      <el-descriptions class="doctorMsg" :column="2">
        <el-descriptions-item label="昵称">{{ dataList.nickname }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ dataList.realName }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{ dataList.birthday }} </el-descriptions-item>
        <el-descriptions-item label="性别">{{ dataList.gender==0? "未知": dataList.gender==1 ?" 男":"女" }} </el-descriptions-item>
        <el-descriptions-item label="手机号">{{ dataList.phone }}  </el-descriptions-item>
      </el-descriptions>
      <div class="headerIcon"><img src="" alt=""></div>
    </div>

    <el-tabs v-model="activeName" class="mt-4" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="医生信息" name="doctor">
        <div>
          <div class="pb-4" style="font-size:16px;font-weight: bold;">
            <span>审核状态</span><span class="fr" style="color:blue">查看审核信息></span><span class="fr pr-4">{{ dataList.realAuditStatus==1?"同意":"拒绝" }}  </span>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>

          <div class="descriptionsBox">
            <el-descriptions class="margin-top" title="医生信息" :column="1" :size="size">
              <el-descriptions-item label="医生介绍">
                <img width="100px" height="100px" src="" alt="">
              </el-descriptions-item>

              <el-descriptions-item label="客户经理">
                {{ dataList.realAccountManager }}
                <!-- <el-tag
                  v-for="tag in tags"
                  :key="tag.name"
                  closable
                  :type="tag.type"
                >
                  {{ tag.name }}
                </el-tag> -->
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="margin-top" style="margin-top:43px" :column="1" :size="size">
              <el-descriptions-item label="医生简介">{{ dataList.doctorProfile }}</el-descriptions-item>
              <el-descriptions-item label="医生标签">{{ dataList.doctorLabel }}</el-descriptions-item>
              <el-descriptions-item label="对接人">{{ dataList.realOppositePerson }}</el-descriptions-item>
            </el-descriptions>
          </div>
          <div class="pb-4" style="font-size:16px;font-weight: bold;">
            <span>坐诊医院</span>
          </div>
          <el-descriptions border class="mt-4" :column="2" :size="size">
            <el-descriptions-item label="医院名称">{{ dataList.realHospitalName }}</el-descriptions-item>
            <el-descriptions-item label="医院性质">{{ dataList.realOrganizationOperation }}</el-descriptions-item>
            <el-descriptions-item label="科室">{{ dataList.realDepartment }}</el-descriptions-item>
            <el-descriptions-item label="职称">{{ dataList.realJobTitle }}</el-descriptions-item>
          </el-descriptions>
          <div class="descriptionsBox">
            <el-descriptions title="执业信息" class="mt-4" :column="2" :size="size">
              <el-descriptions-item label="医师执业证书编码">{{ dataList.realPracticeCertificateCode }}</el-descriptions-item>
              <el-descriptions-item label="执业地点">{{ dataList.realAddress }}</el-descriptions-item>
              <el-descriptions-item label="执业类别">{{ dataList.realPracticeCategory }}</el-descriptions-item>
              <el-descriptions-item label="执业范围">{{ dataList.realPracticeArea }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="mt-4" style="padding-top: 43px;" :column="1" :size="size">
              <el-descriptions-item label="医师执业证书"><img width="160px" height="80px" src="" alt=""></el-descriptions-item>
            </el-descriptions>
          </div>

          <div class="descriptionsBox">
            <el-descriptions title="医师资格信息" class="mt-4" :column="2" :size="size">
              <el-descriptions-item label="医师资格证书编码">{{ dataList.realQualificationCode }}</el-descriptions-item>
              <el-descriptions-item label="身份证号">{{ dataList.realIdNumber }}</el-descriptions-item>

              <el-descriptions-item label="学历">{{ dataList.realEducation }}</el-descriptions-item>
              <el-descriptions-item label="毕业学校">{{ dataList.realGraduationSchool }}</el-descriptions-item>
              <el-descriptions-item label="类别">{{ dataList.realCategory }}</el-descriptions-item>
              <el-descriptions-item label="专业">{{ dataList.realMajor }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="mt-4" style="padding-top: 43px;" :column="1" :size="size">
              <el-descriptions-item label="医师资格证书"><img width="160px" height="80px" src="" alt=""></el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div>
          <el-descriptions title="账号信息" class="mt-4" :column="2" :size="size">
            <el-descriptions-item label="注册时间">{{ dataList.registrationTime }}</el-descriptions-item>
            <el-descriptions-item label="注册来源">{{ dataList.registrationSource==1?"小程序":"-" }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="微信绑定" class="mt-4" :column="1" :size="size">
            <el-descriptions-item label="是否绑定微信">{{ dataList.bindWechat=="1"?"是":"否" }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions :column="3" :size="size">
            <el-descriptions-item label="OpenID">{{ dataList.OpenID }}</el-descriptions-item>
            <el-descriptions-item label="UnionID">{{ dataList.UnionID }}</el-descriptions-item>
          </el-descriptions>

          <el-descriptions :column="1" :size="size">
            <el-descriptions-item label="是否关注公众号">{{ dataList.officialAccount==1?"关注":"未关注" }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions :column="3" :size="size">
            <el-descriptions-item label="关注时间">{{ dataList.officialAccountTime }}</el-descriptions-item>
            <el-descriptions-item label="关注来源">{{ dataList.concernSource==1?"公众号":"官网" }}</el-descriptions-item>
          </el-descriptions>

        </div>
      </el-tab-pane>
      <el-tab-pane label="专家信息" name="experts">
        <div>

          <div class="pb-4" style="font-size:16px;font-weight: bold;">
            <span>专家偏好</span>
          </div>
          <el-descriptions title="临床相关" class="mt-4" :column="2" :size="size">
            <el-descriptions-item label="洗手衣规格">{{ dataList.expertSpecificationsHandWashingClothes }}</el-descriptions-item>
            <el-descriptions-item label="手套规格">{{ dataList.expertGloveSpecification }}</el-descriptions-item>
            <el-descriptions-item label="消毒剂偏好">{{ dataList.expertDisinfectantPreference }}</el-descriptions-item>
          </el-descriptions>
          <div class="descriptionsBox">
            <div style="color:#606266;font-size:12px">针头习惯：</div>
            <el-descriptions direction="vertical" :column="3" border>
              <el-descriptions-item label-class-name="my-label" label="填充剂">{{ "接口没有" }}</el-descriptions-item>
              <el-descriptions-item label-class-name="my-label" label="嗨体">{{ "接口没有" }}</el-descriptions-item>
              <el-descriptions-item label-class-name="my-label" label="冭活">{{ "接口没有" }}</el-descriptions-item>
            </el-descriptions>
          </div>
          <el-descriptions title="出行相关" class="mt-4" :column="2" :size="size">
            <el-descriptions-item label="舱位标准">{{ dataList.expertStandardAccommodation }}</el-descriptions-item>
            <el-descriptions-item label="航司偏好">{{ dataList.expertAirlinePreference }}</el-descriptions-item>
            <el-descriptions-item label="酒店偏好">{{ dataList.expertHotelPreference }}</el-descriptions-item>
            <el-descriptions-item label="饮食偏好">{{ dataList.expertEatingHabits }}</el-descriptions-item>
            <el-descriptions-item label="饮酒偏好">{{ dataList.expertDrinkingPreference }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="休闲相关" class="mt-4" :column="2" :size="size">
            <el-descriptions-item label="兴趣爱好">{{ dataList.expertHobby }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-tab-pane>
      <el-tab-pane class="productPane" label="产品认证" name="product">
        <div>
          <div class="productTitle pb-4">
            <span>认证证书 </span>
          </div>
          <el-row class="elRow">
            <el-col v-for="(o, index) in 3" :key="index">
              <el-card class="box-card" :body-style="{ padding: '0px', display: 'flex'}">
                <img class="imgBox" src="">
                <div class="contentTxet">
                  <div>嗨体产品认证</div>
                  <div>证书编号：{{ dataList.realQualificationCode }}</div>
                  <div>认证时间：{{ "接口没有" }}</div>
                  <div>到期时间：{{ "接口没有" }}</div>
                  <div class="bottom clearfix">
                    <el-button type="primary" class="button">查看</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <div>
          <div class="productTitle pb-4">
            <span>进行中的认证</span>
          </div>
          <el-row>
            <el-col v-for="(o, index) in 3" :key="index">
              <el-card class="box-card" :body-style="{ padding: '0px', display: 'flex'}">
                <img class="imgBox" src="">
                <div class="contentTxet">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, inx) in activitiesA"
                      :key="inx"
                      :icon="activity.icon"
                      :type="activity.type"
                      :color="activity.color"
                      :size="activity.size"
                      :timestamp="activity.timestamp"
                    >
                      {{ activity.content }}
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-card>
            </el-col>
          </el-row>

        </div>
      </el-tab-pane>
      <el-tab-pane label="沟通记录" name="communication">
        <div>
          <ImSearchArea>
            <ImForm ref="ImForm" :form="formConfig"></ImForm>
          </ImSearchArea>
          <ImTableArea>
            <ImTable :loading="loading" :table="tableConfig"></ImTable>
            <div class="mt-4 text-right">
              <ImPagination
                ref="ImPagination"
                :page-size.sync="pageSize"
                :current-page.sync="currentPage"
                :total="total"
                @change="getList"
              ></ImPagination>
            </div>
          </ImTableArea>
        </div>
      </el-tab-pane>
      <el-tab-pane label="活动记录" name="activity">活动记录</el-tab-pane>
      <el-tab-pane label="课程记录" name="course">课程记录</el-tab-pane>
      <el-tab-pane label="操作日志" name="operation">操作日志</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import { getList } from '@/api/doctorDetail'

import { getUserList } from '@/api/user'
import ImPagination from '@/views/components/ImPagination'
import ImTable from '@/views/components/ImTable/index'
import ImForm from '@/views/components/ImForm/index'
import ImSearchArea from '@/views/components/ImSearchArea'
import ImTableArea from '@/views/components/ImTableArea'
export default {
  components: {
    ImPagination,
    ImTable,
    ImForm,
    ImSearchArea,
    ImTableArea

  },
  data() {
    return {
      // 表格数据
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
      dataList: '',
      // tab切换属性名
      activeName: 'doctor',
      // 信息样式
      size: '',
      // 审核内容
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        color: '#0bbd87'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }],
      activitiesA: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }],
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
      console.log(this.objectCode)
      const params = {
        objectCode: this.objectCode
      }
      this.loading = true
      getList(params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.dataList = res.data || {}
          }
        })
        .catch((_) => {
          this.loading = false
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>

.information{

  background: white;
  padding:30px;
  overflow: hidden;
  .doctorNumber{
    font-size: 20px;
    font-weight: bold;
  }
  .doctorMsg{
    width: 70%;
    font-size: 14px;
    float: left;
  }
  .headerIcon{
    float: left;
    margin-top: -40px;
  }
}
//产品认真
.elRow{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.el-col {
  width: 50%;
}
.el-card{
  width: 450px;
  height: 240px;
  margin: 10px;
  display: inline-block;
}
.productPane{
  display: inline-block;
  text-align: center;
}
.imgBox{
  width: 270px;
  height: auto;
  padding:  20px;
}
.descriptionsBox{
  display: flex;
}
.contentTxet {
  padding-top: 14px;
  div{
   padding-top: 20px;
   .button{
     float: right;
   }
  }
}
.productTitle{
  font-size: 16px;
    font-weight: bold;
    text-align: left;
    padding-left: 79px;
    padding-top: 30px;
}
</style>
