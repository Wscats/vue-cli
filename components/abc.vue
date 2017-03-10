<!--html css-->
<script>
	module.exports = {
		data: function() {
			return {
				name: 'yao'
			}
		},
		//virtual dom
		render: function(createElement) {
			var abc = 1
			return createElement('h'+abc, {
				"class": "abcd"
			}, [
				createElement('p', {
					attrs: {
						id: 'foo'
					},
				}, 'hello')
			])
		},
		methods: {}
	}
</script>