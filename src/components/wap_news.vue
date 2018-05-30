<script>
import qr_bg from 's/images/qr_code/code_bg.png';

export default {
	data() {
		return {
			qr_bg,
			loading: false,
			article: {},
			initData: {},
			isDetail: false,
			activeName: 'hots',
			dia_show: false,
			dia_type: 'qq',
			pageSize: 13,
			pageIndex: 1,
			totals: 0,
			showData: [],
			pageShow:false
		}
	},
	mounted() {
		let isDetail = this.$route.query.news_id || false;
		this.isDetail = isDetail;
		this.activeName = this.newsType === 'news' ? 'hots' : 'newbie';
		isDetail ? this.getArticle(isDetail) : this.getInfo();
	},
	beforeRouteUpdate(to, from, next) {
		if (to.query.news_id) {
			this.getArticle(to.query.news_id);
			this.isDetail = true;
		} else {
			if (this.newsType === 'gonglve') this.activeName = 'newbie';
			if (this.newsType === 'news') this.activeName = 'hots';
			console.log(this.newsType,this.activeName);
			this.isDetail = false;
			this.getInfo();
		};
		next();
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
		gotoIdx(type) {
			this.$router.push(`/wap/${type}`);
		},
		changePage(idx) {
			this.pageIndex = idx;
			this.getShowList();
		}
	}
}

</script>
<template>
	<div class="wap_news">
		<div class="w_title flex f_j_s">
			<h2 v-if='!isDetail' class="flex" @click='gotoIdx("index")'><i class="el-icon-arrow-left"/>官方首页</h2>
			<h2 v-if='isDetail' class="flex" @click='gotoIdx("news")'><i class="el-icon-arrow-left"/>返回列表</h2>
			<h3 v-if='!isDetail' class="flex">{{newsType === "gonglve" ? '游戏攻略' : '新闻资讯'}}</h3>
		</div>
		<div class="w_cnt">
			<el-tabs v-if='newsType === "news" && !isDetail' v-model="activeName" @tab-click="getShowList">
				<el-tab-pane label="热点" name="hots">
					<news-item :ispc='false' :list='showData' :maxShow="0" label='热点' />
				</el-tab-pane>
				<el-tab-pane label="新闻" name="news">
					<news-item :ispc='false' :list='showData' :maxShow="0" label='新闻' />
				</el-tab-pane>
				<el-tab-pane label="活动" name="activities">
					<news-item :ispc='false' :list='showData' :maxShow="0" label='活动' />
				</el-tab-pane>
			</el-tabs>
			<el-tabs v-if='newsType === "gonglve" && !isDetail' v-model="activeName" @tab-click="getShowList">
				<el-tab-pane label="新手教学" name="newbie">
					<news-item :ispc='false' :list='showData' :maxShow="0" label='新手教学' />
				</el-tab-pane>
				<el-tab-pane label="高手进阶" name="geek">
					<news-item :ispc='false' :list='showData' :maxShow="0" label='高手进阶' />
				</el-tab-pane>
				<el-tab-pane label="国战咨询" name="war">
					<news-item :ispc='false' :list='showData' :maxShow="0" label='国战咨询' />
				</el-tab-pane>
			</el-tabs>
			<el-pagination background v-if='pageShow' @current-change='changePage' layout="prev, pager, next" :total="totals" :page-size="pageSize" />
			<div v-if='isDetail' class="news_article">
				<h3 class="w_d_title">{{article.title}}</h3>
				<p v-html='article.content'></p>
			</div>
			<h2 v-if='isDetail' class="flex" @click='gotoIdx("news")'><i class="el-icon-arrow-left"/>返回列表</h2>
		</div>
		<feet type='#000' :ispc='false' />
	</div>
	</div>
</template>
<style lang='less'>
.wap_news {
	padding-top: 1rem;
	.el-pagination {
		margin-top: .2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		li:not(.disabled).active {
			background-color: #ff9900!important;
		}
	}
	.w_title {
		position: relative;
		margin-top: .5rem;
		margin-bottom: .3rem;
		h2 {
			font-size: .24rem;
			position: absolute;
			left: .2rem;
		}
		h3 {
			background: url(../assets/images/wap/new_bg.png) no-repeat;
			margin: auto;
			width: 1.96rem;
			height: .54rem;
			background-size: 100% 100%;
			text-align: center;
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
	.news_article {
		box-sizing: border-box;
		padding: .2rem .3rem;
		text-align: left;
		font-size: .23rem;
		* {
			font-size: .23rem;
		}
		.w_d_title {
			font-size: .28rem;
			line-height: 1.5;
			padding: .2rem 0;
			margin: 0;
			border-bottom: 1px solid #ddd;
			margin-bottom: .3rem;
			text-align: center;
		}
		img {
			width: 100%;
		}
	}
	.wap {
		height: 7rem;
		ul {
			padding: 0 .2rem;
		}
	}
}

</style>
