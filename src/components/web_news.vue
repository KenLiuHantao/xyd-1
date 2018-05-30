<script>
import logo from 's/logo.png';
import banner from 's/images/index/bg/bg_top.jpg';
import logo_w from 's/images/cover/logo.png';
import bg_buttom from 's/images/index/bg/bg_buttom.jpg';
import qr_bg from 's/images/qr_code/code_bg.png';
import wx from 's/images/qr_code/wx.png';
import download from 's/images/qr_code/download.png';

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
			loading: false,
			article: {},
			initData: {},
			isDetail: false,
			activeName: 'hots',
			dia_show: false,
			dia_type: 'qq',
			pageSize: 10,
			pageIndex: 1,
			totals: 0,
			showData: [],
			pageShow:false
		}
	},
	beforeRouteUpdate(to, from, next) {
		if (to.query.news_id) {
			this.getArticle(to.query.news_id);
			this.isDetail = true;
		} else {
			if (this.newsType === 'gonglve') this.activeName = 'newbie';
			if (this.newsType === 'news') this.activeName = 'hots';
			this.isDetail = false;
			this.getInfo();
		};

		next();
	},
	mounted() {
		let isDetail = this.$route.query.news_id || false;
		this.isDetail = isDetail;
		this.activeName = this.newsType === 'news' ? 'hots' : 'newbie';
		isDetail ? this.getArticle(isDetail) : this.getInfo();
	},
	computed: {
		newsType() {
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
		async getInfo() {
			this.loading = true;
			let data = await this.$http.jsonp(z.jsonp + '/home/getLists');
			let initData = data.data.list;
			this.initData = initData;
			this.getShowList();
			this.loading = false;
		},
		getShowList() {
			let arr = this.initData[this.activeName],
				start_idx = (this.pageIndex - 1) * this.pageSize,
				end_idx = this.pageSize * this.pageIndex;
			this.pageShow = (arr.length > this.pageSize);
			this.totals = arr.length ? arr.length : 0;
			this.showData = arr.length ? arr.slice(start_idx, end_idx) : [];
		},
		openDia(type) {
			this.dia_show = true;
			this.dia_type = type;
		},
		changePage(idx) {
			this.pageIndex = idx;
			this.getShowList();
		}
	}
}

</script>
<template>
	<div class="news">
		<div class="loading" v-show='loading' v-loading='loading' />
		<div class="top" :style="{backgroundImage:`url(${banner})`}" />
		<dia :show.sync='dia_show' :type='dia_type' @cb='dia_show = false' />
		<div class="header">
			<div class="word_r">
				<img :src="logo" class='logo'>
				<img :src="logo_w" class='logo_w'>
			</div>
		</div>
		<div class="news_cnt">
			<div class="left" :style="{backgroundImage:`url(${qr_bg})`}">
				<ul>
					<li>
						<h2>立即下载</h2>
						<span>DOWNLOAD</span>
					</li>
					<li class="qr_code">
						<img :src="download" alt="">
					</li>
					<li @click='openDia("qidai")'><a href="javascript:;"><i class="icon-ios"/>IOS下载</a></li>
					<li @click='openDia("qidai")'><a href="javascript:;"><i class="icon-anzhuo"/>安卓下载</a></li>
					<li><i class="icon-weixin" @click='openDia("wx")' /><i @click='openDia("weibo")' class="icon-weibo" /></li>
				</ul>
				<div class="left_btm">
					<img :src="wx" alt="">
					<p>扫描微信公众号</p>
					<el-button icon='icon-qq' @click='openDia("qq")' size="mini">官方客服</el-button>
				</div>
			</div>
			<div class="right">
				<h2 v-if='newsType === "news"' class="r_fip">新闻公告<span>NEWS</span></h2>
				<h2 v-if='newsType === "gonglve"' class="r_fip">游戏攻略<span>STRATEGY</span></h2>
				<div v-if='isDetail' class="news_article">
					<h3 class="title">{{article.title}}</h3>
					<p v-html='article.content'></p>
				</div>
				<div v-else class="article_list">
					<div class="title">
						<el-tabs v-if='newsType === "news"' v-model="activeName" @tab-click="getShowList">
							<el-tab-pane label="热点" name="hots">
								<news-item :list='showData' :maxShow="0" label='热点' />
							</el-tab-pane>
							<el-tab-pane label="新闻" name="news">
								<news-item :list='showData' :maxShow="0" label='新闻' />
							</el-tab-pane>
							<el-tab-pane label="活动" name="activities">
								<news-item :list='showData' :maxShow="0" label='活动' />
							</el-tab-pane>
						</el-tabs>
						<el-tabs v-if='newsType === "gonglve"' v-model="activeName" @tab-click="getShowList">
							<el-tab-pane label="新手教学" name="newbie">
								<news-item :list='showData' :maxShow="0" label='新手教学' />
							</el-tab-pane>
							<el-tab-pane label="高手进阶" name="geek">
								<news-item :list='showData' :maxShow="0" label='高手进阶' />
							</el-tab-pane>
							<el-tab-pane label="国战咨询" name="war">
								<news-item :list='showData' :maxShow="0" label='国战咨询' />
							</el-tab-pane>
						</el-tabs>
						<el-pagination v-if='pageShow' background @current-change='changePage' layout="prev, pager, next" :total="totals" :page-size="pageSize" />
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
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 0;
		width: 100%;
		height: 900px;
		background-position: top;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.buttom {
		position: absolute;
		bottom: 180px;
		z-index: 0;
		width: 100%;
		height: 900px;
		background-position: bottom;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.header {
		position: relative;
		z-index: 1;
		height: 490px;
		.word_r {
			width: 300px;
			padding-top: 8%;
			margin-left: 55%;
			img {
				display: block;
			}
		}
		.logo {
			margin: auto;
			width: 150px;
		}
		.logo_w {
			width: 300px;
			margin-bottom: 10px;
		}
	}
	.news_cnt {
		display: flex;
		position: relative;
		z-index: 1;
		width: 80%;
		min-width: 1280px;
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
				padding: 30px 40px;
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
				a {
					display: flex;
					align-items: center;
					justify-content: center;
				}
				img {
					box-sizing: border-box;
					padding: 10px;
					border: 2px solid #fff;
					width: 100%;
					height: 100%;
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
					font-size: 20px;
					font-weight: bold;
					line-height: 1.5;
					margin: 10px 0 30px;
				}
				.el-button {
					margin: auto;
					display: flex;
					align-items: center;
					justify-content: center;
					line-height: 1;
					background-color: #967c3a;
					span {
						font-size: 18px;
						color: #fff;
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
				font-size: 30px;
				font-weight: bold;
				padding-bottom: 10px;
				line-height: 1;
				border-bottom: 1px solid #000;
				margin-bottom: 10px;
				span {
					margin-left: 10px;
					color: #e3431e;
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
