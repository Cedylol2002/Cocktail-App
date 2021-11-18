<template>
	<div id="app" class="app">
		<TheHeader />
		<router-view />
		<TheFooter />
	</div>
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
	name: 'App',

	components: {
		TheHeader,
		TheFooter,
	},

	setup() {
		const store = useStore();
		onMounted(() => {
			store.dispatch('loadAllCocktails');
			store.dispatch('loadAllZutaten');
			store.dispatch('loadAllUtensil');
			store.dispatch('getloggedInUser');
		});
		return {};
	},
};

var mode = 'dark';
try {
	mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
} catch (e) {
	// Funktion vom Browser nicht unterstützt.
}
</script>

<style lang="scss">
@import '../node_modules/@oruga-ui/oruga-next/dist/oruga-full-vars.css';

html,
body {
	// overflow-x: hidden;
	font-family: 'Montserrat', 'Arial', 'Helvetica', sans-serif;
	min-height: 100vh;
	padding: 0%;
	margin: 0%;
}

th,
tr {
	width: 150px;
}

.icon {
	height: 24px;
}

/* Positions Icons on the same height as text */
.o-icon {
	vertical-align: bottom;

	.o-tooltip-content & {
		vertical-align: middle;
	}
}

.app {
	position: relative;
	overflow: auto;
	height: 100vh;
}

.directionary {
	display: flex;
	flex-direction: column;
}

.normalButton {
	margin: auto;
	text-align: center;
	font-size: 100px;
	transition: 300ms;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 10px;
	padding-bottom: 10px;
	margin-right: 45%;
	margin-left: 45%;
	margin-bottom: 1%;

	&::after {
		position: absolute;
		content: '';
		left: 0;
		top: 0;
		height: 4px;
		width: 100%;
		border-top: 4px solid transparent;
		border-right: 4px solid transparent;
		box-sizing: border-box;
		transform: translateX(-100%);
	}

	&:hover {
		box-shadow: 0 5px 15px rgb(0, 0, 0);

		&::before,
		&::after {
			border-color: #000000;
			height: 100%;
			transition: 300ms transform linear, 0.3 height linear 0.3;
		}
	}
}

//DARK MODE WIRD HIER EINGESTELLT
@media (prefers-color-scheme: dark) {
	body {
		background-color: #333333;
		color: #e2e2e2;
	}

	h1,
	h2,
	h3,
	h4,
	h5 {
		color: #f4f4f4;
	}

	img {
		filter: grayscale(20%);
	}

	hr {
		border-color: #555555;
	}

	p code {
		color: #333333;
	}

	.tableData {
		color: #ffffff;
	}

	.FilterContainer {
		color: #ffffff;

		.icon {
			color: #000000;
		}
	}

	.normalButton {
		color: #ffffff;
	}

	.tableRandom {
		color: #ffffff;
	}

	.modal-card {
		color: #ffffff;
	}

	form {
		.icon {
			color: #000000;
		}
	}

	.o-field__label {
		color: #ffffff;
	}

	.submit {
		color: #ffffff;
	}

	.o-chk {
		color: #ffffff;
	}

	.o-btn {
		color: #ffffff;
		border-color: #ffffff;
	}

	.o-input__icon-left {
		color: #000000;
	}

	/* Hiermit können Safari >=1.1, Opera >=9.5, IE9 was anfangen */

	p::selection {
		background: rgba(255, 255, 255, 0);
		color: #ffffff;
	}

	/* und hiermit der Firefox >=1 */

	p::-moz-selection {
		background: rgba(0, 0, 0, 0);
		color: #ffffff;
	}

	.edit-cocktail {
		color: #ffffff;
	}

	.create-cocktail {
		color: #ffffff;

		.o-switch__label {
			color: #ffffff;
		}

		.o-slide__tick-label {
			color: #ffffff;
		}

		.o-sel .o-sel--placeholder .o-sel-arrow {
			color: #ffffff;
		}
	}
}

//WHITE MODE EINSTELLUNGEN
@media (prefers-color-scheme: light) {
	body {
		background-color: #ffffff;
		color: #000000;
	}

	h1,
	h2,
	h3,
	h4,
	h5 {
		color: #000000;
	}

	.tableData {
		color: #000000;
	}

	.FilterContainer {
		color: #ffffff;

		.o-switch__label {
			color: #ffffff;
		}

		.o-icon--clickable .o-input__icon-right {
			color: #000000;
		}
	}

	.normalButton {
		color: #000000;
	}

	.tableRandom {
		color: #000000;
	}

	.modal-card {
		color: #000000;
	}

	.o-field__label {
		color: #000000;
	}

	.submit {
		color: #000000;
	}

	.o-chk {
		color: #000000;
	}

	img {
		filter: grayscale(20%);
	}

	hr {
		border-color: #555555;
	}

	p code {
		color: #333333;
	}

	.o-btn {
		color: #000000;
		border-color: #000000;
	}

	.o-input__icon-left {
		color: #000000;
	}

	/* Hiermit können Safari >=1.1, Opera >=9.5, IE9 was anfangen */
	p::selection {
		background: rgba(255, 255, 255, 0);
		color: #000000;
	}

	/* und hiermit der Firefox >=1 */

	p::-moz-selection {
		background: rgba(0, 0, 0, 0);
		color: #000000;
	}

	form {
		.icon {
			color: #000000;
		}
	}

	.create-cocktail {
		color: #000000;

		.o-switch__label {
			color: #000000;
		}

		.o-slide__tick-label {
			color: #000000;
		}
	}

	.edit-cocktail {
		color: #000000;
	}
}
</style>
