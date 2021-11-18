<template>
	<body>
		<form action="">
			<div class="modal-card">
				<div class="modal-card-head">
					<p class="modal-card-title">Login</p>
				</div>
				<div class="modal-card-body">
					<o-field label="Username">
						<o-input type="text" icon="account" v-model="form.username" required> </o-input>
					</o-field>

					<o-field label="Password">
						<o-input type="password" v-model="form.password" password-reveal icon="lock"> </o-input>
					</o-field>
					<div v-if="Errors.length">
						<div>
							<ul>
								<li v-for="error in Errors" :key="error">{{ error }}</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="modal-card-foot">
					<o-button type="submit" @click="submitForm">Login</o-button>
				</div>
				<div class="modal-card-foot">
					<router-link to="/Registrieren" class="submit">Sign up</router-link>
				</div>
			</div>
		</form>
	</body>
</template>

<script lang="ts">
import { mdiLock, mdiEye, mdiEyeOff, mdiAccount } from '@mdi/js';
import { registerIcons } from '../Icon';
import axios, { AxiosResponse } from 'axios';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { UserLoginSchema } from '../../server/src/interfaces/yupValidiationModels';
import { useRouter } from 'vue-router';

registerIcons({
	mdiLock,
	mdiEye,
	mdiEyeOff,
	mdiAccount,
});
export default {
	setup() {
		const store = useStore();
		const router = useRouter();
		const form = reactive({
			username: '',
			password: '',
		});
		const validForm = ref();
		const Errors = reactive<Array<Error>>([]);

		async function submitForm(): Promise<void> {
			Errors.splice(0, Errors.length);
			validForm.value = await UserLoginSchema.validate(form).catch((err: Error) => Errors.push(err));
			if (Errors.length) {
				form.username = '';
				form.password = '';
				return;
			}
			await axios
				.post('http://localhost:5000/api/users/login', form, { withCredentials: true })
				.then((res: AxiosResponse) => {
					store.commit('setAccessToken', res.data.accesstoken);
					localStorage.setItem('loggedIn', 'true');
					store.dispatch('getloggedInUser');
					router.push('/');
				})
				.catch((error) => {
					Errors.push(error.response.data.message);
				});
			form.username = '';
			form.password = '';
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
//Login Form
.modal-card {
	width: 20%;
	margin: 2% auto auto;
	border: 50px solid transparent;
	border-image: url('../static/Frame.png');
	border-image-slice: 25%;

	.modal-card-foot {
		margin-top: 5%;
	}

	.o-notices {
		top: 40% !important;
	}

	.modal-card-title {
		font-size: 30px !important;
		font-weight: 1000 !important;
	}

	.o-chk__check {
		border-color: var(--oruga-checkbox-border-color, #282f2e) !important;
		background: #202020 !important;
	}

	.o-chk__check--checked {
		background-color: var(--oruga-checkbox-active-background-color, #282f2e) !important;
		border-color: var(--oruga-checkbox-active-background-color, #282f2e) !important;
		background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 234 225' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;'%3E%3Cg transform='matrix(4.16667,0,0,4.16667,0,0)'%3E%3Cg transform='matrix(3.13817,0,0,3.13817,-69.2796,-49.5156)'%3E%3Cpath style='fill:var(--oruga-checkbox-checkmark-color, %23ffffff)' d='M22.504,26.219L28.637,32.386L39.494,18.284L37.348,16.379L28,27.725L24.46,24.196L22.504,26.219Z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E") !important;
	}

	.o-notification {
		background-color: var(--oruga-notification-background-color, #435e0000) !important;
		color: var(--oruga-notification-color, #000000) !important;
		border-radius: var(--oruga-notification-border-radius, 4px) !important;
		padding: var(--oruga-notification-padding, 1.75em 1.75em) !important;
		margin-bottom: var(--oruga-notification-margin-bottom, 1.5rem) !important;
		position: relative;
	}

	.o-field__label {
		display: block !important;
		font-size: var(--oruga-base-font-size, 1rem) !important;
		font-weight: var(--oruga-field-label-font-weight, 600) !important;

		.o-chk__label {
			padding: var(--oruga-checkbox-label-padding, 0 0 0 0.5em);
			color: #000000;
		}
	}

	.o-btn {
		background-color: #445e0000 !important;
	}

	.o-btn--warning {
		background-color: #fffb00 !important;
	}

	.table {
		margin-left: 25%;
		margin-bottom: 5%;
		background-color: rgb(255, 0, 0);
		border: 5px solid transparent;
		padding: 15px;
		border-image: url('../static/BackgroundImage.jpg');
		border-image-slice: 35%;
		width: 50%;
	}
}

// CSS MEDIA QUERYS
@media only screen and (max-width: 599px) {
	.modal-card {
		width: 100%;
	}
}
@media only screen and (min-width: 600px) {
	.modal-card {
		width: 80%;
	}
}
@media only screen and (min-width: 980px) {
	.modal-card {
		width: 50%;
	}
}
@media only screen and (min-width: 1260px) {
	.modal-card {
		width: 30%;
	}
}
</style>
