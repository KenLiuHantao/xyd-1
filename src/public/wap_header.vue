<script>
import wap_icon from 's/images/wap/wap_header_icon.png';
import top_button from 's/images/wap/top_button.png';

export default {
	name: 'wap-header',
	data() {
		return {
			wap_icon,
			top_button,
			dia_show: false,
			dia_type: 'qidai'
		}
	}
}

</script>
<template>
	<div class="wap-header">
		<div class="w_h_cnt flex f_j_b">
			<div class="h_left">
				<img :src="wap_icon" alt="">
				<div class="h_c flex f_a_s">
					<h2>雄霸乱世</h2>
					<p>经典国战策略游戏</p>
				</div>
			</div>
			<div class="h_right">
				<img @click='dia_show = true' :src="top_button" alt="">
			</div>
		</div>
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
	</div>
</template>
<style lang='less'>
.wap-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 1rem;
	background-color: rgba(0, 0, 0, .8);
	z-index: 99999;
	color: #fff;
	padding: 0 .4rem;
	.w_h_cnt {
		width: 100%;
		height: 100%;
	}
	.h_left {
		display: flex;
		height: 100%;
		img {
			height: 100%;
		}
		.h_c {
			margin-left: .2rem;
			flex-direction: column;
			* {
				line-height: 1.5
			}
		}
		h2 {
			color: #fff7b2;
			font-size: .24rem;
		}
		p {
			color: #fff;
			font-size: .2rem;
		}
	}
	.h_right {
		img {
			width: 2.12rem;
			height: .77rem;
		}
	}
}

</style>
