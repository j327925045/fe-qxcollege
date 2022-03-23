<template>
  <div class="gyl-full-screen">
    <div class="gyl-notice-container">
      <el-row class="notice-filter">
        <div class="fr">
          更新时间
          <!-- 此处参考table中表头的排序 -->
          <span class="caret-wrapper ascending">
            <i class="sort-caret ascending" />
            <i class="sort-caret descending" />
          </span>
        </div>
        <el-input v-model="input3" placeholder="请输入关键词" class="input-with-select fl">
          <el-select slot="prepend" v-model="select" placeholder="公告类型">
            <el-option label="上线通知" value="1" />
            <el-option label="新闻通知" value="2" />
            <el-option label="行政通知" value="3" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-row>
      <ul class="notice-item">
        <li v-for="(item, index) in noticeList" :key="index">
          <div class="notice-title">
            <h4>
              <a href="/notice/detail">{{ item.title }}</a>
            </h4>
            <span v-if="item.tag === 0" class="gyl-tag round danger">上线通知</span>
            <span v-if="item.tag === 1" class="gyl-tag round warning">新闻通知</span>
            <span v-if="item.tag === 2" class="gyl-tag round info">行政通知</span>
            <div class="notice-info">
              <span class="mr10"><i class="el-icon-view-solid" /> {{ item.number }}</span>
              <span>{{ item.date }}</span>
            </div>
          </div>
          <p class="notice-summary">{{ item.content }}</p>
        </li>
      </ul>
      <div class="gyl-pagination">
        <el-pagination
          background
          layout="sizes, prev, pager, next, jumper"
          :page-size="10"
          :page-sizes="[10, 20, 30, 40]"
          :current-page="currentPage"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data() {
    return {
      input3: '',
      select: '',
      noticeList: [
        {
          title: '大件产品部发文大件到仓业务线上化运营管理规范',
          tag: 0,
          number: 45,
          date: '2020.10.13',
          content:
            '国庆中秋双节假期将至，10月1日至10月8日期间，我们的服务依然7*24小时为您守候。如您有技术咨询类问题，可以通过管理控制台右上方“工单”按钮或拨打电话（4008-777-818）随时与我们的服务人员联络。账号实名认证申请正常接收和处理。财务/账号（实名认证外）/合同相关需求正常接收，将在节后陆续为您处理，感谢您的支持！'
        },
        {
          title: '双十一，那些我们躲不过去的套路',
          tag: 1,
          number: 45,
          date: '2020.10.13',
          content:
            '国庆中秋双节假期将至，10月1日至10月8日期间，我们的服务依然7*24小时为您守候。如您有技术咨询类问题，可以通过管理控制台右上方“工单”按钮或拨打电话（4008-777-818）随时与我们的服务人员联络。账号实名认证申请正常接收和处理。财务/账号（实名认证外）/合同相关需求正常接收，将在节后陆续为您处理，感谢您的支持！'
        },
        {
          title: '双十一，那些我们躲不过去的套路',
          tag: 2,
          number: 45,
          date: '2020.10.13',
          content:
            '国庆中秋双节假期将至，10月1日至10月8日期间，我们的服务依然7*24小时为您守候。如您有技术咨询类问题，可以通过管理控制台右上方“工单”按钮或拨打电话（4008-777-818）随时与我们的服务人员联络。账号实名认证申请正常接收和处理。财务/账号（实名认证外）/合同相关需求正常接收，将在节后陆续为您处理，感谢您的支持！'
        },
        {
          title: '双十一，那些我们躲不过去的套路',
          tag: 1,
          number: 45,
          date: '2020.10.13',
          content:
            '国庆中秋双节假期将至，10月1日至10月8日期间，我们的服务依然7*24小时为您守候。如您有技术咨询类问题，可以通过管理控制台右上方“工单”按钮或拨打电话（4008-777-818）随时与我们的服务人员联络。账号实名认证申请正常接收和处理。财务/账号（实名认证外）/合同相关需求正常接收，将在节后陆续为您处理，感谢您的支持！'
        },
        {
          title: '双十一，那些我们躲不过去的套路',
          tag: 2,
          number: 45,
          date: '2020.10.13',
          content:
            '国庆中秋双节假期将至，10月1日至10月8日期间，我们的服务依然7*24小时为您守候。如您有技术咨询类问题，可以通过管理控制台右上方“工单”按钮或拨打电话（4008-777-818）随时与我们的服务人员联络。账号实名认证申请正常接收和处理。财务/账号（实名认证外）/合同相关需求正常接收，将在节后陆续为您处理，感谢您的支持！'
        }
      ],
      currentPage: 4
    }
  },
  methods: {
    search() {
      console.log('搜索')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/views/demos/notice/notice.scss';
</style>
