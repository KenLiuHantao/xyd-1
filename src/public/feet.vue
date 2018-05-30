<script>
export default {
	props: {
		type: {
			type: String,
			default: 'transparent'
		},
		ispc: {
			type: Boolean,
			default: true
		}
	},
	name: 'feet',
	computed: {
		name() {
			let cl = '';
			cl += this.type === '#000' ? 'dark' : 'white';
			cl += this.ispc ? '' : ' f_wap';
			return cl;
		}
	}
}

</script>
<template>
	<div class="feet flex" :class='name' :style="{backgroundColor:`${type}`}">
		<p>版权所有北京飞流九天科技有限公司 2009-2013 京ICP证101164号 京ICP备09095411号</p>
		<p>京公网安备 11010102001851号</p>
		<p>新广出审[2017]1239号 ISBN 978-7-7979-4798-5 文网游备字〔2016〕Ｍ-SLG 0905 号</p>
		<p>京网文[2015]0646-276号 增值电信业务经营许可证：京B2-20100093</p>
	</div>
</template>
<style lang="less">
.feet {
	flex-direction: column;
	position: relative;
	z-index: 1;
	padding: 40px 0;
	background-repeat: no-repeat;
	background-position: bottom;
	background-size: 100%;
	&.f_wap {
		padding: .3rem .5rem;
		height: 1.5rem;
		p {
			line-height: 1.5;
			font-size: .16rem;
		}
	}
	&.dark p {
		color: #fff;
	}
	p {
		width: 100%;
		line-height: 20px;
		font-size: 14px;
		font-weight: bold;
	}
}

</style>
