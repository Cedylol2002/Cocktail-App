<template>
	<body>
		<div class="edit-cocktail">
			<h1>Rezept Updaten</h1>
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
						icon="search"
						clearable
						field="name"
						@select="(option) => (selected = option) && AddToArrayFromApi(option)"
					>
						<template v-slot:empty>No results found</template>
					</o-autocomplete>
				</o-field>
				<div v-for="(value, key) in rezeptZutatenArry" :key="key">
					<o-field :label="value.name">
						<o-input type="number" aria-label="Menge:" placeholder="0,00" v-model="value.menge" />

						<o-select v-model="value.einheit" aria-label="Einheit:" placeholder="Einheit">
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
						<o-button type="number" variant="danger" icon-right="delete" @click="RemoveToArrayFromApi(value)" />
					</o-field>
				</div>
				<o-field label="Schwierigkeit:">
					<!-- Sollte halt form.diff anehmen also z.b. 3 aber ist immer 0 --> 
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
						icon="search"
						clearable
						field="name"
						@select="(option) => (selectedutensil = option) && AddToArrayFromApiUtensil(option)"
					>
						<template v-slot:empty>No results found</template>
					</o-autocomplete>
				</o-field>
				<div v-for="(value, key) in utensilFromApi" :key="key">
					<div v-if="value.name">
						<o-field :label="value.name">
							<o-button variant="danger" icon-right="delete" @click="RemoveToArrayFromApiUtensil(value)" />
						</o-field>
					</div>
					<div v-else>
						<o-field :label="value">
							<o-button variant="danger" icon-right="delete" @click="RemoveToArrayFromApiUtensil(value)" />
						</o-field>
					</div>
				</div>
				<div v-if="Errors.length">
					<div>
						<ul>
							<li v-for="error in Errors" :key="error">{{ error }}</li>
						</ul>
					</div>
				</div>
				<div class="submit">
					<o-button type="submit" @click="submitForm">Submit</o-button>
				</div>
			</form>
			<table class="tableRandom">
				<tr>
					<th>{{ form.name }}</th>
				</tr>
				<tr>
					<th>
						<img :src="rezept.bild" width="150" height="150" />
					</th>
				</tr>
				<tr>
					<td>Alkohol:</td>
					<td>{{ form.alkohol ? 'Ja' : 'Nein' }}</td>
				</tr>
				<tr>
					<td>Anleitung:</td>
					<td>{{ form.anleitung }}</td>
				</tr>
				<tr>
					<td class="tdPadding">Zutaten:</td>
					<td class="directionary" v-for="(item, key) in form.zutaten" v-bind:key="key">
						{{ item.name }}
					</td>
				</tr>
				<tr>
					<td>Utensil:</td>
					<td>{{ form.utensil }}</td>
				</tr>
				<tr>
					<td>Schwierigkeit:</td>
					<td>{{ form.diff }}</td>
				</tr>
			</table>
		</div>
	</body>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, reactive, ref } from 'vue';
import Cocktail, { Zutat } from 'server/src/interfaces/IECocktails';
import { CocktailSchema } from '../../server/src/interfaces/yupValidiationModels';
import { useStore } from 'vuex';
import { mdiDelete } from '@mdi/js';
import { registerIcons } from '../Icon';
import IEUtensilien from '../../server/src/interfaces/IEUtensilien';

