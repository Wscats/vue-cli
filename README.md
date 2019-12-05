# Quick Start

本项目综合运用了 Vue3.0 的新特性，适合新手学习😁

- 基于 `Composition API` 即 `Function-based AP` I进行改造，配合 `Vue Cli`，优先体验 Vue3 特性
- 使用单例对象模式进行组件通信
- 使用 axios 库进行网络请求，weui 库实现 UI 界面

```bash
# 安装依赖
npm install

# 在浏览器打开localhost:8080查看页面，并实时热更新
npm run serve

# 发布项目
npm run build
```

建议配合 Visual Studio Code 和 [Vue 3 Snippets](https://github.com/Wscats/vue-snippets) 代码插件食用Ψ(￣∀￣)Ψ。

# Dependencies

以下是项目运用到的依赖，`@vue/composition-api` 配合 `vue` 模块让我们 `Vue2.0` 版本可以抢先体验 `Vue3.0` 的新特性，`axios` 是辅助我们发送网络请求得到数据的工具库，`weui`是一套与微信原生视觉一致的基础样式库，方便我们快速搭建项目页面。

```js
"@vue/composition-api": "^0.3.4",
"axios": "^0.19.0",
"core-js": "^3.4.3",
"vue": "^2.6.10",
"weui": "^2.1.3"
```

# Directory Structure

```js
├── src
│   ├── App.vue                          # 组件入口
│   ├── assets                           # 资源目录
│   ├── stores/index.js                  # 状态管理
│   ├── components                       # 组件目录
│   │   ├── Header.vue                   # 头部组件
│   │   ├── Search.vue                   # 搜索框组件
│   │   ├── Panel.vue                    # 列表组件
│   ├── main.js                          # 项目入口
├── public                               # 模板文件
├── vue.config.js                        # 脚手架配置文件
```


# Composition API

```bash
npm install @vue/composition-api --save
```

使用 `npm` 命令下载了 `@vue/composition-api` 插件以后，``，按照文档在 `main.js` 引用便开启了 `Composition API` 的能力。
```js
// main.js
import Vue from 'vue'
import App from './App.vue'
// Composition API
import VueCompositionApi from '@vue/composition-api'

Vue.config.productionTip = false
// 不要漏了显式调用 VueCompositionApi
Vue.use(VueCompositionApi)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

我们在 `main.js` 中引入 `weui` 的基础样式库，方便我们可以在全局使用微信基础样式构建项目页面：

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
// 全局引入 `weui` 的基础样式库
import 'weui'
import VueCompositionApi from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

回到 `App.vue`，保留 `components` 属性值清空 `<template>` 模板的内容，删除 `<style>` 模板，等待重新引入新的组件。

```html
<template>
  <div id="app">
    Hello World
  </div>
</template>
<script>
export default {
  name: "app",
  components: {}
};
</script>
```
在 `src/components` 目录下新建第一个组件，取名为 `Header.vue` 写入以下代码：

```html
<template>
  <header :style="{
    backgroundColor: color?color:defaultColor
  }">{{title}}</header>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  // 父组件传递进来更改该头部组件的属性值
  props: {
    // 标题
    title: String,
    // 颜色
    color: String
  },
  setup() {
    const state = reactive({
      defaultColor: "red"
    });
    return {
      ...state
    };
  }
};
</script>
<style scoped>
header {
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: white;
}
</style>
```

---

## setup

这里运用了一个全新的属性 `setup` ，这是一个组件的入口，让我们可以运用 `Vue3.0` 新的接口，它运行在组件被实例化时候，`props` 属性被定义之后，实际上等价于 `Vue2.0` 版本的 `beforeCreate` 和 `Created` 这两个生命周期，`setup` 返回的是一个对象，里面的所有被返回的属性值，都会被合并到 `Vue2.0` 的 `render` 渲染函数里面，在单文件组件中，它将配合 `<template>` 模板的内容，完成 `Model` 到 `View` 之间的绑定，在未来版本中应该还会支持返回 `JSX` 代码片段。

```html
<template>
  <!-- View -->
  <div>{{name}}</div>
</template>
<script>
import { reactive } from '@vue/composition-api'
export default {
  setup() {
    const state = reactive({ name: 'Eno Yao' });
    // return 暴露到 template 中
    return {
      // Model
      ...state
    }
  }
}
</script>
```

## reactive

在 `setup` 函数里面， 我们适应了 Vue3.0 的第一个新接口 `reactive` 它主要是处理你的对象让它经过 `Proxy` 的加工变为一个响应式的对象，类似于 `Vue2.0` 版本的 `data` 属性，需要注意的是加工后的对象跟原对象是不相等的，并且加工后的对象属于深度克隆的对象。

```js
const state = reactive({ name: 'Eno Yao' })
```

## props

在 `Vue2.0` 中我们可以使用 `props` 属性值完成父子通信，在这里我们需要定义 `props` 属性去定义接受值的类型，然后我们可以利用 `setup` 的第一个参数获取 `props` 使用。
```js
export default {
  props: {
    // 标题
    title: String,
    // 颜色
    color: String
  },
  setup(props) {
    // 这里可以使用父组件传过来的 props 属性值
  }
};
```

我们在 `App.vue` 里面就可以使用该头部组件，有了上面的 `props` 我们可以根据传进来的值，让这个头部组件呈现不同的状态。
```html
<template>
  <div id="app">
    <!-- 复用组件，并传入 props 值，让组件呈现对应的状态 -->
    <Header title="Eno" color="red" />
    <Header title="Yao" color="blue" />
    <Header title="Wscats" color="yellow" />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
export default {
  name: "app",
  components: {
    Header,
  }
};
</script>
```

---

完成上面的 `Header.vue`

# License

Copyright(C) 2019, [Vue Cli](https://github.com/Wscats/vue-cli) is released under the [MIT](http://opensource.org/licenses/MIT).