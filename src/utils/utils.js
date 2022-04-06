import store from '../store'

export default {
  // 正则匹配
  delUrlParam(name) {
    // 从当前URL的?号开始的字符串
    const queryStr = window.location.search.substr(1)
    // 如果没有参数则返回空
    if (queryStr !== undefined) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      return queryStr.replace(reg, '')
    }
    return ''
  },
  getOptionsItemByValue(optionKey, value) {
    const enums = store.getters.enums
    let result = {}
    const options = enums[optionKey]
    if (!options || options.length === 0) {
      return result
    }
    for (let i = 0; i < options.length; i++) {
      const item = options[i]
      if (item.value === value) {
        result = item
      }
    }
    return result
  },
  launchIntoFullscreen(element) {
    const fsElement = element || document.documentElement
    if (fsElement.requestFullscreen) {
      fsElement.requestFullscreen()
    } else if (fsElement.mozRequestFullScreen) {
      fsElement.mozRequestFullScreen()
    } else if (fsElement.webkitRequestFullscreen) {
      fsElement.webkitRequestFullscreen()
    } else if (fsElement.msRequestFullscreen) {
      fsElement.msRequestFullscreen()
    }
  },
  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  },

  getFullscreenElement() {
    const fullscreenEle = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
    return fullscreenEle
  }

}
