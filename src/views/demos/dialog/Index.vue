<template>
  <div class="gyl-dialog-page">
    <el-button type="primary" @click="showDialog1">新建弹窗-单列</el-button>
    <!-- dialog单列编辑 -->
    <dialog-single-form ref="dialogSingle" />
    <p>=================</p>
    <el-button type="primary" @click="showDialog2">新建弹窗-双列</el-button>
    <!-- dialog双列编辑 -->
    <dialog-double-form ref="dialogDouble" />
    <p>=================</p>
    <el-button type="primary" @click="showDialog3">详情弹窗</el-button>
    <!-- dialog详情弹窗 -->
    <dialog-detail ref="dialogDetail" />
    <p>=================</p>
    <el-button type="primary" @click="showDialog4">高级编辑弹窗</el-button>
    <!-- dialog高级编辑弹窗 -->
    <dialog-edit ref="dialogEdit" />
    <p>=================</p>
    <el-button type="primary" @click="open1">MessageBox删除确认</el-button>
    <el-button type="primary" @click="open2">MessageBox下单成功</el-button>
  </div>
</template>

<script>
import DialogDetail from './components/DialogDetail.vue'
import DialogSingleForm from './components/DialogSingleForm.vue'
import DialogDoubleForm from './components/DialogDoubleForm.vue'
import DialogEdit from './components/DialogEdit.vue'

export default {
  name: 'Dialog',
  components: {
    DialogDetail,
    DialogSingleForm,
    DialogDoubleForm,
    DialogEdit
  },
  data() {
    return {}
  },
  methods: {
    showDialog1() {
      this.$refs.dialogSingle.show()
    },
    showDialog2() {
      this.$refs.dialogDouble.show()
    },
    showDialog3() {
      this.$refs.dialogDetail.show()
    },
    showDialog4() {
      this.$refs.dialogEdit.show()
    },
    open1() {
      this.$confirm('<h5>确认要删除这些信息么？</h5><p>这里是一段描述文字  这里是一段描述文字文字</p>', '提示', {
        customClass: 'gyl-messageBox-twin-row',
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    open2() {
      this.$confirm('<h5>下单成功</h5><p>您的单号为：JDVC00367682835<br/>预计06月11日 21:00前上门揽件，包裹预计06月12日22:00前送达</p>', {
        customClass: 'gyl-messageBox-center',
        width: '500',
        dangerouslyUseHTMLString: true,
        showCancelButton: false,
        confirmButtonText: '确定',
        type: 'success',
        center: true
      })
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
