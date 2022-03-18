<template>
  <div class="gyl-form-view gyl-with-footer">
    <!-- title -->
    <h2 class="gyl-title"><i class="el-icon-s-order" />公用标题样式</h2>
    <!-- 公用表单 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="114px">
      <el-row>
        <el-col :xs="24" :sm="12" :lg="8">
          <el-form-item label="创建名称" prop="name">
            <el-select v-model="form.name" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <el-form-item label="创建方式" prop="cgType">
            <el-select v-model="form.cgType" placeholder="请选择">
              <el-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <el-form-item label="客群状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <el-form-item label="创建人ERP" prop="createPin">
            <el-input v-model="form.createPin" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <el-form-item label="创建人部门" prop="createDept">
            <el-select v-model="form.createDept" placeholder="请选择">
              <el-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item class="gyl-form-btn-wrap">
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button type="primary" @click="submitForm('form')">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 外部图标引用 -->
    <div class="view-demo">夸克图标使用案例<span class="svgfont fop-caozuo_xiazai" /></div>
    <!-- 公用帮助提示help -->
    <div class="view-demo">
      <div class="gyl-help lh32">
        公用文案提示
        <el-tooltip effect="dark" content="Top Left 提示文字" placement="top-start" offset="30">
          <i class="el-icon-help gyl-help" />
        </el-tooltip>
      </div>
    </div>
    <!-- 公用强调提示 -->
    <div class="view-demo">
      <div class="gyl-label">公用强调提示：请小伙伴们按规范些代码</div>
      <div class="gyl-label lh32">
        <span class="c-666">模拟el-form表单强调：</span>
        请小伙伴们按规范些代码
      </div>
    </div>
    <!-- 公用字大小 -->
    <div class="view-demo">
      <span class="f10">10像素</span>
    </div>
    <!-- 公用颜色 -->
    <div class="view-demo">
      <span class="c-333">#333</span>
      <span class="c-666">#666</span>
      <span class="c-999">#999</span>
      <span class="c-primary">根据皮肤获取的页面主色</span>
      <span class="c-warning">#ffb600</span>
      <span class="c-danger">#E1251B</span>
      <span class="c-success">#26A872</span>
    </div>
    <!-- 字体加粗 -->
    <div class="view-demo">
      <span class="fb">公用加粗</span>
    </div>
    <!-- 省略 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="view-demo-border">
          <p class="te4">
            4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略4行省略
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="view-demo-border">
          <p class="te3">3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略3行省略</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="view-demo-border">
          <p class="te2">2行省略2行省略2行省略2行省略2行省略2行省略2行省略2行省略2行省略2行省略</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="view-demo-border">
          <p class="te">单行省略单行省略单行省略单行省略单行省略</p>
        </div>
      </el-col>
    </el-row>
    <!-- 文本的水平对齐方式具有可继承性的性质实现布局 -->
    <div class="view-demo-block">
      <h2 class="gyl-tit">文本的水平对齐方式具有可继承性的性质实现布局</h2>
      <el-row :gutter="20">
        <!-- text-align:center可继承 -->
        <el-col :span="6">
          <div class="view-demo-border txt-center">
            <h3>继承父级居中</h3>
            <el-image style="width: 100px; height: 100px; margin: 10px auto" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" />
            <p class="dlk-inline txt-left">先让行内块元素居中，然后让行内块里的文字居左。就可实现单行居中，多行居左</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="view-demo-border t-right">
            <el-button>取消</el-button>
            <el-button type="primary">查看</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 浮动布局 -->
    <div class="view-demo-block">
      <h2 class="gyl-tit">浮动布局</h2>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="view-demo-border cf">
            <el-image class="fl" style="width: 32px; height: 32px; border-radius: 50%" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" />
            <p class="ml40">图片浮动居左，内容margin-left补齐图片居左的位置</p>
          </div>
          <div class="view-demo-border cf">
            <el-image class="fl" style="width: 30px; height: 30px; border-radius: 50%" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" />
            <div class="ml40">
              <h2 class="te">有标题的样子</h2>
              <p class="c-666 mt5">图片浮动居左，内容margin-left补齐图片居左的位置</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="view-demo-border cf">
            <el-image class="fr" style="width: 32px; height: 32px; border-radius: 50%" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" />
            <p class="mr40">图片浮动居右，内容margin-right补齐图片居右的位置</p>
          </div>
          <div class="view-demo-border cf">
            <el-image class="fr" style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" />
            <div class="mr110">
              <h2 class="lh32 te">有标题的样子</h2>
              <p class="c-666 mt5">图片浮动居右，内容margin-right补齐图片居右的位置</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="view-demo-border lh32 cf">
            <div class="gyl-help fl">
              左右浮动布局
              <el-tooltip effect="dark" content="Top Left 提示文字" placement="top-start" offset="30">
                <i class="el-icon-help gyl-help" />
              </el-tooltip>
            </div>
            <el-button type="primary" class="fr">查看</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 相对定位&绝对定位 -->
    <div class="view-demo-block">
      <h2 class="gyl-tit">相对定位&绝对定位</h2>
      <p class="gyl-label mb10">left和bottom的优先级高于right和top</p>
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="view-demo-border rel" style="height: 70px">
            <el-tag class="v-center" style="left: 10px">垂直居中</el-tag>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="view-demo-border rel" style="height: 70px">
            <el-tag class="h-center" style="top: 10px">水平居中</el-tag>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="view-demo-border rel" style="height: 70px">
            <el-tag class="vh-center">水平垂直居中</el-tag>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="view-demo-border rel" style="height: 70px">
            <el-tag class="abs" style="top: 10px; left: 10px">自调左上</el-tag>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="view-demo-border rel" style="height: 70px">
            <el-tag class="abs" style="top: 10px; right: 10px">自调右上</el-tag>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="view-demo-border rel" style="height: 70px">
            <el-tag class="abs" style="bottom: 10px; left: 10px">自调左下</el-tag>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="view-demo-border rel" style="height: 70px">
            <el-tag class="abs" style="right: 10px; bottom: 10px">自调右下</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="view-demo-border rel">
            <el-image class="v-center" style="left: 10px; width: 32px; height: 32px; border-radius: 50%" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" />
            <p class="ml40">图片垂直居中</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 固定在底部按钮 -->
    <div class="gyl-footer-bar txt-right">
      <span class="c-danger mlr10">保存后将再次计算客群信息</span>
      <el-button>另存为</el-button>
      <el-button type="primary">保存</el-button>
      <el-button>返回</el-button>
      <el-button>取消</el-button>
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtmlStyleHome',
  data() {
    return {
      options: [
        {
          val: '1',
          label: '选项一'
        },
        {
          val: '2',
          label: '选项二'
        },
        {
          val: '3',
          label: '选项三'
        }
      ],
      form: {
        name: '', // 客群名称
        cgType: '', // 客群类型(创建方式)
        status: '', // 客群状态
        createPin: '', // 创建人erp
        createDept: '' // 创建人部门
      },
      rules: {
        name: [
          { required: true, message: '请输入创建名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ml40 {
  margin-left: 40px;
}

.mr40 {
  margin-right: 40px;
}

.mr110 {
  margin-right: 110px;
}

.view-demo {
  margin: 10px;

  & > span {
    margin: 0 10px;
  }
}

.view-demo-block {
  margin-top: 20px;
}

.view-demo-border {
  margin-bottom: 10px;
  padding: 16px;
  border: 1px solid #eaeaea;
}
</style>
