<script>
import contact from 's/images/contact.png';
import wx from 's/images/qr_code/wx.png';

export default {
	name: 'contact',
	data() {
		return {
			contact,
			wx,
			toggle: true
		}
	},
	methods: {
		toggleHide() {
			this.toggle = !this.toggle;
		}
	}
}

</script>
<template>
	<div class="contact" :style="{marginRight:`${toggle ? 0 : '-130px'}`}">
		<div class="bg" :style="{backgroundImage:`url(${contact})`}" @click='toggleHide' />
		<div class="cnt">
			<img :src="wx" alt="">
			<p>微信公众号</p>
			<p>客服QQ：</p>
			<p>80032234</p>
			<div class="weibo">
				<i class="icon-weibo" />
				<p>新浪微博</p>
			</div>
		</div>
	</div>
</template>
<style lang='less'>
.contact {
	position: fixed;
	right: 0;
	top: 100px;
	width: 220px;
	height: 400px;
	z-index: 999;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	flex-direction: column;
	.bg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 0;
		background-size: 100% 100%;
	}
	.cnt {
		position: absolute;
		z-index: 1;
		* {
			color: #fff;
		}
		p {
			line-height: 1.5;
			width: 100px;
			font-size: 16px;
			font-weight: bold;
			text-align: center;
		}
		img {
			width: 100px;
			margin-bottom: 15px;
		}
		.weibo {
			i {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50px;
				height: 50px;
				margin: auto;
				border-radius: 50px;
				background-color: #bb0123;
				font-size: 40px;
			}
		}
	}
}

</style>
