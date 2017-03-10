<template>
	<div>
		<div>{{name}}</div>
		<input v-model="name" />
		<button @click="setFe()">setFe</button>
		<p>老蓝和老谢在此切图{{fe}}</p>
		<router-link to="/foo/a/1">Go to a</router-link>
		<router-link to="/foo/b/2">Go to b</router-link>
		<router-view></router-view>
		<abc></abc>
	</div>
</template>
<script>
	import abc from "./abc.vue";
	module.exports = {
		data: function() {
			return {
				name: 'foo'
			}
		},
		computed: {
			//this.$http
			//this.$store
			//this.$route
			fe: function() {
				return this.$store.state.name
			}
		},
		methods: {
			setFe: function() {
				this.$store.commit("set_fe", this.name)
			},
			getData: function() {
				this.$http.jsonp("http://localhost:81/angular/0309/webpack-vue/newsts.php", {
					params: {
						callback: "JSON_CALLBACK"
					}
				}).then(function(data) {
					console.log(data)
				}, function(err) {
					console.log(err)
				})
			}
		},
		components:{
			abc:abc
		},
		mounted: function() {
			this.getData()
		}
	}
</script>
<style scoped lang="sass">
	$color:"blue";
	$size:"18px";
	p {
		color: $color;
		font-size: $size;
	}
</style>