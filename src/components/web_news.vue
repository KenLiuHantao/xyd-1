<script>
import logo from 's/logo.png';
import banner from 's/images/index/bg/bg_top.jpg';
import logo_w from 's/images/cover/logo.png';
import bg_buttom from 's/images/index/bg/bg_buttom.jpg';
import qr_bg from 's/images/qr_code/code_bg.png';
import wx from 's/images/qr_code/wx.png';
import download from 's/images/qr_code/download.png';
import ios from 's/images/ios_down.png';
import fenggexian from 's/images/fengge.png';
import android from 's/images/android_down.png';
import down_word from 's/images/down_word.png';
import qr_img_bg from 's/images/qr_code/qr_bg.png';

export default {
	data() {
		return {
			logo,
			banner,
			logo_w,
			qr_bg,
			bg_buttom,
			download,
			wx,
			ios,
			qr_img_bg,
			down_word,
			fenggexian,
			android,
			loading: false,
			article: {},
			initData: {},
			isDetail: false,
			activeName: '47',
			dia_show: false,
			dia_type: 'qq',
			pageSize: 15,
			pageIndex: 1,
			totals: 0,
			allPages: 1,
			showData: [],
			pageShow: false
		}
	},
	beforeRouteUpdate(to, from, next) {
		if (to.query.news_id) {
			this.getArticle(to.query.news_id);
			this.isDetail = true;
		} else {
			if ((to.query.type || this.newsType) === 'gonglve') this.activeName = '50';
			if ((to.query.type || this.newsType) === 'news') this.activeName = '47';
			this.isDetail = false;
			this.getShowList();
		};

		next();
	},
	mounted() {
		let isDetail = this.$route.query.news_id || false;
		this.isDetail = isDetail;
		this.activeName = this.newsType === 'news' ? '47' : '50';
		isDetail ? this.getArticle(isDetail) : this.getShowList();
	},
	computed: {
		newsType() {
			if (this.$route.query.type === 'gonglve') this.activeName = '50';
			if (this.$route.query.type === 'news') this.activeName = '47';
			return this.$route.query.type || 'news';
		}
	},
	methods: {
		async getArticle(id) {
			this.loading = true;
			let data = await this.$http.jsonp(z.jsonp + '/home/getArticle?id=' + id);
			this.article = data.data.data;
			this.loading = false
		},
		async getInfo(id) {
			this.loading = true;
			let extra = `?type_id=${id}&page_size=${this.pageSize}&page_index=${this.pageIndex}`
			let data = await this.$http.jsonp(z.jsonp + '/home/getPageNews' + extra);
			this.loading = false;
			return data.data.list ? data.data : { allPages: 1, list: [] };
		},
		async getShowList(e, event, resize = true) {
			if (resize) this.pageIndex = 1;
			let data = await this.getInfo(e ? e.name : this.activeName),
				arr = data.list,
				allPages = data.allPages;

			this.totals = allPages * this.pageSize;
			this.pageShow = (this.totals > this.pageSize);
			this.showData = arr;
		},
		openDia(type) {
			this.dia_show = true;
			this.dia_type = type;
		},
		changePage(idx) {
			this.pageIndex = idx;
			this.getShowList(null, null, false);
		}
	}
}

</script>
<template>
	<div class="news">
		<div class="loading" v-show='loading' v-loading='loading' />
		<div class="top" :style="{backgroundImage:`url(${banner})`}" />
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<x-head :isShowLast="false" />
		<div class="web_cnt">
			<div class="header flex">
				<div class="pus" />
				<div class="word_r">
					<img :src="logo_w" class='logo_w'>
				</div>
			</div>
			<div class="news_cnt">
				<div class="left" :style="{backgroundImage:`url(${qr_bg})`}">
					<ul>
						<li>
							<img class='down_word' :src="down_word" alt="">
						</li>
						<li class="qr_code flex f_a_c">
							<img :src="download" alt="">
						</li>
						<li class="down_img flex">
							<img class='ios' @click="openDia('qidai')" :src="ios" alt="">
							<img class='fenggexian' :src="fenggexian" alt="">
							<img class='android' @click="openDia('qidai')" :src="android" alt="">
						</li>
						<li><i class="icon-weixin" @click='openDia("wx")' /><i @click='openDia("weibo")' class="icon-weibo" /></li>
					</ul>
					<div class="left_btm">
						<img :src="wx" alt="">
						<p>扫描微信公众号</p>
						<el-button icon='icon-qq' @click='openDia("qq")' size="mini">官方客服</el-button>
					</div>
				</div>
				<div class="right">
					<h2 v-if='newsType === "news"' class="r_fip flex f_j_b">
						<p>新闻公告<span>NEWS</span></p>
						<h3><router-link to="/web/index">官网首页</router-link><<新闻公告</h3>
					</h2>
					<h2 v-if='newsType === "gonglve"' class="r_fip flex f_j_b">
						<p>游戏攻略<span>STRATEGY</span></p>
						<h3><router-link to="/web/index">官网首页</router-link><<游戏攻略</h3>
					</h2>
					<div v-if='isDetail' class="news_article">
						<h3 class="title">{{article.title}}</h3>
						<p v-html='article.content'></p>
					</div>
					<div v-else class="article_list">
						<div class="title">
							<el-tabs v-if='newsType === "news"' v-model="activeName" @tab-click="getShowList">
								<el-tab-pane label="热点" name="47">
									<news-item :list='showData' :maxShow="0" label='热点' />
								</el-tab-pane>
								<el-tab-pane label="新闻" name="48">
									<news-item :list='showData' :maxShow="0" label='新闻' />
								</el-tab-pane>
								<el-tab-pane label="活动" name="49">
									<news-item :list='showData' :maxShow="0" label='活动' />
								</el-tab-pane>
							</el-tabs>
							<el-tabs v-if='newsType === "gonglve"' v-model="activeName" @tab-click="getShowList">
								<el-tab-pane label="新手教学" name="50">
									<news-item :list='showData' :maxShow="0" label='新手教学' />
								</el-tab-pane>
								<el-tab-pane label="高手进阶" name="51">
									<news-item :list='showData' :maxShow="0" label='高手进阶' />
								</el-tab-pane>
								<el-tab-pane label="国战咨询" name="52">
									<news-item :list='showData' :maxShow="0" label='国战咨询' />
								</el-tab-pane>
							</el-tabs>
							<el-pagination v-if='pageShow' background @current-change='changePage' layout="prev, pager, next" :total="totals" :page-size="pageSize" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<feet type='#000' />
		<div class="buttom" :style="{backgroundImage:`url(${bg_buttom})`}" />
	</div>
