<template>
  <el-upload
    action
    v-bind="attrs"
    accept=".png,.jpg,.jpeg,.gif,.svg"
    list-type="picture-card"
    :http-request="fnUploadRequest"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    v-on="listeners"
  >
    <i class="el-icon-plus avatar-uploader-icon"></i>
    <div slot="tip" class="el-upload__tip">请上传.png,.jpg,.jpeg,.gif,.svg格式文件，且不超过5M</div>
  </el-upload>
</template>
<script>
import { beforeUpload, fnUploadRequest } from './upload'
import emitter from 'element-ui/src/mixins/emitter'
export default {
  name: 'ImMultipleImgUpload',
  mixins: [emitter],
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    attrs: {
      type: Object,
      default() {
        return {}
      }
    },
    listeners: {
      type: Object,
      default() {
        return {}
      }
    },
    slots: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.setMyValue()
      }
    }
  },
  methods: {
    setMyValue() {
      try {
        this.fileList = JSON.parse(JSON.stringify(this.value))
      } catch (error) {
        this.fileList = []
      }
    },

    handleRemove(file, fileList) {
      this.fileList = fileList
    },

    // 上传成功回调
    handleSuccess(res) {
      if (res) {
        console.log('handleSuccess', res)
        this.fileList.push(res)
        this.onUpdate()
      }
    },

    onUpdate() {
      this.$emit('input', this.fileList)
      this.dispatch('ElFormItem', 'el.form.change', this.fileList)
    },

    beforeUpload,

    fnUploadRequest
  }
}
</script>

<style lang="scss" scoped>
.imageholder {
  width: 100%;
  height: 100%;
  padding: 4px;
}
</style>
