<script>
import down_left_bg from 's/images/down_left_bg.png';
import down_right_bg from 's/images/down_right_bg.png';
import down from 's/images/qr_code/download.png';

export default {
	name: 'down',
	props: {
		rightShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			down_left_bg,
			down_right_bg,
			down,
			dia_show: false,
			dia_type: 'qidai'
		}
	},
	methods:{
		openDia(type) {
			this.$emit('open');
		}
	}
}

</script>
<template>
	<div class="down">
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<div class="left" :style="{backgroundImage:`url(${down_left_bg})`}">
			<img :src="down" alt="">
			<div class="down_word">
				<p @click="openDia('qidai')"><i class="icon-ios" />IOS下载</p>
				<p @click="openDia('qidai')"><i class="icon-anzhuo" />安卓下载</p>
			</div>
		</div>
		<div v-if='rightShow' @click="openDia('qidai')" class="right" :style="{backgroundImage:`url(${down_right_bg})`}">
			领取礼包
		</div>
	</div>
</template>
<style lang='less'>
.down {
	position: relative;
	z-index: 1;
	width: 1240px;
	margin: auto;
	height: 180px;
	display: flex;
	justify-content: flex-end;
	.left,
	.right {
		background-size: 100% 100%;
		height: 100%;
		display: flex;
		box-sizing: border-box;
		align-items: center;
	}
	.left {
		width: 290px;
		padding: 20px 30px;
		padding-right: 0;
		img {
			width: 90px;
		}
		.down_word {
			padding: 0 10px;
			flex: 1;
		}
		p {
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24px;
			line-height: 1;
			padding: 10px 0;
			color: #000;
			[class^="icon-"],
			[class*=" icon-"] {
				font-size: 24px;
			}
			&:first-of-type {
				border-bottom: 2px solid #69390e
			}
		}
	}
	.right {
		padding: 0 10px;
		font-size: 24px;
		width: 65px;
		background-position: center top;
		color: #000;
		cursor: pointer;
	}
}

</style>
