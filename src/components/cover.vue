<script>
import banner from 's/images/cover/cover_pc.jpg';
import go_idx from 's/images/cover/go_idx.png';
import logo from 's/images/cover/logo.png';
import game from 's/images/cover/游戏特色.png';
import slider1 from 's/images/cover/slider-1.jpg';
import slider2 from 's/images/cover/slider-2.jpg';
import slider3 from 's/images/cover/slider-3.jpg';
import slider4 from 's/images/cover/slider-4.jpg';
import cover_border from 's/images/cover/cover_border.png';
import left_arr from 's/images/cover/left_arr.png';
import right_arr from 's/images/cover/right_arr.png';
import feet_back from 's/images/cover/feet_back.png';

export default {
	data() {
		return {
			banner,
			go_idx,
			logo,
			game,
			imgArr: [],
			cover_border,
			left_arr,
			right_arr,
			feet_back,
			loading: false,
			dia_show: false,
			dia_type: 'qq'
		}
	},
	mounted() {
		this.getInfo();
	},
	methods: {
		async getInfo() {
			this.loading = true;
			let os = 1;
			let data = await this.$http.jsonp(z.jsonp + '/home/getCarousel', { os });
			this.imgArr = data.data.data.length ? data.data.data : [
				{ images: slider1 }, { images: slider2 }, { images: slider3 }, { images: slider4 }
			];
			this.loading = false;
		},
		gotoIndex() {
			this.$router.push('web/index');
		},
		gotoNews(item) {
			// this.$router.push({ path: 'web/news', query: { news_id: item.id } });
		},
		openDia(type) {
			this.dia_show = true;
			this.dia_type = type;
		}
	}
}

</script>
<template>
	<div class="cover">
		<div class="loading" v-show='loading' v-loading='loading' />
		<div class="top" :style="{backgroundImage:`url(${banner})`}" />
		<div class="web_cnt">
			<div class="banner flex">
				<div class="pus" />
				<div class="word_r">
					<img :src="logo" class='logo'>
					<img :src="go_idx" class="go_idx" @click='gotoIndex'>
					<down @open="openDia('qidai')" />
				</div>
			</div>
			<img :src="game" class="game">
			<div class="container">
				<el-carousel v-if='imgArr.length' :interval='100000' type="card" width="1300px" height="510px">
					<el-carousel-item v-for="(item, idx) in imgArr" :key="idx">
						<div @click='gotoNews(item)' class="back_cover" :style="{'background-image':`url(${cover_border})`}">
							<div :style="{'background-image':`url(${item.images})`}" class="imgCnt" />
						</div>
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<feet/>
		<div class="buttom" :style="{backgroundImage:`url(${feet_back})`}" />
	</div>
</template>
<style lang='less'>
.cover {
	position: relative;
	width: 100%;
	.left {
		margin-top: 30px;
		margin-right: 20%;
	}
	.banner {
		position: relative;
		z-index: 2;
		height: 900px;
		.pus {
			width: 50%;
			height: 100%;
		}
		.word_r {
			box-sizing: border-box;
			width: 50%;
			height: 100%;
			padding-left: 44px;
			img {
				display: block;
			}
		}
		.logo {
			width: 500px;
			height: 400px;
			margin-top: 160px;
		}
		.go_idx {
			width: 200px;
			height: 70px;
			margin: auto;
			cursor: pointer;
		}
	}
	.game {
		width: 880px;
		height: 100px;
		margin-top: 20px;
	}

	.container {
		width: 100%;
		height: 510px;
		margin-top: 20px;
		margin-bottom: 70px;
		text-align: center;
	}

	.el-carousel__indicators {
		display: none;
	}

	.el-carousel__arrow--left {
		background: url('../assets/images/cover/left_arr.png');
		left: 20%;
	}

	.el-carousel__arrow--right {
		background: url('../assets/images/cover/right_arr.png');
		right: 20%;
	}

	.el-carousel__arrow--left,
	.el-carousel__arrow--right {
		width: 50px;
		height: 70px;
		background-size: 100% 100%;
		background-position: center;
		i {
			display: none;
		}
	}

	.el-carousel{
		width: 1360px;
		margin-left: -130px;
	}

	.el-carousel__item--card{
		width: 680px;
	}

	.back_cover {
			width: 680px;
			height: 510px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-position: center;
			background-size: 100% 100%;
			box-sizing: border-box;
		}
		.imgCnt {
			position: relative;
			z-index: 0;
			box-sizing: border-box;
			width: 650px;
			height: 480px;
			background-size: cover;
			background-position: center;
			border: 2px solid #facd89;
		}
}

</style>
