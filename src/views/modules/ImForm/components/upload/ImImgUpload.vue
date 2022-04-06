<template>
  <el-upload
    action
    v-bind="attrs"
    :show-file-list="false"
    accept=".png,.jpg,.jpeg,.gif,.svg"
    list-type="picture-card"
    :http-request="fnUploadRequest"
    :on-success="handleAvatarSuccess"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    v-on="listeners"
  >
    <img v-if="myValue" :src="myValue" class="imageholder">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <div slot="tip" class="el-upload__tip">请上传.png,.jpg,.jpeg,.gif,.svg格式文件，且不超过2M</div>
  </el-upload>
</template>
<script>
import { beforeUpload, fnUploadRequest } from './upload'
export default {
  name: 'ImImgUpload',
  props: {
    value: {
      type: String,
      default: undefined
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
      myValue: ''
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
      this.myValue = this.value
    },

    handleRemove() {
      this.myValue = ''
      this.onUpdate()
    },

    // 图片上传成功回调
    handleAvatarSuccess(res) {
      if (res) {
        this.myValue = res.url
        this.onUpdate()
      }
    },

    onUpdate() {
      this.$emit('input', this.myValue)
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
