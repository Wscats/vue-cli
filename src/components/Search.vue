<template>
  <div :class="['weui-search-bar', {'weui-search-bar_focusing':isFocus}]" id="searchBar">
    <form class="weui-search-bar__form">
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input
          v-model="searchValue"
          ref="inputElement"
          type="search"
          class="weui-search-bar__input"
          id="searchInput"
          placeholder="搜索"
          required
        />
        <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
      </div>
      <label @click="toggle" class="weui-search-bar__label" id="searchText">
        <i class="weui-icon-search"></i>
        <span>搜索</span>
      </label>
    </form>
    <a @click="toggle" href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
  </div>
</template>
<script>
import { reactive, toRefs, watch } from "@vue/composition-api";
import store from "../stores";
export default {
  // setup相当于2.x版本的beforeCreate生命周期
  setup() {
    // reactive() 函数接收一个普通对象，返回一个响应式的数据对象
    const state = reactive({
      searchValue: "",
      // 搜索框两个状态，聚焦和非聚焦
      isFocus: false,
      inputElement: null
    });
    // 切换搜索框状态的方法
    const toggle = () => {
      // 让点击搜索后出现的输入框自动聚焦
      state.inputElement.focus();
      state.isFocus = !state.isFocus;
    };
    // 监听搜索框的值
    watch(
      () => {
        return state.searchValue;
      },
      () => {
        // 存储输入框到状态 store 中心，用于组件通信
        store.setSearchValue(state.searchValue);
      }
    );
    return {
      // 将 state 上的每个属性，都转化为 ref 形式的响应式数据
      ...toRefs(state),
      toggle
    };
  }
};
</script>