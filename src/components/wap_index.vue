<script>
import wap_bg from 's/images/wap/bg.jpg';
import logo from 's/logo.png';
import slogen from 's/images/cover/logo.png';
import down from 's/images/wap/juzhong_button.png';
import slider from 'vue-concise-slider'
import wap1 from 's/images/cover/slider-1.jpg';
import wap2 from 's/images/cover/slider-2.jpg';
import wap3 from 's/images/cover/slider-3.jpg';
import bg from 's/images/index/wujiang/bg/wap_bg.jpg';
import bg_buttom from 's/images/index/bg/bg_buttom.jpg';
import { wj_list } from 's/wujiang';
import { corps } from 's/corps';
import { share } from 's/share';
import fangshou from 's/images/index/wujiang/icon/fangshou.png';
import gongji from 's/images/index/wujiang/icon/gongji.png';
import zhimou from 's/images/index/wujiang/icon/zhimou.png';
import play from 's/images/play_radio.png';

export default {
	components: { slider },
	data() {
		return {
			wap_bg,
			logo,
			slogen,
			down,
			bg,
			play,
			bg_buttom,
			pages: [],
			sliderinit: {
				currentPage: 0,
				thresholdDistance: 50,
				thresholdTime: 100,
				autoplay: 4000,
				loop: true,
				infinite: 1,
				slidesToScroll: 1,
				timingFunction: 'ease',
				duration: 300
			},
			initData: {},
			activeName: 'first',
			wj_list: wj_list,
			wj_right: {},
			corps: corps,
			share: share,
			corps_choice: {},
			fangshou,
			gongji,
			zhimou,
			list_idx: 0,
			sub_idx: 0,
			dia_show: false,
			dia_type: 'qq'
		}
	},
	mounted() {
		this.wj_right = JSON.parse(JSON.stringify(this.wj_list[0]));
		this.corps_choice = JSON.parse(JSON.stringify(this.corps[0]));
		this.getInfo();
	},
	methods: {
		async getInfo() {
			this.loading = true;
			let data = await this.$http.jsonp(z.jsonp + '/home/getLists');
			let cover = await this.$http.jsonp(z.jsonp + '/home/getCover').catch(err => {
				this.$message.error('获取cover有错！');
				this.loading = false;
			});
			let initData = data.data.list;
			let other = initData.newbie.concat(initData.geek).concat(initData.war);
			initData.other = other;
			this.initData = initData;
			let pages = [];
			if (cover.data.data) {
				cover.data.data.map(el => {
					pages.push({
						html: `<div class="slider1"><img src="${el.images}"></div>`,
					})
				})
			}
			this.pages = pages;
			this.loading = false;
		},
		// Listener event
		slide(data) {
			console.log(data)
		},
		onTap(data) {
			console.log(data)
		},
		handleClick() {},
		getTXimgURL(name) {
			return `../assets/images/index/wujiang/${name}/tx.jpg`;
		},
		PTTSendClick(item, idx) {
			this.list_idx = idx;
			this.wj_right = JSON.parse(JSON.stringify(item));
		},
		choiceCorps(item, idx) {
			this.sub_idx = idx;
			this.corps_choice = JSON.parse(JSON.stringify(item));
		},
		gotoNews() {
			let news = ['first', 'second', 'third'],
				libs = ['fourth'],
				active = this.activeName;
			if (news.indexOf(active) !== -1) {
				this.$router.push({ path: '/wap/news', query: { type: 'news' } });
			}
			if (libs.indexOf(active) !== -1) {
				this.$router.push({ path: '/wap/news', query: { type: 'gonglve' } });
			}
		},
		openDia(type) {
			this.dia_show = true;
			this.dia_type = type;
		}
	},
	computed: {
		scrollStyle() {
			let left = 0;
			left = -this.list_idx * 1.35 + 'rem';
			return { marginLeft: left };
		}
	}
}

