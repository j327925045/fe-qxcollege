<template>
  <ul class="timeline-list">
    <li class="day">
      <div class="date">2020.11.10 18:00:26</div>
      <div class="sliver" />
      <div class="status">
        <p class="title">已完成配送，感谢您，欢迎您再次光临！客服电话</p>
        <ul class="subinfo">
          <li>一级状态：完成</li>
          <li>二级状态：妥投</li>
          <li>操作人：胡丽丽</li>
          <li>操作系统：大件承运系统</li>
        </ul>
      </div>
    </li>
    <li>
      <div class="date">18:00:26</div>
      <div class="sliver" />
      <div class="status">
        <p class="title">已完成配送，感谢您，欢迎您再次光临！客服电话</p>
        <ul class="subinfo">
          <li>一级状态：完成</li>
          <li>二级状态：妥投</li>
          <li>操作单位：贵阳大件分拣中心</li>
          <li>操作系统：大件承运系统</li>
        </ul>
      </div>
    </li>
    <li class="day">
      <div class="date">2020.11.10 18:00:26</div>
      <div class="sliver" />
      <div class="status">
        <p class="title">上车扫描，送往贵州贵阳市观山湖区站点途中</p>
        <ul class="subinfo">
          <li>一级状态：完成</li>
          <li>二级状态：妥投</li>
          <li>操作人：胡丽丽</li>
          <li>操作系统：大件承运系统</li>
        </ul>
      </div>
    </li>
    <li>
      <div class="date">18:00:26</div>
      <div class="sliver" />
      <div class="status">
        <p class="title">WMS目的阶段已发货</p>
        <ul class="subinfo">
          <li>一级状态：完成</li>
          <li>二级状态：妥投</li>
          <li>操作人：胡丽丽</li>
          <li>操作系统：大件承运系统</li>
        </ul>
      </div>
    </li>
    <li>
      <div class="date">18:00:26</div>
      <div class="sliver" />
      <div class="status">
        <p class="title">您的订单已经安排车辆，预计2020-11-02送达</p>
        <ul class="subinfo">
          <li>一级状态：完成</li>
          <li>二级状态：妥投</li>
          <li>操作单位：贵阳大件分拣中心</li>
          <li>操作人：胡丽丽</li>
          <li>操作系统：大件承运系统</li>
        </ul>
      </div>
    </li>
    <li>
      <div class="date">18:00:26</div>
      <div class="sliver" />
      <div class="status">
        <p class="title">接收订单成功</p>
        <ul class="subinfo">
          <li>一级状态：完成</li>
          <li>二级状态：妥投</li>
          <li>操作人：胡丽丽</li>
          <li>操作系统：大件承运系统</li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Timeline1'
}
</script>

<style lang="scss" scoped>
.timeline-list {
  padding: 20px;
  background-color: #f1f4f9;

  & > li {
    display: flex;
    height: 64px;

    & > .date {
      flex: 0 0 130px;
      width: 130px;
      margin-top: -2px;
      text-align: right;
    }

    & > .sliver {
      position: relative;
      flex: 0 0 38px;
      width: 38px;

      &::before {
        position: absolute;
        top: 4px;
        left: 14px;
        z-index: 3;
        display: block;
        box-sizing: content-box;
        width: 8px;
        height: 8px;
        background: #ced5e7;
        border: none;
        border-radius: 50%;
        content: '';
      }

      &::after {
        position: absolute;
        top: 4px;
        left: 18px;
        z-index: 1;
        display: block;
        width: 1px;
        height: 100%;
        background-color: #e4e9f0;
        content: '';
      }
    }

    & > .status {
      flex: 0 0 1;
      margin-top: -2px;

      & > .title {
        height: 20px;
        overflow: hidden;
        color: #333;
        font: 700 14px/20px sans-serif;
      }

      & > .subinfo {
        height: 20px;
        margin-top: 8px;
        overflow: hidden;
      }
    }

    &:last-child {
      height: 54px;

      & > .sliver::after {
        display: none;
      }
    }

    &.day {
      & > .sliver {
        &::before {
          top: 0;
          left: 10px;
          background: #3c6ef0;
          border: 4px solid #cad4f0;
        }
      }
    }
  }

  .subinfo {
    & > li {
      float: left;
      color: #666;
      font: normal 500 14px/20px sans-serif;

      &::after {
        margin: 0 10px;
        color: #d0d7e1;
        content: '|';
      }
    }

    & > li:last-child {
      &::after {
        display: none;
      }
    }
  }
}
</style>
