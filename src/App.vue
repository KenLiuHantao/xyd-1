<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, 'iconfont', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	overflow:hidden;
}

</style>
<template>
	<div id="app" :style='{"min-width":`${min_width}`}'>
		<contact v-if='contactShow' />
		<wap-header v-else/>
		<router-view/>
	</div>
</template>
<script>
export default {
	name: 'App',
	mounted() {
		let to = this.$route;
		if (to.path.match('wap')) {
			this.contactShow = false;
			this.min_width = 'auto';
		} else {
			this.contactShow = true;
			this.min_width = '1100px';
		}
	},
	data() {
		return {
			contactShow: false,
			min_width: '1100px'
		}
	},
	watch: {
		'$route' (to, from) {
			if (to.path.match('wap')) {
				this.contactShow = false;
				this.min_width = 'auto';
			} else {
				this.contactShow = true;
				this.min_width = '1100px';
			}
		}
	}
}

</script>
