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
  // setup() is equivalent to beforeCreate lifecycle in Vue 2.x
  setup() {
    // reactive() takes a plain object and returns a reactive data object
    const state = reactive({
      searchValue: "",
      // Search bar states: focused and unfocused
      isFocus: false,
      inputElement: null
    });
    // Toggle search bar focus state
    const toggle = () => {
      // Auto-focus the input when search is activated
      state.inputElement.focus();
      state.isFocus = !state.isFocus;
    };
    // Watch search input value
    watch(
      () => {
        return state.searchValue;
      },
      () => {
        // Store search value in centralized store for cross-component communication
        store.setSearchValue(state.searchValue);
      }
    );
    return {
      // Convert each state property to ref for reactivity
      ...toRefs(state),
      toggle
    };
  }
};
</script>