<template>
	<body>
		<div class="create-cocktail">
			<h1>Rezept erstellen</h1>

			<form class="formcoloring" v-on:submit.prevent="submitForm">
				<o-field label="Name des Cocktails:">
					<o-input v-model="form.name" required />
				</o-field>

				<o-field label="Url zu dem Bild:">
					<o-input type="url" v-model="form.bild" required />
				</o-field>

				<o-field label="Alkohol:">
					<o-switch v-model="form.alkohol">
						{{ form.alkohol ? 'Ja' : 'Nein' }}
					</o-switch>
				</o-field>

				<o-field label="Zutaten:">
					<o-autocomplete
						rounded
						expanded
						v-model="search"
						open-on-focus
						:data="filteredZutaten"
						placeholder="z.b. Banane"
						icon="magnify"
						clearable
						field="name"
						@select="(option) => (selected = option) && AddToArrayFromApi(option)"
					>
						<template v-slot:empty>No results found</template>
					</o-autocomplete>
				</o-field>

				<div v-for="(value, key) in selectedObjs.zutatenFromApi" :key="key">
					<div v-show="false">
						{{ (form.zutaten[key] = value) }}
					</div>
					<o-field :label="(form.zutaten[key].name = value.name)">
						<o-input type="number" aria-label="Menge:" placeholder="0,00" v-model="form.zutaten[key].bestand" />
						<o-select v-model="form.zutaten[key].bestand_einheit" aria-label="Einheit:" placeholder="Einheit">
							<option>L</option>
							<option>cl</option>
							<option>ml</option>
							<option>g</option>
							<option>EL</option>
							<option>TL</option>
							<option>stk</option>
							<option>Prise</option>
							<option>dash</option>
							<option>Blatt</option>
						</o-select>
						<o-button variant="danger" icon-right="delete" @click="RemoveToArrayFromApi(value)" />
					</o-field>
				</div>
				<o-field label="Schwierigkeit:">
					<o-slider
						:min="0"
						:max="3"
						aria-label="Schwierigkeit"
						:tooltip="false"
						v-model="form.diff"
						:variant="['info', 'info', 'warning', 'danger'][form.diff]"
					>
						<o-slider-tick :value="0">Easy</o-slider-tick>
						<o-slider-tick :value="1">Medium</o-slider-tick>
						<o-slider-tick :value="2">High</o-slider-tick>
						<o-slider-tick :value="3">Insane</o-slider-tick>
					</o-slider>
				</o-field>
				<o-field label="Anleitung:">
					<o-input type="text" v-model="form.anleitung" required />
				</o-field>

				<o-field label="Utensilien:">
					<o-autocomplete
						rounded
						expanded
						v-model="searchutensil"
						open-on-focus
						:data="filterByUtensilienByName"
						placeholder="z.b. Shaker"
						icon="magnify"
						field="name"
						clearOnSelect="true"
						@select="(option) => (selectedutensil = option) && AddToArrayFromApiUtensil(option)"
					>
						<template v-slot:empty>No results found</template>
					</o-autocomplete>
				</o-field>
				<div v-for="(value, key) in selectedObjs.utensilFromApi" :key="key">
					<div v-show="false">
						{{ (form.utensil[key] = value) }}
					</div>
					<o-field :label="(form.utensil[key].name = value.name)">
						<o-button variant="danger" icon-right="delete" @click="RemoveToArrayFromApiUtensil(value)" />
					</o-field>
				</div>
				<div v-if="Errors.length">
					<div>
						<ul>
							<li v-for="error in Errors" :key="error">{{ error }}</li>
						</ul>
					</div>
				</div>
				<o-button type="submit" @click="submitForm()">Submit</o-button>
			</form>
		</div>
	</body>
</template>
<script lang="ts">
import axios from 'axios';
import { computed, reactive, ref } from 'vue';
import store from '../store/index';
import { CocktailSchema } from '../../server/src/interfaces/yupValidiationModels';
import { Zutat } from 'server/src/interfaces/IECocktails';
import IEUtensilien from '../../server/src/interfaces/IEUtensilien';
import { mdiDelete, mdiCloseCircle, mdiMagnify } from '@mdi/js';
import { registerIcons } from '../Icon';

