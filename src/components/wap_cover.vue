<script>
import banner from 's/images/cover/cover_h5.png';
import wap_go_idx from 's/images/cover/wap_go_idx.png';
import wap_down from 's/images/cover/wap_down.png';
import game from 's/images/cover/游戏特色.png';
import slider1 from 's/images/cover/wap-slider-1.jpg';
import slider2 from 's/images/cover/wap-slider-2.jpg';
import slider3 from 's/images/cover/wap-slider-3.jpg';
import slider4 from 's/images/cover/wap-slider-4.jpg';
import slider5 from 's/images/cover/wap-slider-5.jpg';
import wechat from 's/images/cover/wechat.png';
import webo from 's/images/cover/webo.png';
import qq from 's/images/cover/qq.png';
import { share } from 's/share';
import play from 's/images/play_radio.png';

export default {
	data() {
		return {
			banner,
			wap_go_idx,
			wap_down,
			game,
			play,
			shareArr: share,
			windowHeight: window.outerHeight,
			imgArr: [],
			dia_show: false,
			dia_type: 'qq',
		}
	},
	mounted() {
		this.getInfo();
	},
	methods: {
		async getInfo() {
			let os = 2;
			let data = await this.$http.jsonp(z.jsonp + '/home/getCarousel?os=2')
			this.imgArr = data.data.data.length ? data.data.data : [
				{ images: slider1 }, { images: slider2 }, { images: slider3 }, { images: slider4 }
			];
		},
		gotoIdx() {
			this.$router.push('/wap/index');
		},
		openDia(type) {
			this.dia_show = true;
			this.dia_type = type;
		}
	}
}

</script>
<template>
	<div class="wap_cover">
		<div class="w_top" :style='{backgroundImage:`url(${banner})`}' />
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<div class="wap_banner">
			<img class='play' @click='openDia("qidai")' :src="play" alt="">
			<div class="download flex">
				<div class="w_c_cnt flex f_j_b">
					<div class="go_idx" @click="gotoIdx" :style="{backgroundImage:`url(${wap_go_idx})`}" />
					<div class="down" @click='openDia("qidai")' :style="{backgroundImage:`url(${wap_down})`}" />
				</div>
			</div>
		</div>
		<img :src="game" class="game">
		<div class="container">
			<el-carousel :interval='4000' type="card" width="5rem" height="4.6rem">
				<el-carousel-item v-for="(item, idx) in imgArr" :key="idx">
					<div class="back_cover">
						<div :style="{'background-image':`url(${item.images})`}" class="imgCnt" />
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="wap_feet flex f_j_b">
			<div v-for='(item, idx) in shareArr' :key='idx' :style="item.style" @click='openDia(item.type)'>
				<img :src="item.img">
				<p>{{item.title}}</p>
			</div>
		</div>
		<feet type='#000' :ispc='false' />
	</div>
</template>
<style lang='less'>
#app {
	width: 100%;
	min-width: max-content;
}

.wap_cover {
	position: relative;
	.play {
		position: absolute;
		width: 1rem;
		height: 1rem;
		top: 7.5rem;
		left: 50%;
		margin-left: -.5rem;
	}
	.wap_banner {
		height: 14.5rem;
	}
	.download {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 1rem;
		top: 10rem;
		.w_c_cnt {
			width: 6.4rem;
			div {
				background-position: center;
				background-size: cover;
				width: 3rem;
				height: .8rem;
			}
		}
		.go_idx {
			margin-right: .4rem;
		}
		.down {}
	}

	.game {
		margin: .5rem 0;
		height: .6rem;
	}

	.container {
		width: 90%;
		margin: 20px auto;
	}

	.el-carousel__indicators {
		/*display: none;*/
		button {
			width: .2rem;
			height: .2rem;
			border-radius: .2rem;
		}
		.is-active button {
			background-color: #ff8300;
		}
	}

	.el-carousel__arrow--left,
	.el-carousel__arrow--right {
		display: none;
	}

	.el-carousel__container,
	.el-carousel {
		width: 5.4rem;
		margin: auto;
	}

	.el-carousel__item {
		width: 2.6rem;
		height: 100%;
		.back_cover {
			width: 2.6rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background-position: center;
			background-size: 100% 100%;
			box-sizing: border-box;
			height: 100%;
		}
		.imgCnt {
			position: relative;
			z-index: 0;
			margin: auto;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			background-size: 100% 100%;
			background-position: center;
			border: 2px solid #facd89;
		}
	}

	.wap_feet {
		position: relative;
		z-index: 1;
		width: 4.67rem;
		height: 1.27rem;
		margin: .5rem auto;
		div {
			width: 1.27rem;
			height: 1.27rem;
			border: 1px solid #ddd;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			p {
				line-height: 1.5;
				font-size: .22rem;
			}
			img {
				height: .7rem;
			}
		}
	}
}

</style>
