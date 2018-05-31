<script>
import wx from 's/images/qr_code/wx.png';
import download from 's/images/qr_code/download.png';
import weibo from 's/images/qr_code/weibo.png';
import qq from 's/images/qr_code/qq.png';
import qidai from 's/images/qr_code/qidai.png';
import code_bg from 's/images/qr_code/qr_bg.png';

export default {
	name: 'dia',
	data() {
		return {
			code_bg,
			className: 'default'
		}
	},
	props: {
		type: {
			type: String,
			default: 'wx'
		},
		show: Boolean
	},
	watch: {
		type(val) {
			console.log(val);
			if (val === 'weibo') location.href = xbls.weiboLink;
		}
	},
	computed: {
		all() {
			let type = this.type || 'wx',
				title = '官方微信',
				img = wx;
			switch (type) {
				case 'wx':
					title = '官方微信';
					this.className = 'default';
					img = wx;
					break;
				case 'weibo':
					location.href = xbls.weiboLink;
					break;
				case 'qq':
					title = '官方客服';
					this.className = 'default';
					img = qq;
					break;
				case 'down':
					title = '官方下载';
					this.className = 'default';
					img = download;
					break;
				case 'qidai':
					title = '';
					img = qidai;
					this.className = 'qidai';
					break;
			}

			return { title, img };
		}
	},
	methods: {
		cb() {
			this.$emit('cb');
		}
	}
}

</script>
<template>
	<div class="dialog">
		<template v-if='type !== "weibo"'>
			<el-dialog :class='className' :visible.sync="show" width="300px" :show-close='false' :before-close='cb'>
				<h2 v-show='all.title'>{{all.title}}</h2>
				<div v-if='type !== "qidai"' class="w_img_cnt flex" :style="{backgroundImage:`url(${code_bg})`}">
					<img :src="all.img" alt="">
				</div>
				<img v-else :src="all.img" alt="">
			</el-dialog>
		</template>
	</div>
</template>
<style lang='less'>
.dialog {
	.el-dialog {
		background-image: url(../assets/images/qr_code/dia_bg.png);
		background-size: 100% 100%;
		background-color: #033856;
	}
	.el-dialog__header {
		display: none;
	}
	.qidai {
		.el-dialog {
			margin-top: 30vh!important;
			width: 200px!important;
			height: 70px!important;
			.el-dialog__body {
				padding: 0;
			}
		}
	}
	h2 {
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20px;
	}
	.w_img_cnt {
		width: 223px;
		height: 230px;
		margin: auto;
	}
	img {
		width: 200px;
	}
}

</style>
