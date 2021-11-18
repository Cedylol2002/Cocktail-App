<template>
	<body>
		<div class="field">
			<h2>NUTZERNAME ÄNDERN</h2>
			<o-field label="Nutzername">
				<o-input :placeholder="user.username" v-model="usernameForm.username"></o-input>
			</o-field>
			<div class="submit">
				<o-button type="submit" @click="submitFormUsername()">Submit</o-button>
			</div>

			<h2>PASSWORT ÄNDERN</h2>
			<o-field label="Neues Password">
				<o-input placeholder="Neues Password" v-model="passwordForm.password" password-reveal type="password"></o-input>
			</o-field>
			<o-field label="Neues Password bestätigen" :variant="passwordsMatch">
				<o-input placeholder="Neues Password bestätigen" v-model="confirmpass" type="password"></o-input>
			</o-field>
			<div v-if="Errors.length">
				<div>
					<ul>
						<li v-for="error in Errors" :key="error">{{ error }}</li>
					</ul>
				</div>
			</div>
			<div class="submit">
				<o-button type="submit" @click="submitFormPassword()">Submit</o-button>
			</div>
		</div>
	</body>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import { ref } from 'vue';
import { UserChangePasswordSchema, UserChangeNameSchema } from '../../server/src/interfaces/yupValidiationModels';
import axios from 'axios';
import { registerIcons } from '../Icon';
import { mdiAlertCircle, mdiEyeOff, mdiEye, mdiCheck } from '@mdi/js';
registerIcons({
	mdiAlertCircle,
	mdiEyeOff,
	mdiEye,
	mdiCheck,
});
export default {
	setup() {
		const store = useStore();
		const user = computed(() => store.state.user);
		const form = reactive({
			username: '',
			password: '',
			email: user.value.email,
			favoriten: user.value.favoriten,
			admin: user.value.admin,
		});

		const usernameForm = reactive({
			username: '',
		});

		const passwordForm = reactive({
			password: '',
		});
		const accessToken = computed(() => store.state.user.accessToken);
		const confirmpass = ref();
		const validForm = ref();
		const Errors = reactive<Array<Error>>([]);
		const passwordsMatch = computed(() => {
			if (passwordForm.password == confirmpass.value) {
				return 'success';
			} else {
				return 'danger';
			}
		});
		async function submitFormUsername(): Promise<void> {
			Errors.splice(0, Errors.length);
			validForm.value = await UserChangeNameSchema.validate(usernameForm).catch((err: Error) => Errors.push(err));
			if (Errors.length) {
				usernameForm.username = '';
				return;
			}
			await axios
				.post('http://localhost:5000/api/users/changeName/' + user.value._id, usernameForm, {
					withCredentials: true,
					headers: {
						Authorization: 'Bearer ' + accessToken.value,
					},
				})
				.catch((error) => {
					Errors.push(error.response.data.message);
				});
		}

		async function submitFormPassword(): Promise<void> {
			Errors.splice(0, Errors.length);
			validForm.value = await UserChangePasswordSchema.validate(passwordForm).catch((err: Error) => Errors.push(err));
			if (Errors.length) {
				passwordForm.password = '';
				return;
			}
			await axios
				.post('http://localhost:5000/api/users/changePassword/' + user.value._id, passwordForm, {
					withCredentials: true,
					headers: {
						Authorization: 'Bearer ' + accessToken.value,
					},
				})
				.catch((error) => {
					Errors.push(error.response.data.message);
				});
		}
		return {
			store,
			user: store.state.user,
			Errors,
			form,
			confirmpass,
			passwordsMatch,
			submitFormUsername,
			submitFormPassword,
			usernameForm,
			accessToken,
			passwordForm,
		};
	},
};
</script>

<style lang="scss">
.field {
	text-align: center;
	margin: 5px auto 0;
	width: 50%;
	justify-content: center;
	border: 50px solid transparent;
	border-image: url('../static/Frame.png');
	border-image-slice: 25%;
}

.o-switch__check--checked {
	background: #1d1d1d;
}

.submit {
	.o-btn {
		color: #000000;
		background-color: #e1cc81;
	}
}

// CSS MEDIA QUERYS
@media only screen and (max-width: 599px) {
	.Field {
		width: 100%;
	}
}
@media only screen and (min-width: 600px) {
	.Field {
		width: 100%;
	}
}
@media only screen and (min-width: 980px) {
	.Field {
		width: 50%;
	}
}
@media only screen and (min-width: 1260px) {
	.Field {
		width: 25%;
	}
}
</style>
