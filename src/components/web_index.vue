<script>
import logo from 's/logo.png';
import banner from 's/images/index/bg/bg_top.jpg';
import bg_buttom from 's/images/index/bg/bg_buttom.jpg';
import logo_w from 's/images/cover/logo.png';
import bg from 's/images/index/wujiang/bg/bg.png';
import { wj_list } from 's/wujiang';
import { corps } from 's/corps';
import { qr_list } from 's/qr_code';
import qr_bg from 's/images/qr_code/code_bg.png';
import fangshou from 's/images/index/wujiang/icon/fangshou.png';
import gongji from 's/images/index/wujiang/icon/gongji.png';
import zhimou from 's/images/index/wujiang/icon/zhimou.png';
import play from 's/images/play_radio.png';

export default {
	data() {
		return {
			banner,
			bg_buttom,
			logo,
			logo_w,
			bg,
			qr_bg,
			fangshou,
			gongji,
			zhimou,
			play,
			activeName: 'first',
			beforeActive: 'first',
			initData: {},
			coverList: [],
			list_idx: 0,
			wj_list: wj_list,
			corps: corps,
			corps_choice: {},
			sub_idx: 0,
			qr_list: qr_list,
			wj_right: {
				chinese: '',
				city: '',
				attack: 0,
				defense: 0,
				iq: 0,
				cons: '',
				equ: '',
				equ_name: ''
			},
			loading: true,
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
			this.coverList = cover.data.data || [];
			this.loading = false;
		},
		getTXimgURL(name) {
			return `../assets/images/index/wujiang/${name}/tx.jpg`;
		},
		PTTSendClick(item, idx) {
			this.list_idx = idx;
			this.wj_right = JSON.parse(JSON.stringify(item));
		},
		detailRender() {},
		choiceCorps(item, idx) {
			this.sub_idx = idx;
			this.corps_choice = JSON.parse(JSON.stringify(item));
		},
		handleClick(tab, e) {
			let news = ['first', 'second', 'third'],
				libs = ['fourth'];
			if (tab.name === 'fifth') {
				if (news.indexOf(this.beforeActive) !== -1) {
					this.$router.push({ path: '/web/news', query: { type: 'news' } });
					return false;
				}
				if (libs.indexOf(this.beforeActive) !== -1) {
					this.$router.push({ path: '/web/news', query: { type: 'gonglve' } });
					return false;
				}
			} else {
				this.beforeActive = tab.name;
			}
		},
		openMessage() {
			this.$message('敬请期待~');
		},
		openDia(type) {
			this.dia_show = true;
			this.dia_type = type;
		}
	}
}

</script>
<template>
	<div class="web_index">
		<div class="loading" v-show='loading' v-loading='loading' />
		<div class="top" :style="{backgroundImage:`url(${banner})`}" />
		<x-head/>
		<div class="web_cnt">
			<div class="header flex">
				<div class="pus" />
				<div class="word_r">
					<img :src="logo" class='logo'>
					<img :src="logo_w" class='logo_w'>
					<img class='play' @click='openDia("qidai")' :src="play" alt="">
					<down :rightShow="true" @open="openDia('qidai')" />
				</div>
			</div>
			<div class="d_news wrap_box">
				<div class="img_list">
					<el-carousel trigger="click" height="350px">
						<el-carousel-item v-for="(item, idx) in coverList" :key="idx">
							<img :src="item.images" alt="">
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="news_list">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="热点" name="first">
							<news-item :list='initData.hots' label="热点" />
						</el-tab-pane>
						<el-tab-pane label="新闻" name="second">
							<news-item :list='initData.news' label="新闻" />
						</el-tab-pane>
						<el-tab-pane label="活动" name="third">
							<news-item :list='initData.activities' label="活动" />
						</el-tab-pane>
						<el-tab-pane label="攻略" name="fourth">
							<news-item :list='initData.other' label="攻略" />
						</el-tab-pane>
						<el-tab-pane label="···" name="fifth">···</el-tab-pane>
					</el-tabs>
				</div>
			</div>
			<div class="inif wrap_box" id='wujiang'>
				<h2 class="title">
				武将介绍
				<p>CHARACTER</p>
			</h2>
				<a href="javascript:;" @click='openDia("qidai")' class="more">
				更多<i class="spr">+</i>
			</a>
				<ul class="inif_list mgt18">
					<li v-for='(item, idx) in wj_list' @click="PTTSendClick(item, idx)" @mousedown="detailRender(8)" :class="idx === list_idx ? 'grayscale inif_list_8 on' : 'grayscale inif_list_8'">
						<img :src="item.url" alt="item.chinese">
					</li>
					<li class='inif_list_last'>
						<a href="javascript:;" @click='openDia("qidai")'>+<span class="po">更多精彩武将</span></a>
					</li>
				</ul>
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
									<!-- <span>赤壁火雨 <i>周瑜召唤火凤凰，对所有敌军造成160%战法伤害，并使敌军持续燃烧3秒，每秒受到11%战法伤害</i></span> -->
								</li>
							</ul>
							<img :src="wj_right.big" alt="周瑜">
						</li>
					</ul>
				</div>
			</div>
			<div class="introduction wrap_box" id='bingzhong'>
				<h2 class="title">
				兵种介绍
				<p>CORPS</p>
			</h2>
				<a href="javascript:;" @click='openDia("qidai")' class="more">
				更多<i class="spr">+</i>
			</a>
				<ul class="sum_list">
					<li v-for="(item, c_idx) in corps" @click='choiceCorps(item, c_idx)' :class="c_idx == sub_idx ? 'on' : ''">
						{{item.title}}<a href="javascript:;">+</a>
					</li>
				</ul>
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
			</div>
			<ul class="qr_box wrap_box q">
				<li class="qr_zc" v-for='(item, idx) in qr_list' @click='openDia(item.type)' :style="{backgroundImage:`url(${item.bg})`}">
				</li>
			</ul>
		</div>
		<feet type='#000' />
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<div class="buttom" :style="{backgroundImage:`url(${bg_buttom})`}" />
	</div>
