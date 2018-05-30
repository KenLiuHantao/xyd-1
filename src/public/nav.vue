<script>
export default {
	name: 'x-head',
	data() {
		return {
			nav: [
				{ name: '首页', link: '#/web/index' },
				{ name: '新闻公告', link: '#/web/news?type=news' },
				{ name: '游戏攻略', link: '#/web/news?type=gonglve' },
				{ name: '武将介绍', link: '#wujiang' },
				{ name: '兵种介绍', link: '#bingzhong' }
			]
		}
	}
}

</script>
<template>
	<div class="nav">
		<ul>
			<li v-for='(item, idx) in nav' :key='idx'>
				<a :href="item.link"><i class="lin"/>{{item.name}}</a>
			</li>
		</ul>
	</div>
</template>
<style lang='less'>
.nav {
	position: relative;
	z-index: 1;
	padding: 20px;
	ul {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 40px;
		li {
			padding: 0 20px;
			.lin {
				display: inline-block;
				width: 10px;
				height: 10px;
				border: 1px solid #fff;
				transform: rotate(45deg);
				margin-right: 10px;
			}
			a {
				display: flex;
				align-items: center;
				color: #fff;
				font-size: 25px;
				font-weight: bold;
			}
			&:hover {
				a {
					color: #ff2800;
				}
				.lin {
					border-color: #ff2800;
				}
			}
		}
	}
}

</style>
