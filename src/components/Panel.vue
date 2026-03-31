<template>
  <div class="weui-panel weui-panel_access">
    <div v-for="(n,index) in newsComputed" :key="index" class="weui-panel__bd">
      <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" :src="n.author.avatar_url" alt />
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-text="n.title"></h4>
          <p class="weui-media-box__desc" v-text="n.author.loginname"></p>
        </div>
      </a>
    </div>
    <div @click="loadMore" class="weui-panel__ft">
      <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
        <div class="weui-cell__bd">查看更多</div>
        <span class="weui-cell__ft"></span>
      </a>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted, computed } from "@vue/composition-api";
import axios from "axios";
import store from "../stores";
export default {
  setup() {
    const state = reactive({
      // Page number
      page: 1,
      // List data
      news: [],
      // Filtered list based on search value
      newsComputed: computed(() => {
        // Return filtered news if search value exists, otherwise return all
        if (store.state.searchValue) {
          return state.news.filter(item => {
            if (item.title.indexOf(store.state.searchValue) >= 0) {
              return item;
            }
          });
        } else {
          return state.news;
        }
      }),
      searchValue: store.state
    });
    // Fetch list data via API
    const loadMore = async () => {
      const data = await axios.get("https://cnodejs.org/api/v1/topics", {
        params: {
          // Topics per page
          limit: 10,
          // Page number
          page: state.page
        }
      });
      // Increment page number
      state.page += 1;
      state.news = [...state.news, ...data.data.data];
    };
    onMounted(() => {
      // Load initial data on mount
      loadMore();
    });
    return {
      // Keep data reactive
      ...toRefs(state),
      // Load more event handler
      loadMore
    };
  }
};
</script>