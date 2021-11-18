<template>
	<header>
		<img src="../static/logo_large.png" class="logo" />
		<nav>
			<router-link to="/" class="menu-item-top">Home</router-link>
			<div class="container" :class="{ show: showSidebar }">
				<div class="control">
					<fa class="bottum" icon="bars" @click="showNav"></fa>
				</div>
				<div class="sideBarItems">
					<div class="navigation-icons">
						<o-icon v-show="showLink" class="bottum" icon="home" @click="router.push('/')" />
						<o-icon v-show="showLink" v-if="store.state.user.isAuthenticated" class="bottum" icon="account" />
						<o-icon
							v-show="showLink"
							v-if="store.state.user.isAuthenticated && store.state.user.isAdmin"
							class="bottum"
							icon="glass-cocktail"
							@click="router.push('/addRecept')"
						/>
						<o-icon
							v-show="showLink"
							v-if="store.state.user.isAuthenticated && store.state.user.isAdmin"
							class="bottum"
							icon="fruit-watermelon"
							@click="router.push('/zutat')"
						/>
						<o-icon
							v-show="showLink"
							v-if="store.state.user.isAuthenticated"
							class="bottum"
							icon="party-popper"
							@click="router.push('/party')"
						/>
						<o-icon
							v-show="showLink"
							v-if="store.state.user.isAuthenticated"
							class="bottum"
							icon="star"
							@click="router.push('/favorite')"
						/>
						<o-icon
							v-show="showLink"
							v-if="store.state.user.isAuthenticated"
							class="bottum"
							icon="glass-cocktail"
							@click="router.push('/Bartender')"
						/>
					</div>
					<div class="navigation-links">
						<transition-group name="fade">
							<div v-show="showLink" key="1" @click="router.push('/')">Home</div>
							<div v-show="showLink" v-if="store.state.user.isAuthenticated" key="2" @click="router.push('/Settings')">Settings</div>
							<div
								v-show="showLink"
								v-if="store.state.user.isAuthenticated && store.state.user.isAdmin"
								key="3"
								@click="router.push('/addRecept')"
							>
								Add Rezept
							</div>
							<div
								v-show="showLink"
								v-if="store.state.user.isAuthenticated && store.state.user.isAdmin"
								key="4"
								@click="router.push('/zutat')"
							>
								Add Zutat
							</div>
							<div v-show="showLink" v-if="store.state.user.isAuthenticated" key="5" @click="router.push('/party')">Party</div>
							<div v-show="showLink" v-if="store.state.user.isAuthenticated" key="6" @click="router.push('/favorite')">Favoriten</div>
							<div v-show="showLink" v-if="store.state.user.isAuthenticated" key="6" @click="router.push('/Bartender')">Bartender</div>
						</transition-group>
					</div>
				</div>
			</div>
			<div v-if="store.state.user.isAuthenticated">
				<router-link to="/" class="menu-item-top" @click="store.dispatch('logout')">Logout</router-link>
			</div>
			<div v-else>
				<router-link to="/login" class="menu-item-top">Login</router-link>
			</div>
		</nav>
		<nav>
			<div class="menu-item" @click="router.push('/random')">
				<o-icon icon="shuffle" />
			</div>
			<div class="menu-item" @click="router.push('/all')">
				<o-icon icon="database" />
			</div>
		</nav>
	</header>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// https://materialdesignicons.com/
import {
	mdiShuffle,
	mdiDatabase,
	mdiFilter,
	mdiMenu,
	mdiHome,
	mdiMagnify,
	mdiAccount,
	mdiPlus,
	mdiGlassCocktail,
	mdiFruitWatermelon,
	mdiPartyPopper,
	mdiStar,
} from '@mdi/js';
import { registerIcons } from '../Icon';
import Cocktail from 'server/src/interfaces/IECocktails';

registerIcons({
	mdiDatabase,
	mdiShuffle,
	mdiFilter,
	mdiMenu,
	mdiHome,
	mdiMagnify,
	mdiAccount,
	mdiPlus,
	mdiGlassCocktail,
	mdiFruitWatermelon,
	mdiPartyPopper,
	mdiStar,
});

export default {
	setup() {
		const alkoholForm = false;
		const store = useStore();
		const router = useRouter();
		const showLink = ref(false);
		const showSidebar = ref(false);
		const search = ref('');
		const searchRezept = ref(true);
		const selected = ref(null);
		const rezepte = computed(() => store.state.allCocktails);

		function showNav(): void {
			if (showSidebar.value) {
				showSidebar.value = false;
				setTimeout(() => {
					showLink.value = false;
				});
			} else {
				showSidebar.value = true;
				setTimeout(() => {
					showLink.value = true;
				}, 500);
			}
		}

		const filteredRezeptArray = computed(() => {
			console.log(search);
			return rezepte.value.filter((option: Cocktail) => {
				return option.name.toLowerCase().match(search.value?.toLowerCase());
			});
		});
		const filteredZutatArray = computed(() => {
			console.log(search);
			return rezepte.value.filter((option: Cocktail) => {
				console.log(option);
				return option.zutaten.find((Element) => Element.name.toLowerCase().match(search.value?.toLowerCase()));
			});
		});

		return {
			showSidebar,
			showLink,
			showNav,
			search,
			rezepte,
			selected,
			filteredRezeptArray,
			searchRezept,
			filteredZutatArray,
			router,
			store,
			alkoholForm,
		};
	},
};
</script>

