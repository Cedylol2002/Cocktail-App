<template>
	<body>
		<div class="all-recepies center">
			<h1>Alle Rezepte</h1>
			<div class="FilterContainer">
				<h1>Filter</h1>
				<o-switch v-model="alkohol">{{ alkohol ? 'Cock' : 'Mock' }} </o-switch>
				<o-switch v-model="sortierung">{{ sortierung ? sortRezepteASC() : sortRezepteDESC() }} </o-switch>
				Zutaten:
				<div class="searcher">
					<o-autocomplete
						rounded
						expanded
						v-model="searchzutat"
						open-on-focus
						:data="filterByZutatByName"
						placeholder="z.b. Banane"
						icon="magnify"
						clearable
						field="name"
						@select="(option) => (selectedzutat = option)"
					>
						<template v-slot:empty>No results found</template>
					</o-autocomplete>
					Utensilien:
					<o-autocomplete
						rounded
						expanded
						v-model="searchutensil"
						open-on-focus
						:data="filterByUtensilienByName"
						placeholder="z.b. Shaker"
						clearable
						icon="magnify"
						field="name"
						@select="(option) => (selectedutensil = option)"
					>
						<template v-slot:empty>No results found</template>
					</o-autocomplete>
					Rezept:
					<o-autocomplete
						rounded
						expanded
						open-on-focus
						v-model="searchrezept"
						:data="filteredRezepteArray"
						placeholder="z.b. Mojito"
						icon="magnify"
						clearable
						field="name"
						@select="(option) => (selectedrezept = option)"
					>
						<template v-slot:empty>No results found</template>
					</o-autocomplete>
				</div>
			</div>
			<div v-for="value in filteredHasAlkoholArray" v-bind:key="value">
				<table class="tableData">
					<div class="center">
						<tr>
							<th>{{ value.name }}</th>
						</tr>
						<tr>
							<th><img :src="value.bild" width="150" height="150" class="bild" /></th>
						</tr>
					</div>
					<tr>
						<td>Alkohol:</td>
					</tr>
					<tr>
						<td class="item">{{ value.alkohol ? 'Ja' : 'Nein' }}</td>
					</tr>
					<tr>
						<td>Anleitung:</td>
					</tr>
					<tr>
						<td class="anleitung item">{{ value.anleitung }}</td>
					</tr>
					<tr>
						<td>Zutaten:</td>
					</tr>
					<tr>
						<td class="directionary" v-for="(item, key) in value.zutaten" v-bind:key="key">
							{{ item.name }} - {{ item.menge }}{{ item.einheit }}
						</td>
					</tr>
					<tr>
						<td class="item"></td>
					</tr>

					<tr>
						<td>
							<div>Utensil:</div>
						</td>
					</tr>
					<tr>
						<td class="directionary" v-for="(item, key) in value.utensil" v-bind:key="key">
							{{ item }}
						</td>
					</tr>
					<tr>
						<td class="item"></td>
					</tr>
					<tr>
						<td>Schwierigkeit: {{ value.diff }}</td>
					</tr>
					<tr>
						<td></td>
						<td class="edit">
							<o-button v-if="store.state.user.isAdmin" @click="loadEdit(value.name)">Edit</o-button>
						</td>
						<td class="edit">
							<o-button v-if="store.state.user.isAdmin" @click="loadEdit(value.name)">Bestellen</o-button>
						</td>
						<td class="edit">
							<div v-if="includes(value)">
								<o-button
									v-if="store.state.user.isAuthenticated"
									@click="store.dispatch('RemoveFromFavorites', value)"
									iconRight="star"
								/>
							</div>
							<div v-else>
								<o-button
									@click="store.dispatch('AddToFavorites', value).then(store.state.dispatch('UpdateUser'))"
									v-if="store.state.user.isAuthenticated"
									iconRight="star-outline"
								/>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</body>
</template>

<script lang="ts">
// https://materialdesignicons.com/
import { mdiDatabase, mdiStar, mdiStarOutline, mdiMagnify, mdiCloseCircle } from '@mdi/js';
import { registerIcons } from '../Icon';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Cocktail, { Zutat } from '../../server/src/interfaces/IECocktails';
import IEUtensilien from '../../server/src/interfaces/IEUtensilien';
import { useRouter } from 'vue-router';
registerIcons({
	mdiDatabase,
	mdiStar,
	mdiStarOutline,
	mdiMagnify,
	mdiCloseCircle,
});

