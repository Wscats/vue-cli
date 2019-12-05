<template>
  <div>
    <div :class="['weui-search-bar', {'weui-search-bar_focusing':isFocus}]" id="searchBar">
      <form class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input
          :name="searchValue"
            v-model="searchValue"
            type="search"
            class="weui-search-bar__input"
            id="searchInput"
            placeholder="搜索"
            required
          />
          <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
        </div>
        <label class="weui-search-bar__label" id="searchText">
          <i class="weui-icon-search"></i>
          <span>搜索</span>
        </label>
      </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
    </div>
    <p v-text="searchValue"></p>
  </div>
</template>
<script>
import { reactive, toRefs } from "@vue/composition-api";
export default {
  setup() {
    const state = reactive({
      searchValue: "",
      isFocus: true,
    });
    return {
      ...toRefs(state),
    };
  }
};
</script>