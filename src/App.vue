<template>
  <div id="app">
    <Header title="Cnode客户端" color="red" />
    <Search />
    <Panel />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Search from "./components/Search.vue";
import Panel from "./components/Panel.vue";
export default {
  name: "app",
  components: {
    Header,
    Search,
    Panel
  }
};
</script>
