export const cascaderOptions = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          {
            value: 'yizhi',
            label: '一致'
          },
          {
            value: 'fankui',
            label: '反馈'
          },
          {
            value: 'xiaolv',
            label: '效率'
          },
          {
            value: 'kekong',
            label: '可控'
          }
        ]
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          {
            value: 'cexiangdaohang',
            label: '侧向导航'
          },
          {
            value: 'dingbudaohang',
            label: '顶部导航'
          }
        ]
      }
    ]
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout 布局'
          },
          {
            value: 'color',
            label: 'Color 色彩'
          },
          {
            value: 'typography',
            label: 'Typography 字体'
          },
          {
            value: 'icon',
            label: 'Icon 图标'
          },
          {
            value: 'button',
            label: 'Button 按钮'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio 单选框'
          },
          {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          },
          {
            value: 'input',
            label: 'Input 输入框'
          },
          {
            value: 'input-number',
            label: 'InputNumber 计数器'
          },
          {
            value: 'select',
            label: 'Select 选择器'
          },
          {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          },
          {
            value: 'switch',
            label: 'Switch 开关'
          },
          {
            value: 'slider',
            label: 'Slider 滑块'
          },
          {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          },
          {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          },
          {
            value: 'upload',
            label: 'Upload 上传'
          },
          {
            value: 'rate',
            label: 'Rate 评分'
          },
          {
            value: 'form',
            label: 'Form 表单'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table 表格'
          },
          {
            value: 'tag',
            label: 'Tag 标签'
          },
          {
            value: 'progress',
            label: 'Progress 进度条'
          },
          {
            value: 'tree',
            label: 'Tree 树形控件'
          },
          {
            value: 'pagination',
            label: 'Pagination 分页'
          },
          {
            value: 'badge',
            label: 'Badge 标记'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert 警告'
          },
          {
            value: 'loading',
            label: 'Loading 加载'
          },
          {
            value: 'message',
            label: 'Message 消息提示'
          },
          {
            value: 'message-box',
            label: 'MessageBox 弹框'
          },
          {
            value: 'notification',
            label: 'Notification 通知'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'NavMenu 导航菜单'
          },
          {
            value: 'tabs',
            label: 'Tabs 标签页'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          },
          {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          },
          {
            value: 'steps',
            label: 'Steps 步骤条'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog 对话框'
          },
          {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          },
          {
            value: 'popover',
            label: 'Popover 弹出框'
          },
          {
            value: 'card',
            label: 'Card 卡片'
          },
          {
            value: 'carousel',
            label: 'Carousel 走马灯'
          },
          {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }
        ]
      }
    ]
  },
  {
    value: 'ziyuan',
    label: '资源',
    children: [
      {
        value: 'axure',
        label: 'Axure Components'
      },
      {
        value: 'sketch',
        label: 'Sketch Templates'
      },
      {
        value: 'jiaohu',
        label: '组件交互文档'
      }
    ]
  }
]

export const checkboxGroupOptions = [
  {
    label: '足球',
    value: '0',
    disabled: false
  },
  {
    label: '篮球',
    value: '1',
    disabled: false
  },
  {
    label: '排球',
    value: '2',
    disabled: false
  },
  {
    label: '乒乓球',
    value: '3',
    disabled: false
  }
]

export const defaultTime = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

export const genderOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

export const cityOptions = [
  {
    label: '热门城市',
    options: [
      {
        value: 'Shanghai',
        label: '上海'
      },
      {
        value: 'Beijing',
        label: '北京'
      }
    ]
  },
  {
    label: '城市名',
    options: [
      {
        value: 'Chengdu',
        label: '成都'
      },
      {
        value: 'Shenzhen',
        label: '深圳'
      },
      {
        value: 'Guangzhou',
        label: '广州'
      },
      {
        value: 'Dalian',
        label: '大连'
      }
    ]
  }
]

export const tableData = [
  {
    id: '000001',
    status: '1',
    name: '张三',
    gender: 1,
    bought: '1',
    photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
    datetime: 1487695862000,
    tags: ['1', '2', '3', '4'],
    areaCode: [130100, 130400],
    progress: 50
  },
  {
    id: '000002',
    status: '2',
    name: '李四',
    gender: 1,
    bought: '0',
    photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
    datetime: 1487692862000,
    tags: ['1', '2', '3', '4'],
    areaCode: [130100, 130400],
    progress: 40
  },
  {
    id: '000003',
    status: '1',
    name: '王五',
    gender: 2,
    bought: '1',
    photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
    datetime: 1487693862000,
    tags: ['1', '2', '3', '4'],
    areaCode: [140100, 140300, 140400],
    progress: 30
  },
  {
    id: '000004',
    status: '1',
    name: '赵六',
    gender: 2,
    bought: '0',
    photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
    datetime: 1487694862000,
    tags: ['1', '2', '3', '4'],
    areaCode: [130100, 130400],
    progress: 90
  }
]

export const mapListOptions = [
  {
    value: '1',
    label: '已购买',
    style: 'color:red;'
  },
  {
    value: '2',
    label: '未购买',
    style: 'color:brown;'
  }
]
