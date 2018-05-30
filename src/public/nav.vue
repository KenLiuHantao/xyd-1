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
	position: absolute;
	width: 1150px;
	left: 50%;
	margin-left: -575px;
	z-index: 1000;
	padding: 20px;
	right: 0;
	ul {
		margin-left: 400px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		li {
			transition: all .1s linear;
			padding: 0 10px;
			.lin {
				transition: all .1s linear;
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
				font-size: 28px;
				font-weight: bold;
				transition: all .1s linear;
			}
			&:hover {
				a {
					color: #ff2800;
					transition: all .1s linear;
				}
				.lin {
					border-color: #ff2800;
					transition: all .1s linear;
				}
			}
		}
	}
}

</style>