export default {
	setup() {
		const router = useRouter();
		const store = useStore();
		const searchzutat = ref('');
		const searchrezept = ref('');
		const searchutensil = ref('');
		const alkohol = ref(true);
		const sortierung = ref(false);
		const selectedzutat = ref();
		const selectedrezept = ref();
		const selectedutensil = ref();
		const zutaten = computed(() => store.state.zutaten);
		const rezepte = computed(() => store.state.allCocktails);
		const utensilien = computed(() => store.state.allUtensil);

		const filterByUtensilienByName = computed(() => {
			return utensilien.value.filter((option: IEUtensilien) => {
				return option.name.toUpperCase().match(searchutensil.value?.toLowerCase());
			});
		});
		const filterByZutatByName = computed(() => {
			return zutaten.value.filter((option: Zutat) => {
				return option.name.toLowerCase().match(searchzutat.value?.toLowerCase());
			});
		});

		const filteredHasAlkoholArray = computed(() => {
			return filteredRezepteArray.value.filter((option: Cocktail) => {
				if (option.alkohol === alkohol.value) {
					return true;
				} else {
					return false;
				}
			});
		});
		const filteredRezepteByZutat = computed(() => {
			return rezepte.value.filter((option: Cocktail) => {
				return option.zutaten.find((Element: Zutat) => Element.name.toLowerCase().match(searchzutat.value?.toLowerCase()));
			});
		});
		const filteredRezepteByUtensil = computed(() => {
			return filteredRezepteByZutat.value.filter((option: Cocktail) => {
				if (option.utensil?.length) {
					return option.utensil.find((Element: string) => Element.toLowerCase().match(searchutensil.value?.toLowerCase()));
				} else return true;
			});
		});
		const filteredRezepteArray = computed(() => {
			return filteredRezepteByUtensil.value.filter((option: Cocktail) => {
				return option.name.toLowerCase().match(searchrezept.value?.toLowerCase());
			});
		});
		function includes(rezept: Cocktail) {
			const result: Cocktail = store.state.user.favoriten.find((Element: Cocktail) =>
				Element.name.toLowerCase().match(rezept.name.toLowerCase()),
			);
			if (result) {
				return true;
			} else {
				return false;
			}
		}
		// untils Funktions
		function sortRezepteDESC() {
			filteredHasAlkoholArray.value.sort((a: Cocktail, b: Cocktail) => (a.diff < b.diff ? 1 : -1));
			return 'Schwierigkeit 0 - 3';
		}
		function sortRezepteASC() {
			filteredHasAlkoholArray.value.sort((a: Cocktail, b: Cocktail) => (a.diff > b.diff ? 1 : -1));
			return 'Schwierigkeit 3 - 0';
		}

		function loadEdit(value: string) {
			store.dispatch('loadCocktailByName', value).then(() => {
				router.push('/edit');
			});
		}

		return {
			alkohol,
			selectedrezept,
			selectedzutat,
			selectedutensil,
			rezepte,
			filterByZutatByName,
			filteredHasAlkoholArray,
			filteredRezepteArray,
			filterByUtensilienByName,
			sortRezepteDESC,
			sortRezepteASC,
			store,
			searchzutat,
			searchrezept,
			searchutensil,
			sortierung,
			router,
			loadEdit,
			includes,
			utensilien,
		};
	},
};
</script>

<style lang="scss">
//CSS STYLES
h1 {
	text-align: center;
}

.all-recepies {
	margin-bottom: 10rem;
	color: #ffffff;

	.FilterContainer {
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		border: 50px solid transparent;
		border-image: url('../static/Frame.png');
		border-image-slice: 25%;
		margin: auto auto 2%;
		width: 40%;

		.searcher {
			margin: auto;
		}

		.o-switch__check--checked {
			background: #e1cc81;
		}

		.o-btn {
			width: 20%;
			margin: auto;
			margin-bottom: 1%;
		}

		.o-acp {
			margin-bottom: 3%;
		}

		.o-switch {
			margin-bottom: 1%;
		}
	}

	.tableData {
		margin: auto auto 2%;
		border: 50px solid transparent;
		border-image: url('../static/Frame.png');
		border-image-slice: 25%;

		.center {
			display: flex;
			justify-content: center;
			flex-direction: column;
			margin: auto;

			.bild {
				border: 2px solid #000000;
			}
		}

		td {
			.edit {
				width: 20%;
			}
		}

		tr {
			.item {
				padding-bottom: 3%;
			}
		}

		.anleitung {
			width: 100%;
		}

		.edit {
			.o-btn {
				color: #000000;
				background-color: #e1cc81;
			}
		}
	}
}

// CSS MEDIA QUERYS
@media only screen and (max-width: 599px) {
	.all-recepies {
		.FilterContainer {
			width: 70%;

			.tableData {
				width: 100%;
			}
		}

		.searcher {
			width: 100%;
		}
	}
}
@media only screen and (min-width: 600px) {
	.all-recepies {
		.FilterContainer {
			width: 70%;
		}

		.tableData {
			width: 90%;
		}

		.searcher {
			width: 100%;
		}
	}
}
@media only screen and (min-width: 980px) {
	.all-recepies {
		.FilterContainer {
			width: 70%;
		}

		.tableData {
			width: 80%;
		}

		.searcher {
			width: 60%;
		}
	}
}
@media only screen and (min-width: 1260px) {
	.all-recepies {
		.FilterContainer {
			width: 40%;
		}

		.tableData {
			width: 60%;
		}

		.searcher {
			width: 40%;
		}
	}
}
</style>
