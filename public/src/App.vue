<template>
    <div id="app">
        <div class="nav">
			<ul>
				<li><span class="logo">{{'school' | translate}}</span></li>
				<li><router-link to="/students">{{'students' | translate}}</router-link></li>
				<li><router-link to="/courses">{{'courses' | translate}}</router-link></li>
				<li><router-link to="/settings">{{'settings' | translate}}</router-link></li>
			</ul>
        </div>
        <router-view/>
    </div>
</template>

<script>
	import EventBus from './utils/eventBus';

    export default {
        name: 'App',
		mounted() {
			EventBus.$on('forceUpdate', ()=> {
				setTimeout(()=> {
					this.$forceUpdate();
				});
			});
		}
    }
</script>

<style lang="scss">
    @import './assets/style.scss';
</style>
<style lang="scss" scoped="true">
.nav {
	height: 40px;
	background-color: #028fcc;
	color: #fff;

	li {
		display: inline-block;
		padding: 0 15px;
		line-height: 40px;

		.logo {
			font-size: 24px;
		}

		a {
			color: #fff;
			text-decoration: none;

			&.router-link-exact-active {
				color: yellow;
			}
		}
	}
}
</style>