registerIcons({
	mdiDelete,
});
export default {
	setup() {
		const store = useStore();
		const rezept = ref<Cocktail>(store.state.cocktailByName);
		const rezeptZutatenArry = reactive<Array<Zutat>>(JSON.parse(JSON.stringify(rezept.value.zutaten)));
		const utensilFromApi = reactive<Array<IEUtensilien>>(JSON.parse(JSON.stringify(rezept.value.utensil)));
		const Errors = reactive<Array<Error>>([]);
		const validForm = ref();
		const search = ref('');
		const selected = ref<Zutat>();
		const searchutensil = ref('');
		const selectedutensil = ref();
		const zutaten = computed(() => store.state.zutaten);
		const form = reactive({
			name: rezept.value.name,
			bild: rezept.value.bild,
			alkohol: rezept.value.alkohol,
			zutaten: rezeptZutatenArry,
			diff: rezept.value.diff,
			anleitung: rezept.value.anleitung,
			utensil: utensilFromApi,
		});

		const emptyform = reactive({
			name: '',
			bild: '',
			alkohol: false,
			zutaten: [],
			diff: 0,
			anleitung: '',
			utensil: [],
		});
		const utensilien = computed(() => store.state.allUtensil);

		const filterByUtensilienByName = computed(() => {
			return utensilien.value.filter((option: IEUtensilien) => {
				return option.name.toLowerCase().match(searchutensil.value?.toLowerCase());
			});
		});
		function AddToArrayFromApi(zutat: Zutat) {
			if (!rezeptZutatenArry.includes(zutat)) {
				rezeptZutatenArry.push(zutat);
			} else {
				return;
			}
		}
		const filteredZutaten = computed(() => {
			return zutaten.value.filter((option: Zutat) => {
				return option.name.toLowerCase().match(search.value?.toLowerCase());
			});
		});
		function RemoveToArrayFromApi(zutat: Zutat) {
			if (rezeptZutatenArry.includes(zutat)) {
				rezeptZutatenArry.splice(rezeptZutatenArry.indexOf(zutat), 1);
				form.zutaten = form.zutaten.filter((item: Zutat) => {
					if (item.name.toLowerCase() == zutat.name.toLowerCase()) {
						return false;
					} else {
						return true;
					}
				});
			} else {
				form.zutaten = form.zutaten.filter((item: Zutat) => {
					if (item.name.toLowerCase() == zutat.name.toLowerCase()) {
						return false;
					} else {
						return true;
					}
				});
			}
		}
		function AddToArrayFromApiUtensil(utensil: IEUtensilien) {
			if (!utensilFromApi.includes(utensil)) {
				utensilFromApi.push(utensil);
			} else {
				return;
			}
		}
		function RemoveToArrayFromApiUtensil(utensil: IEUtensilien) {
			if (utensilFromApi.includes(utensil)) {
				utensilFromApi.splice(utensilFromApi.indexOf(utensil), 1);
				form.utensil = form.utensil?.filter((item: IEUtensilien) => {
					if (item.name.toLowerCase() == utensil.name.toLowerCase()) {
						return false;
					}
				});
			} else {
				form.utensil = form.utensil.filter((item: IEUtensilien) => {
					if (item.name.toLowerCase() == utensil.name.toLowerCase()) {
						return false;
					} else {
						return true;
					}
				});
			}
		}
		async function submitForm(): Promise<void> {
			Errors.splice(0, Errors.length);
			validForm.value = await CocktailSchema.validate(form).catch((err: Error) => Errors.push(err));
			if (Errors.length) {
				return;
			}
			await axios
				.post('http://localhost:5000/api/cocktail/rezept/' + rezept.value.name, form)
				.then((res) => {
					rezept.value = res.data;
				})
				.catch((error) => {
					Errors.push(error.response.data.message);
				});
			form.name = '';
			form.bild = '';
			form.alkohol = false;
			form.zutaten = [];
			form.anleitung = '';
			form.utensil = [];
		}
		return {
			form,
			rezept,
			submitForm,
			Errors,
			store,
			AddToArrayFromApi,
			RemoveToArrayFromApi,
			AddToArrayFromApiUtensil,
			RemoveToArrayFromApiUtensil,
			filterByUtensilienByName,
			filteredZutaten,
			rezeptZutatenArry,
			utensilFromApi,
			selected,
			searchutensil,
			selectedutensil,
			search,
		};
	},
};
</script>

<style lang="scss">
.edit-cocktail {
	width: 50%;
	margin: auto;

	h1 {
		text-align: center;
	}

	.o-switch__check--checked {
		background: #e1cc81;
	}

	.submit {
		.o-btn {
			color: #000000;
			background-color: #e1cc81;
		}
	}

	.formcoloring {
		margin-bottom: 5rem;
		border: 50px solid transparent;
		border-image: url('../static/Frame.png');
		border-image-slice: 25%;
	}

	.tableRandom {
		border: 50px solid transparent;
		border-image: url('../static/Frame.png');
		border-image-slice: 25%;
		margin-bottom: 10rem;
	}
}
// CSS MEDIA QUERYS
@media only screen and (max-width: 599px) {
	.edit-cocktail {
		width: 100%;
	}
}
@media only screen and (min-width: 600px) {
	.edit-cocktail {
		width: 100%;
	}
}
@media only screen and (min-width: 980px) {
	.edit-cocktail {
		width: 50%;
	}
}
@media only screen and (min-width: 1260px) {
	.edit-cocktail {
		width: 45%;
	}
}
</style>
