<template>
  <el-upload
    action
    v-bind="attrs"
    drag
    :http-request="fnUploadRequest"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    v-on="listeners"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div slot="tip" class="el-upload__tip">请上传不超过5M的文件</div>
  </el-upload>
</template>
<script>
import { beforeUpload, fnUploadRequest } from './upload'
import emitter from 'element-ui/src/mixins/emitter'
export default {
  name: 'ImDragUpload',
  mixins: [emitter],
  props: {
    value: {
      type: [Array],
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
