<template>
  <div class="gyl-view">
    <h2 class="gyl-title">flex布局</h2>
    <a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" class="c-primary">flex布局</a>
    <div>
      <h3 class="mt10">类名简介</h3>
      <ul>
        <li class="gyl-label"><span class="c-primary">fbox：</span>定义布局为盒模型</li>
        <li class="gyl-label"><span class="c-primary">flex1：</span>子元素占据剩余的空间</li>
        <li class="gyl-label"><span class="c-primary">hbox：</span>盒模型--水平布局 不折行</li>
        <li class="gyl-label"><span class="c-primary">whbox：</span>盒模型--水平布局 且折行</li>
        <li class="gyl-label"><span class="c-primary">vhbox：</span>盒模型--垂直布局</li>
        <li class="gyl-label"><span class="c-primary">vbox：</span>子元素--水平居中</li>
        <li class="gyl-label"><span class="c-primary">cbox：</span>子元素--垂直居中</li>
        <li class="gyl-label"><span class="c-primary">cwbox：</span>子元素--水平垂直居中(左右 多元素居中)</li>
        <li class="gyl-label"><span class="c-primary">vcbox：</span>子元素--垂直水平居中(上下 多元素居中)</li>
        <li class="gyl-label"><span class="c-primary">jbox：</span>子元素--两端对齐</li>
        <li class="gyl-label"><span class="c-primary">jcbox：</span>子元素--垂直居中且两端对齐</li>
        <li class="gyl-label"><span class="c-primary">jwcbox：</span>子元素--垂直居中且两端对齐 且折行 最后一行两端对齐</li>
        <li class="gyl-label"><span class="c-primary">jlcbox：</span>子元素--垂直居中且两端对齐 且折行 最后一行居左对齐</li>
      </ul>
    </div>
    <div class="mt20">
      <h2 class="tit">子元素占据剩余的空间</h2>
      <div class="view-demo-outer fbox">
        <el-tag>子元素占据剩余的空间</el-tag>
        <div class="bg-primary ml10 flex1" />
      </div>
    </div>
    <div class="mt20">
      <h2 class="tit">水平布局 / 垂直布局</h2>
      <div>
        <h3 class="sub-tit">盒模型--水平布局 折行</h3>
        <div class="view-demo-outer whbox">
          <div class="bg-gery">水平布局</div>
          <div class="bg-gery">水平布局且折行</div>
          <div class="bg-gery">flex 水平布局且折行</div>
          <div class="bg-gery">flex 水平布局且折行且折行</div>
          <div class="bg-gery">flex 水平布局且折行且折行且折行</div>
          <div class="bg-gery">flex 水平布局且折行且折行且折行且折行</div>
          <div class="bg-gery">flex 水平布局且折行且折行且折行</div>
          <div class="bg-gery">flex 水平布局且折行且折行</div>
        </div>
      </div>
      <div>
        <h3 class="sub-tit">盒模型--垂直布局</h3>
        <div class="view-demo-outer vhbox">
          <span class="bg-gery">垂直布局</span>
          <span class="bg-gery">垂直布局</span>
        </div>
      </div>
    </div>
    <div class="mt20">
      <h2 class="tit">水平居中 / 垂直居中 / 水平垂直居中 /垂直水平居中</h2>
      <el-row :gutter="20">
        <el-col :span="6">
          <h3 class="sub-tit">子元素--水平居中</h3>
          <div class="view-demo-outer vbox" style="height: 150px">
            <div class="bg-gery">水平居中</div>
            <div class="bg-gery">水平居中</div>
          </div>
        </el-col>
        <el-col :span="6">
          <h3 class="sub-tit">子元素--垂直居中</h3>
          <div class="view-demo-outer cbox" style="height: 150px">
            <div class="bg-gery">垂直居中</div>
            <div class="bg-gery">垂直居中</div>
          </div>
        </el-col>
        <el-col :span="6">
          <h3 class="sub-tit">子元素--水平垂直居中(左右 多元素居中)</h3>
          <div class="view-demo-outer cwbox" style="height: 150px">
            <div class="bg-gery">水平垂直居中</div>
            <div class="bg-gery">水平垂直居中</div>
          </div>
        </el-col>
        <el-col :span="6">
          <h3 class="sub-tit">子元素--垂直水平居中(上下 多元素居中)</h3>
          <div class="view-demo-outer vcbox" style="height: 150px">
            <div class="bg-gery">垂直水平居中</div>
            <div class="bg-gery">垂直水平居中</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="mt20">
      <h2 class="tit">两端对齐布局</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="8">
          <h3 class="sub-tit">子元素--两端对齐</h3>
          <div class="view-demo-outer jbox" style="height: 150px">
            <div class="bg-gery">两端对齐</div>
            <div class="bg-gery">两端对齐</div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <h3 class="sub-tit">子元素--垂直居中且两端对齐</h3>
          <div class="view-demo-outer jcbox" style="height: 150px">
            <div class="bg-gery">垂直居中</div>
            <div class="bg-gery">且两端对齐</div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :xs="24" :sm="12" :lg="8">
          <h3 class="sub-tit">子元素--垂直居中且两端对齐 且折行 最后一行两端对齐</h3>
          <div class="view-demo-outer jwcbox" style="height: 150px">
            <div class="bg-gery">垂直居中</div>
            <div class="bg-gery">且两端对齐</div>
            <div class="bg-gery">且折行</div>
            <div class="bg-gery">最后一行两端对齐</div>
            <div class="bg-gery">最后一行</div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <h3 class="sub-tit">子元素--垂直居中且两端对齐 且折行 最后一行居左对齐</h3>
          <div class="view-demo-outer jlcbox" style="height: 150px">
            <div class="bg-gery">垂直居中</div>
            <div class="bg-gery">且两端对齐</div>
            <div class="bg-gery">且折行</div>
            <div class="bg-gery">最后一行两端对齐</div>
            <div class="bg-gery">最后一行</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtmlStyleFlex'
}
</script>

<style lang="scss" scoped>
.mb20 {
  margin-bottom: 20px;
}

.tit {
  margin: 20px 0 10px;
  font-weight: 600;
  font-size: 16px;
}

.sub-tit {
  margin: 15px 0 10px;
  font-weight: 600;
}

.view-demo-outer {
  width: 100%;
  padding: 16px;
  border: 1px solid #eaeaea;
}

.view-demo-box {
  padding: 16px;
  border: 1px solid #eaeaea;
}

.bg-primary {
  height: 32px;
  background: #f5f5f5;
}

.bg-gery {
  margin: 10px;
  padding: 10px;
  background: #f5f5f5;
}
</style>
