<template>
  <el-dialog
    title="视频播放"
    :visible.sync="dialogVisible"
    width="750px"
    @close="dialogBeforeClose"
  >
    <div id="VideoPlayer">

    </div>
    <div slot="footer">
      <el-button type="primary" @click="dialogBeforeClose()">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAliPlayerAuth } from '@/api/fileupload'
export default {
  name: 'VideoPlayer',
  data() {
    return {
      dialogVisible: false,
      player: null
    }
  },
  methods: {
    play(vid, cover) {
      this.dialogVisible = true
      this.$nextTick(async() => {
        const res = await getAliPlayerAuth({ vid: vid })
        this.player = new Aliplayer({
          id: 'VideoPlayer',
          vid: vid,
          cover: cover,
          playauth: res.data,
          format: 'mp4',
          autoplay: false,
          preload: true
        })
      })
    },
    dialogBeforeClose() {
      if (this.player) {
        this.player.dispose()
        this.player = null
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
#VideoPlayer {
  width: 100%;
  height: 450px;
}
</style>
