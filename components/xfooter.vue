<!--html-->
<template>
	<div>
		<p>yi</p>
		<p>yao</p>
		<ul>
			<li>lan <span>{{skill}}</span></li>
			<li>xie <span>{{skill}}</span></li>
		</ul>
		<button @click="test()">Ok</button>
		<xchild></xchild>
	</div>
</template>
<!--js-->
<script>
	var xchild = require('./xchild.vue')
	module.exports = {
		props:['name'],
		data: function() {
			return {
				skill: 'ps'
			}
		},
		methods: {
			test: function() {
				console.log(this.skill)
			}
		},
		components:{
			xchild:xchild
		},
		mounted:function(){
			console.log(this.name)
		}
	}
</script>
<!--css-->
<style>
	p {
		color: red;
	}
</style>