//1.单文件的组件 首先创建一个.vue后缀的文件
//2.在主模块引入此组件并注册使用
//3.在命令行安装vue-loader并在webpack.config.js配置vue-loader
//4.安装vue-template-compiler
//5.执行webpack打包
//npm install vue
//babel es6
//var Vue = require("vue");
//引入路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'
//必须要通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
	//状态，也就是保存数据的地方
	state:{
		name:'xie&lan',
	},
	mutations:{
		//font-end
		set_fe:function(state,data){
			state.name = data
		}
	}
})

/*const Foo = {
	template: '<div>foo</div>'
}*/
var Foo = require('./components/foo.vue');
var Bar = require('./components/bar.vue');
var UserProfile = {
	template:'<p>{{name}}</p>',
	data(){
		return {
			name:''
		}
	},
	mounted(){
		console.log(this)
		console.log(this.$route.params)
		this.$http.jsonp('http://localhost:81/angular/0309/webpack-vue/test.php',{
			params:{
				callback:"JSON_CALLBACK"
			}
		}).then(function(data){
			console.log(data.data)
			this.name = data.data.name
		},function(){
			
		})
	}
}
var UserPosts = {
	template:'<p>UserPosts</p>',
	mounted:function(){
		console.log(this.$route.params)
	}
}
const router = new VueRouter({
	routes: [{
		path: '/foo',
		component: Foo,
		//路由嵌套
		children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'a/:id',
          component: UserProfile
          //controller+template==components
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'b/:id',
          component: UserPosts
        }
      ]
	}, {
		path: '/bar',
		component: Bar
	}]
})

var xfooter = require("./components/xfooter.vue");
//import Vue from "vue";
//定义一个组件
var xheader = Vue.extend({
	template: require("./template/xheader.html")
})
new Vue({
	//el: '#demo',
	router,
	store
}).$mount('#demo')