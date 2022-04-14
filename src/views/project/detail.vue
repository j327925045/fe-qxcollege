<template>
  <ImWrapper>
    <div slot="header" class="bg-white rounded p-6 mt-2">
      <div class="header-container">
        <span class="header-text">项目编号: {{ productDetail.projectCode }}</span>
        <div>
          <el-button @click="deleteItem">删 除</el-button>
          <el-button type="primary" @click="editItem">编 辑</el-button>
        </div>
      </div>
    </div>
    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">项目信息</span>
      </div>
      <el-descriptions size="medium" label-class-name="descriptionLabelClass">
        <el-descriptions-item label="项目名称">
          <span class="projectName">{{ productDetail.name }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="项目编号">
          <span class="projectText">{{ productDetail.projectCode }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="产品数量">
          <span class="projectText">{{ productDetail.projectProductCodeArr && productDetail.projectProductCodeArr.length }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="项目明细">
          <span class="projectText">{{ productDetail.projectDeteils||'-' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="创始医生">
          <span class="projectText">{{ productDetail.foundingName||'-' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="共识医生">
          <div v-if="productDetail.projectConsensusNameList">
            <span v-for="item,index in productDetail.projectConsensusNameList" :key="index">
              <el-tag :key="index" size="small">{{ item }}</el-tag>
            </span>
          </div>
          <div v-else>
            -
          </div>
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="项目图片">
          <img v-if="productDetail.projectPictureUrl" class="imageClass" :src="productDetail.projectPictureUrl" alt="" @click="showImgView(productDetail.projectPictureUrl)" />
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="项目介绍">
          <div v-if="productDetail.projectIntroduce">
            <div v-html="productDetail.projectIntroduce?productDetail.projectIntroduce:'-'"></div>
          </div>
          <div v-else>-</div>
        </el-descriptions-item>

      </el-descriptions>

    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span class="headertext">关联产品</span>
      </div>
      <ImTable :table="tableConfig">
        <template slot="productNum" slot-scope="scope">
          <el-button type="text" style="font-size:14px" @click="viewProjectDetail(scope.row.objectCode)">{{ scope.row.productNum }}</el-button>
        </template>
      </ImTable>
    </el-card>
  </ImWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import utils from '@/utils/utils'

import { deleteProjectItem, getProjectDetail } from '@/api/project'
export default {
  name: 'ProjectDetail',
  data() {
    return {
      moment,
      objectCode: this.$route.query.objectCode,
      detailDialogVisible: false,
      productDetail: {},
      tableConfig: {
        data: [],
        tableItems: [

          {
            prop: 'productNum',
            label: '产品编号',
            type: 'slot',
            attrs: {
              'show-overflow-tooltip': true
            },
            slot: 'productNum'
          },
          {
            prop: 'name',
            label: '产品名称',
            attrs: {
              'show-overflow-tooltip': true
            }
          },
          {
            prop: 'indication',
            label: '产品介绍',
            attrs: {
              'show-overflow-tooltip': true
            }
          },
          {
            prop: 'businessType',
            label: '业务类型',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true
            },
            options: []
          },
          {
            prop: 'category',
            label: '材料类别',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true
            },
            options: []
          },
          {
            prop: 'type',
            label: '产品类型',
            type: 'mapList',
            attrs: {
              'show-overflow-tooltip': true
            },
            options: []
          }

        ]

      }
    }
  },
  computed: {
    ...mapGetters(['enums'])

  },
  activated() {
    this.getItemDetail()
    this.setOptions()
  },
  methods: {

    viewProjectDetail(objectCode) {
      this.$router.push({ name: 'ProductDetail', query: { objectCode } })
    },
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
      console.log(prop, options)
      const formItems = this.tableConfig.tableItems
      const item = formItems.find(x => {
        console.log(x)
        return x.prop === prop
      })
      console.log(options)
      this.$set(item, 'options', options)
    },
    showImgView(url) {
      this.$viewerApi({
        images: [url]
      })
    },

    /**
     * 获取详情
     */
    getItemDetail() {
      getProjectDetail({ objectCode: this.$route.query.objectCode }).then(res => {
        if (res.code === 200) {
          this.productDetail = res.data
          this.productDetail.projectProductList = res.data.projectProductArr

          this.tableConfig.data = res.data.productList || []
          // console.log(this.tableConfig)
        }
      })
    },
    getLabelByValue(key, value) {
      const item = utils.getOptionsItemByValue(key, value)
      return item.label || ''
    },
    deleteItem($index, record) {
      console.log(record)
      this.$confirm('确定要删除该项吗？', '提示', {
        type: 'warning',
        customClass: 'deleteConfirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          // if (this.tableConfig.data.length > 0) {
          //   this.$message.error('该项目下有机构 ，不允许删除。')
          // } else {
          deleteProjectItem({ objectCode: this.objectCode }).then((res) => {
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.goListPage()
            } else {
              this.$message.error(res.message)
            }
          })
          // }
        })
        .catch(() => {})
    },

    goListPage() {
      this.$router.replace({ name: 'ProjectList' })
    },
    editItem($index, record) {
      this.$router.push({ name: 'ProjectAddOrEdit', query: { objectCode: this.productDetail.objectCode } })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-text {
    color: #000;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
}

.box-card {
  margin-bottom: 16px;

  .headertext {
    color: #000;
    font-weight: 600;
    font-size: 16px;
  }

  .imageClass {
    width: 124px;
    height: 124px;
    cursor: pointer;
  }

  .projectName{
    font-weight: 500;
  }

  .projectText{
    font-size: 14px;
  }
}

/deep/ .descriptionLabelClass {
  justify-content: right;
  width: 120px;
  margin-bottom: 24px;
}

/deep/.el-descriptions-item__label{
  padding-bottom: 10px;
  font-weight: bold;
}

/deep/.el-tag{
  margin-right: 5px;
}

/deep/ .__RichTextArea {
  width: 100%;
  max-height: 300px;
  padding: 16px;
  overflow: auto;
  border: 2px solid rgba(0, 0, 0, 0.1);

  //标题
  h1 {
    margin: 0.67em 0;
    font-size: 2em;
  }

  h2 {
    margin: 0.75em 0;
    font-size: 1.5em;
  }

  h3 {
    margin: 0.83em 0;
    font-size: 1.17em;
  }

  h4 {
    margin: 1.12em 0;
  }

  h5 {
    margin: 1.5em 0;
    font-size: 0.83em;
  }

  h6 {
    margin: 1.67em 0;
    font-size: 0.75em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  b,
  strong {
    font-weight: bolder;
  }

  ul,
  ul li {
    list-style-position: inside;
    list-style-type: disc;
  }

  ol,
  ol li {
    list-style-position: inside;
    list-style-type: decimal;
  }

  em {
    font-style: italic;
  }
}
</style>
