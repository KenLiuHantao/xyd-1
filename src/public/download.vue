<script>
import down_left_bg from 's/images/down_left_bg.png';
import down_right_bg from 's/images/down_right_bg.png';
import down from 's/images/qr_code/download.png';
import ios from 's/images/ios.png';
import fenggexian from 's/images/fenggexian.png';
import android from 's/images/android.png';

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
			ios,
			fenggexian,
			android,
			dia_show: false,
			dia_type: 'qidai'
		}
	},
	methods: {
		openDia(type) {
			this.$emit('open');
		}
	}
}

</script>
<template>
	<div class="down flex">
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<div class="d_left" :style="{backgroundImage:`url(${down_left_bg})`}">
			<div class="em">
				<img :src="down" alt="">
				<h2>扫码下载</h2>
			</div>
			<div class="down_word">
				<img class='ios' @click="openDia('qidai')" :src="ios" alt="">
				<img class='fenggexian' :src="fenggexian" alt="">
				<img class='android' @click="openDia('qidai')" :src="android" alt="">
			</div>
		</div>
		<div v-if='rightShow' @click="openDia('qidai')" class="d_right" :style="{backgroundImage:`url(${down_right_bg})`}">
			领取礼包
		</div>
	</div>
</template>
<style lang='less'>
.down {
	position: relative;
	z-index: 1;
	margin: auto;
	height: 180px;
	display: flex;
	.d_left,
	.d_right {
		background-size: 100% 100%;
		height: 164px;
		display: flex;
		box-sizing: border-box;
		align-items: center;
	}
	.d_left {
		width: 317px;
		padding: 20px 30px;
		padding-top: 30px;
		padding-right: 0;
		.em {
			img {
				width: 90px;
			}
			h2 {
				font-size: 18px;
				margin-top: 5px;
				color: #000;
			}
		}

		.down_word {
			padding: 0 10px;
			flex: 1;
			img {
				margin: auto;
				padding: 5px 0;
				width: 123px;
			}
			.ios {
				height: 44px;
			}
			.fenggexian {
				width: 165px;
			}
			.android {
				height: 44px;
			}
		}
	}
	.d_right {
		padding: 0 10px;
		font-size: 24px;
		width: 65px;
		background-position: center top;
		color: #000;
		cursor: pointer;
	}
}

</style>
