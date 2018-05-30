<script>
import fix_show from 's/images/fix_show.png';
import fix_hide from 's/images/fix_hide.png';
import wx from 's/images/qr_code/wx.png';

export default {
	name: 'contact',
	data() {
		return {
			fix_show,
			fix_hide,
			wx,
			toggle: true,
			dia_show: false,
			dia_type: 'qq'
		}
	},
	methods: {
		toggleHide() {
			this.toggle = !this.toggle;
		},
		openDia(type) {
			this.dia_show = true;
			this.dia_type = type;
		}
	},
	computed: {
		contactStyle() {
			return { 
				width: `${this.toggle ? '263px' : '155px'}`, 
				backgroundImage: `url(${this.toggle ? this.fix_show : this.fix_hide})` 
			}
		}
	}
}

</script>
<template>
	<div class="contact" :style="contactStyle" @click='toggleHide'>
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<div v-if='toggle' class="cnt" @click='openDia("weibo")'>
			<div class="weibo">
				<i class="icon-weibo" />
			</div>
		</div>
	</div>
</template>
<style lang='less'>
.contact {
	position: fixed;
	right: 0;
	top: 100px;
	width: 263px;
	height: 465px;
	z-index: 999;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	flex-direction: column;
	background-size: 100% 100%;
	.cnt {
		position: absolute;
		z-index: 1;
		top: 300px;
		right: 36px;
		cursor: pointer;
		.weibo {
			i {
				color: #fff;
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