</template>
<style lang='less'>
.news {
	width: 100%;
	min-height: 1600px;
	position: relative;
	.el-pagination {
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.top {
		height: 930px!important;
		background-size: 1920px 930px!important;
	}
	.header {
		position: relative;
		z-index: 1;
		height: 657px;
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
			.logo_w {
				margin-top: 216px;
				width: 382px;
				height: 300px;
			}
			.down {
				margin-top: 10px;
				justify-content: flex-end!important;
			}
		}
	}
	.news_cnt {
		display: flex;
		position: relative;
		z-index: 1;
		width: 80%;
		min-width: 1100px;
		background-color: #fff;
		min-height: 600px;
		margin: auto;
		text-align: left;
		margin-bottom: 200px;
		.left {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			box-sizing: border-box;
			width: 260px;
			color: #fff;
			text-align: center;
			font-size: 24px;
			ul {
				padding: 40px 20px 10px;
			}
			li {
				margin: 10px 0;
				* {
					color: #fff;
					font-size: 24px;
					line-height: 1.2;
				}
				h2 {
					font-size: 33px;
					font-weight: bolder;
				}
				span {
					font-size: 20px;
					color: #4f3802;
				}
				.down_word {
					width: 155px;
					height: 67px;
				}
				a {
					display: flex;
					align-items: center;
					justify-content: center;
				}
				&.qr_code {
					width: 223px;
					height: 223px;
					background-position: center;
					background-size: 223px 223px;
					background-image: url(../assets/images/qr_code/qr_bg.png);
					img {
						width: 180px;
						height: 180px;
					}
				}
				&.down_img {
					flex-direction: column;
					margin-bottom: 38px;
					img {
						margin: 5px 0;
						cursor: pointer;
					}
				}
				[class^="icon-"] {
					cursor: pointer;
				}
			}
			.left_btm {
				padding: 40px 30px;
				flex: 1;
				background-color: #2a304b;
				.icon-qq {
					color: #fff;
					font-size: 18px;
				}
				p {
					font-size: 24px;
					font-weight: bold;
					line-height: 1;
					margin: 10px 0 40px;
				}
				.el-button {
					margin: auto;
					display: flex;
					align-items: center;
					justify-content: center;
					line-height: 1;
					background-color: #967c3a;
					width: 194px;
					height: 54px;
					border-radius: 5px;
					span {
						font-size: 22px;
						color: #fff;
					}
					.icon-qq {
						font-size: 30px;
					}
				}
				img {
					width: 100%;
				}
			}
			[class^="icon-"],
			[class*=" icon-"] {
				font-size: 35px;
			}
		}
		.right {
			display: flex;
			flex-direction: column;
			padding: 20px 30px;
			flex: 1;
			.r_fip {
				border-bottom: 1px solid #000;
				margin-bottom: 10px;
				p {
					font-size: 30px;
					font-weight: bold;
					padding-bottom: 10px;
					line-height: 1;
					span {
						margin-left: 10px;
						color: #e3431e;
					}
				}
				h3,
				a {
					color: #000;
					font-size: 16px;
				}
			}
		}
		.news_article {
			.title {
				font-size: 20px;
				text-align: center;
				font-weight: bold;
				margin: 15px 0;
			}
			* {
				line-height: 1.8
			}
		}
		.article_list {
			position: relative;
			flex: 1;
			.el-tabs__header {
				width: 60%;
				margin: auto auto 15px;
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
					text-align: center;
					&:hover {
						color: #ff2800;
					}
					&.is-active {
						color: #ff2800;
					}
				}
			}
		}
	}
}

</style>
