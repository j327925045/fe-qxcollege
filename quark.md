Lui图标使用
=================  
[lui图标使用地址链接](http://lui.jd.com/#/zh-CN/component/icon)  

**注意：**优先使用lui的图标库，lui图标不够用时可在夸克新建自己项目的图标库

夸克图标使用
=================  
[夸克地址链接](http://quark.jd.com)  
[夸克图标使用指南地址链接](http://quark.jd.com/help/?key=develop-icon)

上传图标步骤
-----------------
1. 新建图标库
![RUNOOB 图标](http://m.360buyimg.com/marketingminiapp/jfs/t1/111123/29/14358/64114/5f2cc0e4Ed27c9441/839be5499894ac0d.jpg "新建图标库流程图")
2. 编辑图标库
![RUNOOB 图标](http://m.360buyimg.com/marketingminiapp/jfs/t1/112423/37/14216/495703/5f2d2460E2a6067e3/9120667283881a92.jpg "编辑图标库")

项目中使用图标步骤
-----------------
* 推介使用font-class（即class类名）引用
![RUNOOB 图标](http://m.360buyimg.com/marketingminiapp/jfs/t1/123854/19/9132/108166/5f2d213dEa9079ab6/feb43605bf2cb332.jpg "class类名引用字体图标")

* 下载代码包，存到本地，存放路径如下图
![RUNOOB 图标](http://m.360buyimg.com/marketingminiapp/jfs/t1/137224/32/6223/422740/5f2d2e19E3cb175e5/fa71829b8fa5fc4b.jpg "字体图标存放路径方式1")
![RUNOOB 图标](http://m.360buyimg.com/marketingminiapp/jfs/t1/138470/38/4870/349746/5f2d2164E9a39287c/6dd5ba3d4dd208a1.jpg "字体图标存放路径方式2")

* 页面中引用
```html
// class="fontFamilyClass命名的名字 字体图标的名字"
// 以上传图标步骤2中编辑图标库里命名的名字为例展示如下
<div class="iconfont quark-edit"></div>
```
**注意：** 若在2020/08/08之前下载的PC框架，框架路径pc-template-vue/src/components/common/Aside/Item.vue中需按如下方式修改字体图标的引用方式后，侧边栏的字体图标方可使用class的方式引用图标
```js
if (icon) {
  vnodes.push(<i class={`${'sidebar-icon' + ' '}${icon}`}/>)
}
```
