<template>
	<body>
		<div class="all-recepies center">
			<h1>Random Rezept</h1>
			<div class="normalButton" @click="store.dispatch('loadRandomCocktail')">
				<fa icon="random" />
				<p text align="center">click me</p>
			</div>

			<table class="tableRandom">
				<tr>
					<th>{{ store.state.randomCocktail.name }}</th>
				</tr>
				<tr>
					<th>
						<img :src="store.state.randomCocktail.bild" width="150" height="150" class="bild" />
					</th>
				</tr>
				<tr>
					<td>Alkohol:</td>
					<td>{{ store.state.randomCocktail.alkohol ? 'Ja' : 'Nein' }}</td>
				</tr>
				<tr>
					<td>Anleitung:</td>
					<td>{{ store.state.randomCocktail.anleitung }}</td>
				</tr>
				<tr>
					<td class="tdPadding">Zutaten:</td>
					<td class="directionary" v-for="(item, key) in store.state.randomCocktail.zutaten" v-bind:key="key">
						{{ item.name }}
					</td>
				</tr>
				<tr>
					<td>Utensil:</td>
					<td class="directionary" v-for="(item, key) in store.state.randomCocktail.utensil" v-bind:key="key">
						{{ item }}
					</td>
				</tr>
				<tr>
					<td>Schwierigkeit:</td>
					<td>{{ store.state.randomCocktail.diff }}</td>
				</tr>
			</table>
		</div>
	</body>
</template>

<script lang="ts">
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();

		return {
			store,
			shuffleShowMe: store.state.shuffleShowMe,
		};
	},
};
</script>

<style lang="scss">
h1 {
	text-align: center;
}

.all-recepies {
	color: #000000;

	.center {
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin: auto;
	}

	.tableRandom {
		margin: auto;
		border: 50px solid transparent;
		border-image: url('../static/Frame.png');
		border-image-slice: 25%;
	}

	.bild {
		border: 2px solid #000000;
	}

	p {
		font-size: 20px;
	}
}
// CSS MEDIA QUERYS
@media only screen and (max-width: 599px) {
	.all-recepies {
		.tableRandom {
			width: 100%;
			margin-bottom: 30%;
		}

		.normalButton {
			margin: auto 0 0;
			text-align: center;
			font-size: 100px;
			transition: 300ms;
			padding-left: 10px;
			padding-right: 10px;
			padding-top: 10px;
			padding-bottom: 10px;
		}
	}
}
@media only screen and (min-width: 600px) {
	.all-recepies {
		.tableRandom {
			width: 100%;
			margin-bottom: 10%;
		}

		.normalButton {
			margin: auto 0 0;
			text-align: center;
			font-size: 100px;
			transition: 300ms;
			padding-left: 10px;
			padding-right: 10px;
			padding-top: 10px;
			padding-bottom: 10px;
		}
	}
}
@media only screen and (min-width: 980px) {
	.all-recepies {
		.tableRandom {
			width: 70%;
		}

		.normalButton {
			margin: auto 45% 1%;
			text-align: center;
			font-size: 100px;
			transition: 300ms;
			padding-left: 10px;
			padding-right: 10px;
			padding-top: 10px;
			padding-bottom: 10px;
		}
	}
}
@media only screen and (min-width: 1260px) {
	.all-recepies {
		.tableRandom {
			width: 70%;
		}
	}
}
</style>