</template>
<style lang='less'>
.web_index {
	position: relative;
	box-sizing: border-box;
	background-position: top;
	background-size: 100%;
	background-repeat: no-repeat;
	/*padding: 0 15%;*/
	.spr {
		background: url(//game.gtimg.cn/images/3new/web20180301/spr.png) no-repeat 0 0;
	}
	.top {
		height: 930px!important;
		background-size: 1920px 930px!important;
	}
	.mgt18 {
		margin: 23px 0;
	}
	.more {
		float: right;
		color: #000;
		top: -48px;
		position: relative;
		z-index: 555;
		font-size: 14px;
		i {
			font-style: normal;
			background-position: -2px -344px;
			width: 21px;
			height: 21px;
			display: inline-block;
			float: right;
			color: #fff;
			text-align: center;
			line-height: 19px;
			font-size: 17px;
			font-weight: bold;
			margin-left: 14px;
		}
	}
	.inif {
		height: 476px;
		margin-top: 60px;
	}
	.wrap_box {
		position: relative;
		z-index: 1;
		width: 100%;
		margin: 30px auto;
	}
	.title {
		display: flex;
		align-items: flex-end;
		font-size: 32px;
		font-weight: bold;
		color: #000;
		overflow: hidden;
		margin-bottom: 20px;
		p {
			font-size: 18.8px;
			color: #f4b505;
			margin-left: 10px;
		}
	}
	.d_news {
		background-color: #fff;
		display: flex;
		height: 345px!important;
		margin-top: 0;
		>div {
			width: 50%;
			height: 350px!important;
		}
		.img_list {

			img {
				display: inline-block;
				width: 100%;
				height: 350px;
			}
		}
		.el-tabs__nav {
			display: flex;
			width: 100%;
			.el-tabs__active-bar {
				background-color: #ff2800
			}
			.el-tabs__item {
				height: 60px;
				line-height: 60px;
				font-size: 20px;
				flex: 1;
				&:hover {
					color: #ff2800;
				}
				&.is-active {
					color: #ff2800;
				}
			}
		}
	}
	.header {
		position: relative;
		z-index: 1;
		height: 747px;
		.pus {
			width: 50%;
			height: 100%;
		}
		.word_r {
			box-sizing: border-box;
			width: 50%;
			height: 100%;
			padding-left: 166px;
			img {
				display: block;
				margin: auto;
			}
			.logo {
				width: 240px;
				height: 106px;
				margin-top: 160px;
			}
			.play {
				position: absolute;
				width: 1rem;
				height: 1rem;
				margin-left: -.5rem;
				margin-top: -1.2rem;
			}
			.logo_w {
				width: 382px;
				height: 300px;
			}
			.down {
				margin-top: 10px;
				justify-content: flex-end!important;
			}
		}
	}
	.inif_list {
		width: 480px;
		height: 360px;
		float: left;
		background: #252b46;
		li {
			width: 120px;
			height: 120px;
			float: left;
			cursor: pointer;
			opacity: 0.6;
			background-color: #252b46;
			filter: alpha(opacity=60);
			overflow: hidden;
			img {
				width: 120px;
				height: 120px;
				display: block;
				margin: 0 auto;
			}
			&.on,
			&:hover {
				opacity: 1;
				filter: grayscale(0);
				filter: alpha(opacity=100);
			}
			&.inif_list_last {
				background: #c4a95c;
				color: #fff;
				font-weight: bold;
				line-height: 110px;
				text-align: center;
				text-indent: 0;
				position: relative;
				opacity: 1;
				filter: alpha(opacity=100);
				a {
					font-size: 50px;
					display: block;
					color: #fff;
				}
				span {
					display: block;
					font-size: 16px;
					color: #fff;
					text-indent: 0;
					line-height: 0;
					top: 90px;
					margin-top: -20px;
				}
			}
		}
		.grayscale {
			filter: grayscale(100%);
		}
	}
	.inif_intr {
		width: 607px;
		height: 363px;
		float: right;
		background: no-repeat 0 0;
		position: relative;
		color: #fff;
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
				padding-left: 40px;
				text-align: left;
				display: none;
			}
			h5 {
				display: flex;
				align-items: center;
				margin-top: 30px;
				font-size: 30px;
				color: #b19d64;
				font-weight: bold;
				margin-bottom: 14px;
				img {
					position: relative;
					display: inline-block;
					width: 28px;
					height: 28px;
					margin: 0 10px;
					vertical-align: middle;
					bottom: 0;
					right: 0;
				}
				span {
					display: inline-block;
					width: 100px;
					height: 16px;
					background: no-repeat 0 0;
				}
				em {
					display: inline-block;
					font-size: 12px;
					color: #fff;
					line-height: 20px;
					padding: 0 10px;
					height: 20px;
					text-align: center;
					background: #d4c08f;
				}
			}
			h6 {
				border-bottom: 1px solid #464d6a;
				font-size: 18px;
				width: 316px;
				color: #c4a85b;
				padding-bottom: 6px;
				margin-bottom: 8px;
				font-weight: bold;
			}
			p {
				width: 52%;
				overflow: hidden;
				height: 4.5em;
				line-height: 1.5;
				margin: 4px 0;
				font-size: 16px;
				font-weight: bold;
			}
			.many_data {
				position: relative;
				z-index: 1;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
				overflow: hidden;
				margin-bottom: 24px;
				li {
					display: flex;
					align-items: center;
					float: left;
					font-size: 18px;
					color: #ffffff;
					margin-right: 24px;
					i {
						width: 24px;
						height: 24px;
						display: inline-block;
						vertical-align: middle;
						margin-right: 4px;
						background-size: cover;
					}
					span {
						font-size: 18px;
						margin-left: 5px;
					}
				}
			}
			.skill {
				margin-top: 20px;
				position: relative;
				z-index: 123;
				li {
					float: left;
					width: 38px;
					height: 38px;
					position: relative;
					margin-right: 14px;
					background: #000;
					cursor: pointer;
					.equ_name {
						position: absolute;
						left: 50px;
						width: 200px;
						top: 4px;
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
						top: 60px;
						left: 0px;
						background: #000;
						width: 240px;
						position: relative;
						display: none;
						padding: 20px;
						color: #9708e1;
						&:after {
							display: block;
							content: '';
							position: absolute;
							top: -6px;
							left: 10px;
							height: 0px;
							width: 0px;
							border-left: 6px solid transparent;
							border-right: 6px solid transparent;
							border-bottom: 6px solid #000;
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
				bottom: 0;
				right: 0;
			}
		}
	}
	.introduction {
		height: 406px;
		margin: 0 auto;
		padding-top: 30px;
	}
	.sum_list {
		width: 184px;
		float: left;
		margin: 18px 0 0;
		li {
			width: 155px;
			height: 68px;
			background: #033856;
			color: #fff;
			font-size: 22px;
			line-height: 68px;
			margin-bottom: 7px;
			cursor: pointer;
			* {
				color: #fff;
				font-size: 22px;
			}
		}
		li.on {
			width: 180px;
			background: url(//game.gtimg.cn/images/3new/web20180301/spr.png) no-repeat -26px -521px;
		}
	}
	.intr_box {
		background: url('../assets/images/index/bingzhong/bg.jpg') no-repeat 0 0;
		width: 905px;
		height: 218px;
		margin-top: -2px;
		float: right;
		position: relative;
		.intr_child.on {
			display: block;
		}
		.intr_child {
			position: absolute;
			top: 0;
			left: 0;
			width: 905px;
			height: 218px;
			display: none;
		}
		.widt_box {
			width: 905px;
			height: 218px;
		}
		.pos_obx {
			position: absolute;
			box-sizing: border-box;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 40px 48px;
			display: block;
			text-align: left;
			font-weight: bold;
			h4 {
				font-size: 30px;
				color: #b19d64;
				margin-bottom: 10px;
			}
			p {
				color: #fff;
				width: 50%;
				font-size: 17px;
			}
			img {
				width: 350px;
				height: 330px;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
	}
	.qr_box {
		display: flex;
		justify-content: space-between;
		margin: 20px auto 0;
		height: 198px;
		text-align: center;
		padding-bottom: 150px;
		li {
			cursor: pointer;
			position: relative;
			width: 291px;
			height: 201px;
			display: inline-block;
			vertical-align: top;
			position: relative;
			background-color: #fff;
			background-size: 100% 100%;
			.left_cnt {
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				padding: 0 20px;
				background-size: cover;
				position: absolute;
				left: 0;
				width: 90px;
				height: 100%;
				font-size: 28px;
				color: #fff;
			}
			.po {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 90px;
				right: 0;
				width: 160px;
				margin: auto;
			}
		}
	}
}

</style>
