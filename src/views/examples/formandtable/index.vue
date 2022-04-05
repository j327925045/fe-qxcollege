<template>
  <div>
    <Imform ref="demoForm" class="bg-white mb-4 pt-4 pr-4" :form="form">
      <i slot="nameSuffix" class="el-input__icon el-icon-date"></i>
      <template slot="namePrepend">name</template>
      <i slot="nicknameSuffix" class="el-input__icon el-icon-view"></i>
      <template slot="nicknamePrepend">nickname</template>
      <el-input slot="slotComp" v-model="form.props.testSlot" placeholder="slot7777"></el-input>
    </Imform>
    <pre class="codeList">{{ JSON.stringify(form.props, true, '    ') }}
    </pre>
    <ImTable ref="demoTable" :table="table">
      <template slot="genderHeadSlot">
        性别
        <el-tooltip content="tooltip信息" class="item" effect="dark" placement="top">
          <i style="cursor: pointer" class="el-icon-info" />
        </el-tooltip>
      </template>
      <template slot="someSlot" slot-scope="scope">
        <span>{{ scope.$index }} - {{ scope.row.gender }}</span>
        <el-button type="text" @click="onslotClick(scope)">click</el-button>
      </template>
    </ImTable>
  </div>
</template>

<script>
// import { cities, cityMaps } from '@/utils/cities.js'
import { cityMaps } from '@/utils/cities.js'
import { mapListOptions, cascaderOptions, checkboxGroupOptions, defaultTime, genderOptions, cityOptions, tableData } from './dataConfig'
export default {
  data() {
    return {
      form: {
        column: 3,
        attrs: {
          labelWidth: '120px',
          labelPosition: 'right'
        },
        listeners: {},
        props: {
          name: '',
          nickname: 'nickname',
          agent: undefined,
          gender: 1,
          age: 1,
          areaCode: undefined,
          birthday: '2022-03-07T16:00:00.000Z',
          hobby: ['2', '3'],
          likeColor: '#000000',
          city: 'Beijing',
          dateRange: [],
          timeRange: ['00:00', '23:59'],
          timePeriod: defaultTime,
          cascader: 'dingbudaohang',
          testSlot: ''
        },
        formItems: [
          {
            type: 'ImSlot',
            label: 'slot组件',
            slots: {
              slot: 'slotComp'
            }
          },
          {
            type: 'ImDatePicker',
            prop: 'dateRange',
            label: '日期范围',
            attrs: {
              style: 'width: 100%',
              type: 'daterange',
              format: 'yyyy 年 MM 月 dd 日',
              valueFormat: 'yyyy-MM-dd',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期'
            }
          },
          {
            type: 'ImTimePicker',
            prop: 'timeRange',
            label: '时间范围',
            attrs: {
              style: 'width: 100%',
              isRange: true,
              format: 'HH:mm',
              valueFormat: 'HH:mm',
              startPlaceholder: '开始时间',
              endPlaceholder: '结束时间'
            }
          },
          {
            type: 'ImRadio',
            prop: 'gender',
            label: '性别2',
            rules: ['required'],
            hidden: false,
            attrs: {
              options: genderOptions
            },
            listeners: {
              change(value) {
                console.log('radioChange', value)
              }
            }
          },
          {
            type: 'ImSelect',
            prop: 'agent',
            label: '性别',
            rules: ['required'],
            hidden: false,
            attrs: {
              clearable: true,
              placeholder: '啥时候',
              style: 'width: 100%',
              options: genderOptions
            },
            listeners: {
              change(change) {
                console.log('change', change)
              }
            }
          },
          {
            type: 'ImInput',
            prop: 'name',
            label: '姓名',
            rules: ['required'],
            hidden: false,
            attrs: {
              type: 'text',
              placeholder: '请输入姓名',
              disabled: false,
              style: 'width: 100%;'
            },
            listeners: {
              change(value) {
                console.log('value111', value)
              },
              input(input) {
                console.log('input111', input)
              }
            },
            slots: {
              suffix: 'nameSuffix',
              prepend: 'namePrepend'
            }
          },
          {
            type: 'ImInput',
            prop: 'nickname',
            label: '昵称',
            rules: ['required'],
            hidden: false,
            attrs: {
              type: 'text',
              placeholder: '请输入姓名',
              disabled: false,
              style: 'width: 100%;'
            },
            listeners: {
              change(value) {
                console.log('value111', value)
              },
              input(input) {
                console.log('input111', input)
              }
            },
            slots: {
              suffix: 'nicknameSuffix',
              prepend: 'nicknamePrepend'
            }
          },
          // {
          //   type: 'ImWeekTimeSelect',
          //   prop: 'timePeriod',
          //   label: '屏蔽时间段'
          // },
          // {
          //   type: 'ImTree',
          //   prop: 'areaCode',
          //   label: '屏蔽地域',
          //   column: 1,
          //   attrs: {
          //     options: cities,
          //     showCheckbox: true
          //   },
          //   listeners: {
          //     'check-change'(value) {
          //       console.log('onCheckChanged', value)
          //     }
          //   }
          // },
          {
            type: 'ImInputNumber',
            prop: 'age',
            label: '年龄',
            rules: ['required', 'int'],
            hidden: false,
            attrs: {
              style: 'width: 100%',
              type: 'input',
              controlsPosition: 'right',
              min: 0,
              max: 10,
              disabled: false
            },
            listeners: {
              change(value) {
                console.log('value', value)
              }
            }
          },
          {
            type: 'ImDatePicker',
            prop: 'birthday',
            label: '生日',
            rules: ['required'],
            hidden: false,
            attrs: {
              style: 'width: 100%',
              type: 'datetime',
              placeholder: '请输入生日',
              disabled: false,
              showTime: true
            },
            listeners: {
              change(change) {
                console.log('change', change)
              }
            }
          },
          {
            type: 'ImColorPicker',
            prop: 'likeColor',
            label: '颜色',
            rules: ['required'],
            hidden: false,
            attrs: {
              style: 'width: 100%;',
              placeholder: '请输入颜色值',
              alpha: false,
              disabled: false
            }
          },
          {
            type: 'ImGroupSelect',
            prop: 'city',
            label: '城市',
            rules: ['required'],
            hidden: false,
            attrs: {
              style: 'width: 100%',
              options: cityOptions
            }
          },
          {
            type: 'ImCheckboxGroup',
            prop: 'hobby',
            label: '爱好',
            rules: ['required'],
            hidden: false,
            attrs: {
              style: 'width: 100%;',
              options: checkboxGroupOptions
            }
          },
          {
            type: 'ImCascader',
            prop: 'cascader',
            label: '爱好',
            attrs: {
              style: 'width: 100%',
              placeholder: '请选择爱好',
              showAllLevels: true,
              props: {
                emitPath: true
              },
              options: cascaderOptions
            },
            listeners: {
              change(value) {
                console.log('cascader', value)
              }
            }
          },
          {
            type: 'ImButton',
            attrs: {
              style: 'float:right;',
              options: [
                {
                  label: '提交',
                  attrs: {
                    type: 'primary'
                  },
                  listeners: {
                    click: this.onSubmit
                  }
                },
                {
                  label: '重置',
                  attrs: {
                    type: 'danger'
                  },
                  listeners: {
                    click: this.onReset
                  }
                }
              ]
            }
          }
        ]
      },
      table: {
        data: tableData,
        attrs: {
          size: 'small'
        },
        listeners: {
          'sort-change'() {
            console.log('sort-change')
          },
          'selection-change'(selection) {
            console.log('selection', selection)
          }
        },
        tableItems: [
          {
            type: 'selection',
            attrs: {
              fixed: 'left',
              width: 80,
              selectable(row, index) {
                return row.gender === 1
              }
            }
          },
          {
            type: 'index',
            label: 'index',
            attrs: {
              fixed: 'left',
              width: '100'
            }
          },
          {
            type: 'slot',
            label: 'slot',
            attrs: {
              fixed: 'left',
              width: '100'
            },
            slot: 'someSlot'
          },
          {
            prop: 'gender',
            type: 'select',
            label: 'select',
            headSlot: 'genderHeadSlot',
            attrs: {
              sortable: true,
              disabled: false,
              width: '200'
            },
            componentAttrs: {
              placeholder: '12312312'
            },
            onChage($index, row, propKey, prop) {
              console.log('$index', $index)
              console.log('row', row)
              console.log('propKey', propKey)
              console.log('prop', prop)
            },
            options: genderOptions
          },
          {
            prop: 'areaCode',
            type: 'tags',
            label: '屏蔽地域',
            attrs: {
              width: 200
            },
            options: cityMaps
          },
          {
            prop: 'name',
            type: 'edit',
            label: 'edit',
            attrs: {
              sortable: true,
              width: '100'
            },
            onEdit($index, row, propKey, prop) {
              console.log('$index', $index)
              console.log('row', row)
              console.log('propKey', propKey)
              console.log('prop', prop)
            }
          },
          {
            prop: 'id',
            label: 'default || ""',
            attrs: {
              sortable: true,
              width: '120'
            }
          },
          {
            prop: 'name',
            label: 'tooltip',
            type: 'tooltip',
            attrs: {
              width: '100',
              sortable: true
            },
            componentAttrs: {
              placement: 'top',
              effect: 'light',
              style: 'cursor:pointer;color:blue;font-weight:bold;'
            },
            template:
              '<img src="http://api.app.letv.com/getqr?w=100&txt=ITEM_PROP"/>',
            onClick($index, row) {
              console.log('$index', $index)
              console.log('row', row)
            }
          },
          {
            prop: 'status',
            label: 'mapList',
            type: 'mapList',
            attrs: {
              width: '100'
            },
            options: mapListOptions
          },
          {
            prop: '',
            label: 'buttons',
            type: 'buttons',
            attrs: {
              fixed: 'right',
              width: '220'
            },
            options: [
              {
                title: 'btn1',
                type: 'primary',
                attrs: {
                  round: true
                },
                onClick($index, row) {}
              },
              {
                title: 'btn2',
                type: 'text',
                attrs: {},
                onClick($index, row) {}
              },
              {
                title: 'btn3',
                type: 'danger',
                attrs: {},
                onClick($index, row) {}
              }
            ]
          },
          {
            prop: '',
            label: 'val2tag',
            type: 'val2tag',
            attrs: {
              width: '250'
            },
            options: [
              {
                prop: 'status',
                value: ['1'],
                label: '已买',
                attrs: {
                  type: 'info'
                },
                onClick($index, row) {}
              },
              {
                prop: 'status',
                value: ['2'],
                label: '再次购买',
                attrs: {
                  type: 'primary'
                },
                onClick($index, row) {}
              }
            ]
          },
          {
            prop: '',
            label: 'val2btn',
            type: 'val2btn',
            attrs: {
              width: '250'
            },
            options: [
              {
                prop: 'status',
                value: ['1'],
                label: '已买',
                attrs: {
                  type: 'info'
                },
                onClick($index, row) {}
              },
              {
                prop: 'status',
                value: ['1'],
                label: '再次购买',
                attrs: {
                  type: 'primary'
                },
                onClick($index, row) {}
              },
              {
                prop: 'status',
                value: ['1'],
                label: '评价',
                attrs: {
                  type: 'warning'
                },
                onClick($index, row) {}
              },
              {
                prop: 'status',
                value: ['2'],
                label: '未购买,点击购买',
                attrs: {
                  type: 'danger'
                },
                onClick($index, row) {}
              }
            ]
          },
          {
            prop: 'photo',
            label: 'photo',
            type: 'photo',
            attrs: {
              width: '200'
            },
            photoWidth: 40,
            photoHeight: 40
          },
          {
            prop: 'tags',
            label: 'tags',
            type: 'tags',
            attrs: {
              width: '280'
            },
            options: [
              {
                value: '1',
                label: 'web'
              },
              {
                value: '2',
                label: 'phone'
              },
              {
                value: '3',
                label: '超级手机'
              },
              {
                value: '4',
                label: 'pad'
              }
            ]
          },
          {
            prop: 'datetime',
            label: 'datetime',
            type: 'datetime',
            attrs: {
              width: '160'
            }
          },
          {
            prop: 'progress',
            label: 'customFilter',
            type: 'customFilter',
            attrs: {
              width: '110'
            },
            filter(val, row) {
              return `<h3 style="text-align: center;">${val}%</h3>`
            }
          },
          {
            prop: 'progress',
            label: 'progress',
            type: 'progress',
            attrs: {
              width: '150'
            }
          }
        ]
      }
    }
  },
  methods: {
    onslotClick(scope) {
      console.log('scope.$index', scope.$index)
      console.log('scope.row', scope.row)
    },
    onSubmit() {
      console.log('234', 234)
      this.$refs.demoForm.validate(valid => {
        if (!valid) {
          console.log('noValid')
          return
        }
        console.log('this.form.props', this.form.props)
      })
    },
    onReset() {
      console.log('456', 456)
      this.$refs.demoForm.reset()
    },
    handleCheckChange() {
      console.log('----------------')
      console.log(this.$refs.tree.getCheckedKeys(true))
      console.log('----------------')
    }
  }
}
</script>
