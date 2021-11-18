<template>
	<body>
		<form>
			<div class="modal-card">
				<div class="modal-card-head">
					<p class="modal-card-title">Register</p>
					<o-field label="Username">
						<o-input v-model="form.username" placeholder="Max Musterman"></o-input>
					</o-field>
					<o-field label="Email">
						<o-input type="email" v-model="form.email" placeholder="Maxmusterman@hotmail.com"> </o-input>
					</o-field>
					<o-field label="Password" :variant="passwordsMatch">
						<o-input placeholder="password" v-model="form.password" type="password"></o-input>
					</o-field>
					<o-field label="Password bestätigen" :variant="passwordsMatch">
						<o-input placeholder="Password bestätigen" v-model="confrimpass" type="password"></o-input>
					</o-field>
					<div v-if="Errors.length">
						<div>
							<ul>
								<li v-for="error in Errors" :key="error">{{ error }}</li>
							</ul>
						</div>
					</div>
					<div class="modal-card-foot">
						<o-button type="submit" @click="submitForm()">Registrieren</o-button>
					</div>
				</div>
			</div>
		</form>
	</body>
</template>

<script lang="ts">
import { mdiLock, mdiEye, mdiEyeOff, mdiAccount } from '@mdi/js';
import { registerIcons } from '../Icon';
import axios from 'axios';
import { reactive, ref, computed } from 'vue';
import store from '../store/index';
import { UserRegisterSchema } from '../../server/src/interfaces/yupValidiationModels';

registerIcons({
	mdiLock,
	mdiEye,
	mdiEyeOff,
	mdiAccount,
});
export default {
	setup() {
		const form = reactive({
			username: '',
			password: '',
			email: '',
		});
		const validForm = ref();
		const confrimpass = ref();
		const Errors = reactive<Array<Error>>([]);

		const passwordsMatch = computed(() => {
			if (form.password == confrimpass.value) {
				return 'success';
			} else {
				return 'danger';
			}
		});
		async function submitForm(): Promise<void> {
			Errors.splice(0, Errors.length);
			validForm.value = await UserRegisterSchema.validate(form).catch((err) => console.log(err));
			console.log(validForm.value);
			if (Errors.length) {
				return;
			}
			axios
				.post('http://localhost:5000/api/users/register', validForm.value)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					Errors.push(error.response.data.message);
				});
		}
		return {
			form,
			submitForm,
			Errors,
			validForm,
			confrimpass,
			passwordsMatch,
			store,
		};
	},
};
</script>

<style lang="scss">
.o-field__label {
	display: block;
	font-size: var(--oruga-base-font-size, 1rem);
	font-weight: var(--oruga-field-label-font-weight, 600);

	.o-chk__label {
		padding: var(--oruga-checkbox-label-padding, 0 0 0 0.5em);
		color: #000000;
	}
}
</style>
