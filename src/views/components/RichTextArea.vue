<template>
  <div class="__RichTextArea" style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :default-config="toolbarConfig" :mode="mode" />
    <Editor v-model="myValue" :style="{ height: height + 'px' }" :default-config="editorConfig" :mode="mode" @onChange="onChange" @onCreated="onCreated" />
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { findAliToken } from '@/api/fileupload'
const OSS = require('ali-oss')

export default {
  name: 'RichTextArea',
  components: {
    Editor,
    Toolbar
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      editor: null,
      myValue: '',
      toolbarConfig: {
        excludeKeys: ['fullScreen']
      },
      editorConfig: {
        MENU_CONF: {
          uploadImage: {
            server: '/', // 上传图片地址
            timeout: 5 * 1000, // 5s
            maxFileSize: 10 * 1024 * 1024, // 10M
            base64LimitSize: 5 * 1024, // 5kb 以下插入 base64
            // // 用户自定义上传图片
            customUpload: this.customUpload
          }
        }
      },
      mode: 'default' // or 'simple'
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
    customUpload(file, insertFn) {
      return new Promise((resolve) => {
        findAliToken().then(res => {
          const resData = res.data
          const client = new OSS({
            accessKeyId: resData.accessKeyId, // 查看你自己的阿里云KEY
            accessKeySecret: resData.accessKeySecret, // 查看自己的阿里云KEYSECRET
            stsToken: resData.securityToken,
            bucket: resData.bucket, // 你的 OSS bucket 名称
            region: 'oss-cn-beijing', // bucket 所在地址，我的是 华北2 北京
            endpoint: 'oss-cn-beijing.aliyuncs.com' // 自己的域名
          })
          const fileName = file.name.substr(0, file.name.lastIndexOf('.'))
          const date = new Date().getTime()
          const fileNames = `${date}_${fileName}` // 拼接文件名，保证唯一，这里使用时间戳+原文件名
          // 上传文件,这里是上传到OSS的 uploads文件夹下
          client.put('pcUploads/' + fileNames, file).then(res => {
            if (res.res.statusCode === 200) {
              const url = res.url
              insertFn(url, 'url', url)
              resolve('ok')
            } else {
              console.log('上传失败')
            }
          })
        })
      })
    },
    onCreated(editor) {
      // 一定要用 Object.seal() ，否则会报错
      this.editor = Object.seal(editor)
      console.log('this.editor.', this.editor.getConfig())
    },
    onChange() {
      this.$emit('input', this.myValue)
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy()
    }
  }
}
</script>
<style lang="scss" scoped>
.__RichTextArea {
  /deep/ .w-e-text-container {
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
}
</style>
