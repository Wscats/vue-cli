# Quick Start

本项目综合运用了 Vue3.0 的新特性，适合新手学习😁

- 基于`Composition API`即`Function-based AP`I进行改造，优先体验 Vue3 特性
- 使用单例对象进行组件通信
- 使用 axios 库进行网络请求，weui 库实现 UI 界面

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build
```

建议配合 Visual Studio Code 和 [Vue Snippets](https://github.com/Wscats/vue-snippets) 代码插件

# Dependencies

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

下载了 `@vue/composition-api` 插件以后，按照文档在 main.js 引用便开启了 Composition API 的能力。
```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)

new Vue({
  render: h => h(App),
}).$mount('#app')
```
回到 `App.vue`，从 `@vue/composition-api` 插件引入 `{ reactive, computed }` 两个函数：

```js
import { reactive, computed } from '@vue/composition-api'
```

仅保留 `components: { ... }` 选项，删除其他的，然后写入 `setup()` 函数：

```js
export default {
  components: { ... },
  setup () {}
}
```
接下来，我们将会在 setup() 函数里面重写之前的逻辑。

首先定义数据。
```js
setup() {
  const data = reactive({
    name: "Eno Yao"
  });
  return data;
}
```

在 `setup()` 函数里，我们定义一个响应式的 data 对象，类似于 2.x 风格下的 `data()` 配置项。

```js
<template>
  <div>
    <p>{{name}}</p>
    <p>{{fullName}}</p>
  </div>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";
export default {
  setup() {
    const data = reactive({
      todoList: [],
      name: "Yao",
      fullName: computed(() => {
        return `Eno ${data.name}`;
      })
    });
    return data;
  }
};
</script>
```

生命周期函数

```js
setup() {
  onMounted(() => {
    window.console.log("mounted被触发");
  });
}
```

增加方法和响应式
```html
<template>
  <div>
    <p>{{name}}</p>
    <p>{{fullName}}</p>
    <button @click="add">ok</button>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from "@vue/composition-api";
export default {
  setup() {
    const data = reactive({
      name: "Yao",
      fullName: computed(() => {
        return `Eno ${data.name}`;
      })
    });
    onMounted(() => {
      window.console.log("mounted被触发");
    });
    const add = () => {
      data.name = "Yo";
      window.console.log("add被触发", data);
    };
    return {
      // 这里使用了 toRefs() 给 data 对象包装了一下，是为了让它的数据保持响应式的
      ...toRefs(data),
      add
    };
  }
};
</script>
```

# License

Copyright(C) 2019, [Vue Cli](https://github.com/Wscats/vue-cli) is released under the [MIT](http://opensource.org/licenses/MIT).