registerIcons({
	mdiDelete,
	mdiCloseCircle,
	mdiMagnify,
});
export default {
	setup() {
		const selectedObjs = reactive({
			zutatenFromApi: [] as Zutat[],
			utensilFromApi: [] as IEUtensilien[],
		});
		const search = ref('');
		const searchutensil = ref('');
		const selectedutensil = ref();
		const selected = ref<Zutat>();
		const zutaten = computed(() => store.state.zutaten);
		const form = reactive({
			name: '',
			bild: '',
			alkohol: false,
			zutaten: [] as Zutat[],
			diff: 0,
			anleitung: '',
			utensil: [] as IEUtensilien[],
		});
		const Errors = reactive<Array<Error>>([]);
		const validForm = ref();
		const utensilien = computed(() => store.state.allUtensil);

		const filterByUtensilienByName = computed(() => {
			return utensilien.value.filter((option: IEUtensilien) => {
				return option.name.toLowerCase().match(searchutensil.value?.toLowerCase());
			});
		});
		function AddToArrayFromApi(zutat: Zutat) {
			if (!selectedObjs.zutatenFromApi.includes(zutat)) {
				selectedObjs.zutatenFromApi.push(zutat);
			} else {
				return;
			}
		}
		function RemoveToArrayFromApi(zutat: Zutat) {
			if (selectedObjs.zutatenFromApi.includes(zutat)) {
				selectedObjs.zutatenFromApi.splice(selectedObjs.zutatenFromApi.indexOf(zutat), 1);
				form.zutaten = form.zutaten.filter((item: Zutat) => {
					if (item.name.toLowerCase() == zutat.name.toLowerCase()) {
						return false;
					}
				});
			} else {
				return;
			}
		}
		function AddToArrayFromApiUtensil(utensil: IEUtensilien) {
			if (!selectedObjs.utensilFromApi.includes(utensil)) {
				selectedObjs.utensilFromApi.push(utensil);
			} else {
				return;
			}
		}
		function RemoveToArrayFromApiUtensil(utensil: IEUtensilien) {
			if (selectedObjs.utensilFromApi.includes(utensil)) {
				selectedObjs.utensilFromApi.splice(selectedObjs.utensilFromApi.indexOf(utensil), 1);
				form.utensil = form.utensil.filter((item: IEUtensilien) => {
					if (item.name?.toLowerCase() == utensil.name?.toLowerCase()) {
						return false;
					}
				});
				selectedutensil.value = '';
			} else {
				return;
			}
		}
		const filteredZutaten = computed(() => {
			return zutaten.value.filter((option: Zutat) => {
				return option.name.toLowerCase().match(search.value?.toLowerCase());
			});
		});
		async function submitForm(): Promise<void> {
			Errors.splice(0, Errors.length);
			validForm.value = await CocktailSchema.validate(form).catch((err: Error) => Errors.push(err));
			if (Errors.length) {
				return;
			}
			axios
				.post('http://localhost:5000/api/cocktail/rezept', form)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					Errors.push(error.response.data.message);
				});
			form.name = '';
			form.bild = '';
			form.alkohol = false;
			form.zutaten = [];
			form.diff = 0;
			form.anleitung = '';
			form.utensil = [];
		}

		return {
			selectedObjs,
			form,
			AddToArrayFromApi,
			RemoveToArrayFromApi,
			AddToArrayFromApiUtensil,
			RemoveToArrayFromApiUtensil,
			search,
			selected,
			filteredZutaten,
			filterByUtensilienByName,
			submitForm,
			searchutensil,
			selectedutensil,
			Errors,
			validForm,
			store,
		};
	},
};
</script>

<style lang="scss">
.create-cocktail {
	width: 30%;
	margin: auto;
	color: #000000;
	border: 50px solid transparent;
	border-image: url('../static/Frame.png');
	border-image-slice: 25%;

	.o-btn {
		color: #000000;
		background-color: #e1cc81;
	}

	.formcoloring {
		margin-bottom: 10rem;
	}
}

// CSS MEDIA QUERYS
@media only screen and (max-width: 599px) {
	.create-cocktail {
		width: 100%;
	}
}
@media only screen and (min-width: 600px) {
	.create-cocktail {
		width: 100%;
	}
}
@media only screen and (min-width: 980px) {
	.create-cocktail {
		width: 50%;
	}
}
@media only screen and (min-width: 1260px) {
	.create-cocktail {
		width: 45%;
	}
}
</style>