<style lang="scss">
header {
	background-image: url('../static/BackgroundImage.jpg');
	top: 0;
	color: #ffffff;
	width: 100%;
	z-index: 999;
	border-bottom: 7px solid #000000;

	.logo {
		width: 11%;
		display: block;
		margin: 0 auto;
		padding-top: 3px;
		padding-bottom: 3px;
	}

	.o-switch__label {
		color: #000000;
	}

	p {
		color: #000000;
	}
}

a {
	color: #ffffff;
	text-decoration: none;
}

nav {
	display: flex;
	align-items: center;
	justify-content: center;
}

nav .menu-item {
	color: blue($color: #000000);
	padding: 10px 40px;
	position: relative;

	text-align: center;
	border-bottom: 3px solid transparent;

	display: flex;
	transition: 400ms;
}

nav .menu-item.active,
nav .menu-item:hover {
	background-color: rgb(0, 0, 0);
	border-block-color: #e1cc81;
}

nav .menu-item a {
	color: inherit;
	text-decoration: none;
}

nav .menu-item-top {
	color: blue($color: #000000);
	padding: 10px 30px;
	position: relative;
	text-align: center;
	border-bottom: 3px solid transparent;
	display: flex;
	transition: 400ms;
}

nav .menu-item-logout {
	color: #ffffff;
	background-color: #ffffff00;
	padding: 10px 30px;
	position: relative;
	text-align: center;
	border: 0px solid transparent;
	display: flex;
	transition: 400ms;

	nav .menu-item-logout.active,
	nav .menu-item-logout:hover {
		background-color: #000000;
		border-block-color: #e1cc81;
	}
}

nav .menu-item-top.active,
nav .menu-item-top:hover {
	background-color: #000000;
	border-block-color: #e1cc81;
}

nav .menu-item-top a {
	color: inherit;
	text-decoration: none;
}

.container {
	position: fixed;
	top: 0;
	left: 0;
	color: #000000;
	transition: all 500ms ease-in-out;
	z-index: 999;
	min-height: 0;
	animation: slideout 500ms ease-in-out;
	animation-fill-mode: forwards;

	.control {
		align-items: center;

		.bottum {
			cursor: pointer;
			transition: all 500ms ease-in-out;
			font-size: 50px;
			margin: 20px;
			background-color: #ffffff;
			width: 50px;
			border-radius: 5px;
			border: 2px solid #000000;
		}
	}

	&.show {
		background-color: #ffffff;
		animation: slidein 500ms ease-in-out;
		animation-fill-mode: forwards;
		animation-direction: alternate;

		.control > .bottum {
			color: #000000;
			transform: rotateZ(-180deg);
		}
	}

	.navigation-icons {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 50px;
		float: left;

		.bottum {
			padding: 15px 0;
			cursor: pointer;
			transition: all 500ms ease-in-out;

			&:hover {
				color: #000000;
			}
		}
	}

	.navigation-links {
		padding-top: 18px;
		float: left;
		color: #000000;
		font-weight: 900;

		div {
			padding-left: 10px;
			margin-bottom: 35px;
			cursor: pointer;

			&:hover {
				color: #000000;
			}
		}
	}
}

@keyframes slidein {
	0% {
		height: 0%;
		width: 180px;
	}

	100% {
		height: 100%;
		width: 180px;
	}
}
@keyframes slideout {
	100% {
		height: 0%;
		width: 180px;
	}

	0% {
		height: 100%;
		width: 180px;
	}
}

// CSS MEDIA QUERYS Für SideBar !!!!!!!!!!!!!!!!!!!!!!!!!!
@media only screen and (max-width: 599px) {
	@keyframes slidein {
		0% {
			height: 0%;
			width: 0%;
		}

		100% {
			height: 100%;
			width: 100%;
		}
	}
	@keyframes slideout {
		100% {
			height: 0%;
			width: 0%;
		}

		0% {
			height: 100%;
			width: 100%;
		}
	}
}
@media only screen and (max-width: 600px) {
	@keyframes slidein {
		0% {
			height: 0%;
			width: 0%;
		}

		100% {
			height: 100%;
			width: 100%;
		}
	}
	@keyframes slideout {
		100% {
			height: 0%;
			width: 0%;
		}

		0% {
			height: 100%;
			width: 100%;
		}
	}
}
@media only screen and (max-width: 1080px) {
	.container {
		.sideBarItems {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.icon {
			height: 48px;
		}

		.navigation-links {
			padding-top: 0;
			font-size: 35px;

			div {
				padding: 45px 0;
				padding-left: 20px;
				margin-bottom: 0;
			}
		}

		.control {
			align-items: center;
			background-color: #a9a9a9;
		}

		.navigation-icons .bottum {
			padding: 45px 0;
			cursor: pointer;
			transition: all 500ms ease-in-out;
		}
	}

	@keyframes slidein {
		0% {
			height: 0%;
			width: 0%;
		}

		100% {
			height: 100%;
			width: 100%;
		}
	}
	@keyframes slideout {
		100% {
			height: 0%;
			width: 0%;
		}

		0% {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
