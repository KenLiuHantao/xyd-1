<script>
export default {
	name: 'news-item',
	props: {
		list: {
			type: Array,
			default: arr => []
		},
		maxShow: {
			type: Number || Boolean,
			default: 5
		},
		label: {
			type: String,
			default: '新闻'
		},
		ispc: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {

		}
	},
	methods: {
		getDate(date) {
			return date ? moment(new Date(Number(date * 1000))).format('MM/DD') : '';
		},
		gotoNews(el) {
			console.log(el);
			this.$router.push({ path: `/${this.ispc ? 'web' : 'wap'}/news`, query: { news_id: el.id } })
		}
	}
}

</script>
<template>
	<div class="news_item" :class='ispc ? "" : "wap"'>
		<ul v-if="list && list.length">
			<li v-if="maxShow ? idx < maxShow : true" v-for='(item, idx) in list' :key="item.id" @click="gotoNews(item)">
				<h2><span>【{{label}}】</span>{{item.title}}</h2>
				<p>[{{getDate(item.create_time)}}]</p>
			</li>
		</ul>
		<div class="no_info flex" v-else>
			暂无相关讯息~
		</div>
	</div>
</template>
<style lang='less'>
.news_item {
	&.wap {
		ul {
			min-height: 2.5rem;
			padding-left: 0;
		}
		li {
			height: .5rem;
			font-size: .24rem;
			border-bottom: .01rem solid #ddd;
			padding-right: 0;
			* {
				font-size: .24rem;
			}
			span {
				width: auto;
			}
		}
		.no_info {
			min-height: 2.5rem;
			font-size: .24rem;
		}
	}
	ul {
		min-height: 765px;
		box-sizing: border-box;
		list-style: square;
		padding-left: 20px;
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		border-bottom: 1px dashed #000;
		padding-right: 20px;
		font-size: 14px;
		list-style: square;
		cursor: pointer;
		&:hover {
			color: #ff2800;
			border-color: #ff2800
		}
		* {
			font-size: 16px;
		}
		h2 {
			text-align: left;
			width: 80%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		span {
			display: inline-block;
			width: auto;
		}
	}
}

</style>