</script>
<template>
	<div class="wap_index">
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<div class="w_top" :style='{backgroundImage:`url(${wap_bg})`}' />
		<div class="cnt">
			<div class="logo_slogen">
				<img class='logo' :src="logo" alt="">
				<img class='play' @click='openDia("qidai")' :src="play" alt="">
				<img class='slogen' :src="slogen" alt="">
				<img @click='openDia("qidai")' class="down" :src="down" alt="">
			</div>
		</div>
		<slider ref="slider" :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap'>
			<!-- 设置loading,可自定义 -->
			<div slot="loading">loading...</div>
		</slider>
		<div class="w_block">
			<h2 class="w_title">新闻资讯</h2>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="热点" name="first">
					<news-item :ispc='false' :list='initData.hots' label="热点" />
				</el-tab-pane>
				<el-tab-pane label="新闻" name="second">
					<news-item :ispc='false' :list='initData.news' label="新闻" />
				</el-tab-pane>
				<el-tab-pane label="活动" name="third">
					<news-item :ispc='false' :list='initData.activities' label="活动" />
				</el-tab-pane>
				<el-tab-pane label="攻略" name="fourth">
					<news-item :ispc='false' :list='initData.other' label="攻略" />
				</el-tab-pane>
			</el-tabs>
			<div class="w_more" @click='gotoNews'>更多 + </div>
		</div>
		<div class="w_block">
			<h2 class="w_title">武将介绍</h2>
			<div class="inif_intr">
				<ul class="inif_intr_list">
					<li class="on inif_list_1 intr_li" :style="{backgroundImage:`url(${bg})`}">
						<h5>
							{{wj_right.chinese}}
							<img id="knif" :src="wj_right.city" alt="">
							<span class='star' :style="{backgroundImage:`url(${wj_right.star})`}" />
						</h5>
						<ul class="many_data">
							<li><i :style="{backgroundImage:`url(${gongji})`}" class="spr" />攻击<span>{{wj_right.attack}}</span></li>
							<li><i :style="{backgroundImage:`url(${fangshou})`}" class="spr" />防守<span>{{wj_right.defense}}</span></li>
							<li><i :style="{backgroundImage:`url(${zhimou})`}" class="spr" />智谋<span>{{wj_right.iq}}</span></li>
						</ul>
						<h6>武技描述</h6>
						<p>{{wj_right.cons}}</p>
						<h6>武将装备</h6>
						<ul class="skill">
							<li>
								<img :src="wj_right.equ">
								<p class="equ_name">{{wj_right.equ_name}}</p>
							</li>
						</ul>
						<img :src="wj_right.big" alt="周瑜">
					</li>
				</ul>
			</div>
			<div class="inif_list flex">
				<i :class='list_idx == 0 ? "w_dis" : ""' class="el-icon-arrow-left" @click='list_idx != 0 ? PTTSendClick(wj_list[list_idx-1], list_idx-1) : false' />
				<div class="w_croll">
					<div class="scroll-cnt" :style='scrollStyle'>
						<div v-for='(item, idx) in wj_list' @click="PTTSendClick(item, idx)" :class="idx === list_idx ? 'grayscale inif_list_8 on' : 'grayscale inif_list_8'">
							<img :src="item.url" alt="item.chinese">
						</div>
					</div>
				</div>
				<i :class='list_idx == 10 ? "w_dis" : ""' class="el-icon-arrow-right" @click='list_idx != 10 ? PTTSendClick(wj_list[list_idx+1], list_idx+1) : false' />
			</div>
			<div class="w_more" @click='openDia("qidai")'>更多 + </div>
		</div>
		<div class="w_block">
			<h2 class="w_title">兵种介绍</h2>
			<ul class="intr_box">
				<li class="intr_child on infantry">
					<ul class="infantry_box widt_box">
						<li class="pos_obx infantry_one">
							<h4>{{corps_choice.title}}</h4>
							<p>{{corps_choice.content}}</p>
							<img :src="corps_choice.pic" alt="士兵图">
						</li>
					</ul>
				</li>
			</ul>
			<ul class="sum_list flex f_j_b">
				<li class="flex" v-for="(item, c_idx) in corps" @click='choiceCorps(item, c_idx)' :class="c_idx == sub_idx ? 'on' : ''">
					{{item.title}}<a href="javascript:;">+</a>
				</li>
			</ul>
		</div>
		<div class="share flex f_j_b">
			<div class="w_item" v-for='(d, idx) in share' :style="d.style" @click='openDia(d.type)'>
				<img :src="d.img">
				<p>{{d.title}}</p>
			</div>
		</div>
		<div class="w_buttom" :style="{backgroundImage:`url(${bg_buttom})`}" />
		<feet type='#000' :ispc='false' />
	</div>
