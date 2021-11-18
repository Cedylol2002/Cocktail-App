<template>
	<body>
		<div class="create-zutat">
			<h1>Zutat erstellen</h1>
			<form class="formcoloring" v-on:submit.prevent="submitForm">
				<o-field label="Name der Zutat:">
					<o-input v-model="form.name" required />
				</o-field>
				<o-field label="Einheit der Zutat:">
					<o-select v-model="form.bestand_einheit" aria-label="Einheit:" placeholder="Einheit">
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
				</o-field>

				<o-field label="Wie viel haben Sie von der Zutat:">
					<o-input type="number" v-model="form.bestand" required />
				</o-field>
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
import { reactive, ref } from 'vue';
import store from '../store/index';
import { ZutatSchema } from '../../server/src/interfaces/yupValidiationModels';

import { mdiDelete } from '@mdi/js';
import { registerIcons } from '../Icon';
import { Zutat } from 'server/src/interfaces/IECocktails';

registerIcons({
	mdiDelete,
});
export default {
	setup() {
		const form = reactive<Zutat>({
			name: '',
			bestand: 0,
			bestand_einheit: '',
		});
		const Errors = reactive<Array<Error>>([]);
		const validForm = ref();

		async function submitForm(): Promise<void> {
			validForm.value = await ZutatSchema.validate(form).catch((err: Error) => Errors.push(err));
			if (Errors.length) {
				return;
			}
			await axios
				.post('http://localhost:5000/api/cocktail/zutat', validForm.value)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		return {
			form,
			submitForm,
			Errors,
			validForm,
			store,
		};
	},
};
</script>

<style lang="scss">
.create-zutat {
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

	h1 {
		text-align: center;
	}

	.formcoloring {
		margin-bottom: 10rem;
	}
}

// CSS MEDIA QUERYS
@media only screen and (max-width: 599px) {
	.create-zutat {
		width: 100%;
	}
}
@media only screen and (min-width: 600px) {
	.create-zutat {
		width: 100%;
	}
}
@media only screen and (min-width: 980px) {
	.create-zutat {
		width: 50%;
	}
}
@media only screen and (min-width: 1260px) {
	.create-zutat {
		width: 30%;
	}
}
</style>
