export default {
  name: 'AffixTable',
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    selector: {
      type: String,
      default: '.app-scrollbar-wrapper'
    }
  },
  data() {
    return {
      scrollContainer: null,
      scrollTop: 0,
      $head: [],
      $body: null,
      ticking: false
    }
  },
  activated() {
    // 如果页面用户keep-alive，列表需要定位到对应项
    if (this.scrollContainer) {
      this.scrollContainer.scrollTop = this.scrollTop || 0
      this.scrollContainer.addEventListener('scroll', this.onScroll)
    }
  },
  deactivated() {
    this.scrollContainer.removeEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    this.scrollContainer.removeEventListener('scroll', this.onScroll)
  },
  mounted() {
    this.scrollContainer = document.querySelector(this.selector)
    this.$body = this.$el.querySelector('.el-table')
    this.$nextTick(() => {
      this.$head = this.$el.querySelectorAll('.el-table .el-table__header-wrapper,.el-table .el-table__fixed-header-wrapper')
      this.setFixedStyle()
    })
    this.scrollContainer.addEventListener('scroll', this.onScroll)
  },
  methods: {
    setFixedStyle() {
      for (let i = 0; i < this.$head.length; i++) {
        const item = this.$head[i]
        item.style.background = 'url(http://about:blank)'
        item.style.backgroundAttachment = 'fixed'
      }
    },
    onScroll() {
      this.scrollTop = this.scrollContainer.scrollTop
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          const $head = this.$head || []
          const bodyTop = this.$body.getBoundingClientRect().top
          for (let i = 0; i < $head.length; i++) {
            const item = $head[i]
            if (bodyTop <= this.stickyTop) {
              item.style.transform = `translate3d(0, ${this.stickyTop - bodyTop}px, 0)`
            } else {
              item.style.transform = 'translate3d(0, 0, 0)'
            }
            item.style.zIndex = 10
            if (item.getAttribute('class').indexOf('el-table__fixed-header-wrapper') > -1) {
              item.style.position = 'absolute'
            } else {
              item.style.position = 'relative'
            }
          }
          this.ticking = false
        })
        this.ticking = true
      }
    }
  },
  render() {
    const props = { ...this.$attrs }
    return (
      <div>
        <el-table style="background-color:white;" props={ props } on={ this.$listeners } scopedSlots={ this.$scopedSlots }>
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
        </el-table>
      </div>
    )
  }
}