</template>
<style lang='less'>
.wap_index {
	position: relative;
	.w_dis {
		color: #bfb6b1!important;
	}
	.w_top {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 20rem;
		z-index: 0;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: top center;
	}
	.cnt {
		position: relative;
		z-index: 1;
		.logo_slogen {
			padding: 1.2rem .7rem;
			.play {
				width: 1rem;
				height: 1rem;
				margin-top: 4rem;
				margin-right: -.3rem;
			}
			img {
				display: block;
				float: right;
			}
			.logo {
				width: 2.8rem;
			}
			.slogen {
				margin: 5.3rem auto .4rem auto;
				width: 3.8rem;
				float: none;
			}
			.down {
				width: 3.57rem;
				height: 1.32rem;
				float: none;
				margin: auto;
			}
		}
	}
	.slider-container {
		width: 6.7rem;
		height: 4.4rem;
		margin: auto;
		.slider1 {
			width: 6.7rem;
			height: 4.4rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.w_block {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: .7rem .2rem 0;
		z-index: 1;
		.w_title {
			position: relative;
			width: 2rem;
			height: .5rem;
			font-size: .28rem;
			line-height: .54rem;
			font-weight: bold;
			color: #321e03;
			background: url(../assets/images/wap/new_bg.png) no-repeat;
			background-size: 100% 100%;
			background-position: center;
			margin: auto;
			margin-bottom: .3rem;
			&:after,
			&:before {
				content: '';
				position: absolute;
				top: 50%;
				margin-top: -.08rem;
				width: 2.38rem;
				height: .17rem;
				background-position: center;
				background-size: 100% 100%;
			}
			&:after {
				background-image: url(../assets/images/wap/new_right.png);
				right: -2.38rem;
			}
			&:before {
				background-image: url(../assets/images/wap/new_left.png);
				left: -2.38rem;
			}
		}
	}
	.el-tabs__nav {
		display: flex;
		width: 100%;
		.el-tabs__active-bar {
			background-color: #ff9900
		}
		.el-tabs__item {
			height: .5rem;
			line-height: .5rem;
			font-size: .24rem;
			flex: 1;
			&:hover {
				color: #ff9900;
			}
			&.is-active {
				color: #ff9900;
			}
		}
	}
	.inif_intr {
		width: 7.1rem;
		height: 3.7rem;
		float: right;
		background: no-repeat 0 0;
		position: relative;
		color: #fff;
		margin-bottom: .2rem;
		.inif_intr_list {
			width: 100%;
			height: 100%;
			li.on {
				display: block!important;
			}
			li.intr_li {
				box-sizing: border-box;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				padding-left: .4rem;
				text-align: left;
				display: none;
			}
			h5 {
				display: flex;
				align-items: center;
				margin-top: .28rem;
				font-size: .3rem;
				line-height: 1;
				color: #fff;
				font-weight: bold;
				margin-bottom: .2rem;
				img {
					position: relative;
					display: inline-block;
					width: .28rem;
					height: .28rem;
					margin: 0 .1rem;
					vertical-align: middle;
					bottom: 0;
					right: 0;
				}
				span {
					display: inline-block;
					width: 1rem;
					height: .16rem;
					background: no-repeat 0 0;
					background-size: 100% 100%;
				}
				em {
					display: inline-block;
					font-size: .12rem;
					color: #fff;
					line-height: .2rem;
					padding: 0 .1rem;
					height: .2rem;
					text-align: center;
					background: #d4c08f;
				}
			}
			h6 {
				line-height: 1;
				border-bottom: .01rem solid #464d6a;
				font-size: .18rem;
				width: 3.16rem;
				color: #c4a85b;
				padding-bottom: .06rem;
				margin-bottom: .1rem;
				font-weight: bold;
			}
			p {
				position: relative;
				z-index: 1;
				width: 60%;
				height: 1.2rem;
				overflow: hidden;
				line-height: 1.2;
				margin: .04rem 0;
				font-size: .2rem;
				font-weight: bold;
			}
			.many_data {
				position: relative;
				color: #fff;
				font-size: .14rem;
				font-weight: bold;
				overflow: hidden;
				margin-bottom: .1rem;
				z-index: 1;
				li {
					display: flex;
					align-items: center;
					float: left;
					font-size: .18rem;
					color: #ffffff;
					margin-right: .24rem;
					i {
						width: .24rem;
						height: .24rem;
						display: inline-block;
						vertical-align: middle;
						margin-right: .04rem;
						background-size: cover;
					}
					span {
						font-size: .18rem;
						margin-left: .05rem;
					}
				}
			}
			.skill {
				margin-top: .1rem;
				position: relative;
				z-index: 123;
				li {
					width: .38rem;
					height: .38rem;
					position: relative;
					margin-right: .14rem;
					background: #000;
					cursor: pointer;
					.equ_name {
						position: absolute;
						left: .5rem;
						width: 2rem;
						top: .04rem;
					}
					&:hover {
						span {
							display: block;
						}
					}
					img {
						width: 100%;
						height: auto;
					}
					span {
						display: block;
						position: absolute;
						top: .6rem;
						left: 0;
						background: #000;
						width: 2.4rem;
						position: relative;
						display: none;
						padding: .2rem;
						color: #9708e1;
						&:after {
							display: block;
							content: '';
							position: absolute;
							top: -.06rem;
							left: .1rem;
							height: 0;
							width: 0;
							border-left: .06rem solid transparent;
							border-right: .06rem solid transparent;
							border-bottom: .06rem solid #000;
						}
						i {
							font-style: normal;
							display: block;
							color: #fff;
						}
					}
				}
			}
			img {
				position: absolute;
				width: 3.8rem;
				height: 4.43rem;
				bottom: 0;
				right: 0;
			}
		}
	}
	.inif_list {
		margin-top: .2rem;
		width: 100%;
		[class*=" el-icon-"],
		[class^=el-icon-] {
			font-size: .8rem;
			font-weight: bolder;
			color: #ff9900;
		}
		.w_croll {
			background: #252b46;
			overflow: hidden;
			width: 4*1.35rem;
			height: 1.35rem;
			.scroll-cnt {
				transition: all .2s ease;
				display: flex;
				width: 1.35*11rem;
			}
			.grayscale {
				box-sizing: border-box;
				width: 1.35rem;
				height: 1.35rem;
				opacity: 0.3;
				background-color: #252b46;
				filter: alpha(opacity=30);
				transition: all .2s ease;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
				&.on {
					opacity: 1;
					filter: grayscale(0);
					filter: alpha(opacity=100);
				}
			}
		}
	}
	.intr_box {
		background: url('../assets/images/index/bingzhong/wap_bg.jpg') no-repeat 0 0;
		width: 100%;
		height: 2.3rem;
		position: relative;
		.intr_child.on {
			display: block;
		}
		.intr_child {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 2.3rem;
			display: none;
		}
		.widt_box {
			width: 100%;
			height: 2.3rem;
		}
		.pos_obx {
			position: absolute;
			box-sizing: border-box;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: .4rem .48rem;
			display: block;
			text-align: left;
			font-weight: bold;
			h4 {
				font-size: .3rem;
				color: #b19d64;
				margin-bottom: .1rem;
			}
			p {
				color: #fff;
				width: 60%;
				font-size: .2rem;
			}
			img {
				width: 3.5rem;
				height: 3.3rem;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
	}
	.sum_list {
		width: 5.5rem;
		margin: .2rem auto;
		li {
			background-image: url(../assets/images/wap/bingzhong_bg.png);
			background-size: 100% 100%;
			width: 1.57rem;
			height: .41rem;
			&.on {
				background-image: url(../assets/images/wap/bingzhong_point.png);
			}
		}
	}
	.share {
		position: relative;
		z-index: 1;
		width: 4.67rem;
		height: 1.27rem;
		margin: .5rem auto;
		.w_item {
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
		}
		img {
			height: .7rem;
		}
	}
}

</style>
