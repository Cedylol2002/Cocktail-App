<template>
	<body>
		<h1>Party Modus</h1>
		<div class="createPartyForm">
			<div class="Styling">
				<form class="form">
					<div class="centeredLabel">
						<o-field label="Randomizer">
							<o-button iconRight="shuffle" v-model="shuffle" @click="ToggleRandomizer()"></o-button>
						</o-field>
					</div>
					<o-field>
						<o-autocomplete
							rounded
							expanded
							open-on-focus
							v-model="SearchUser"
							:data="userArr"
							placeholder="z.b. User"
							icon="magnify"
							clearable
							field="username"
							@select="(option) => (selectedUser = option) && AddToArray(option)"
						>
							<template v-slot:empty>No results found</template>
						</o-autocomplete></o-field
					>
					<div v-for="(value, key) in usernames" v-bind:key="key">
						<o-field :label="(usernames[key].username = value.username)">
							<o-select v-model="usernames[key].password" aria-label="Rolle:" placeholder="Role">
								<option>Admin</option>
								<option>Bartender</option>
								<option>Gast</option>
							</o-select>
							<o-button variant="danger" icon-right="delete" @click="RemoveToArray(value)" />
						</o-field>
					</div>
					<o-field label="VIP Password (not required)">
						<o-input type="password" v-model="password"></o-input>
					</o-field>
					<div class="centeredLabel">
						<o-field label="Los geht die Party">
							<o-button class="start" v-model="partyStart" type="submit" @click="isRandom()"
								><o-icon icon="party-popper"> </o-icon
							></o-button>
						</o-field>
					</div>
				</form>
			</div>
		</div>
	</body>
</template>

<script lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { mdiShuffle, mdiPartyPopper, mdiCloseCircle, mdiDelete } from '@mdi/js';
import { registerIcons } from '../Icon';
import { useStore } from 'vuex';
import IEUser from 'server/src/interfaces/IEUser';
registerIcons({
	mdiShuffle,
	mdiPartyPopper,
	mdiCloseCircle,
	mdiDelete,
});
export default {
	setup() {
		const store = useStore();
		const admin = ref('');
		const bartender = ref('');
		const password = ref('');
		const partyStart = ref('');
		const shuffle = ref('');

		const SearchUser = ref();
		const users = computed(() => store.state.users);

		const usernames = reactive<Array<IEUser>>([]);

		var showRandomForm = ref(true); //ES MUSS SPÄTER NACH FALSE ABGEFRAGT WERDEN FÜR RANDOM FUNCTION
		function ToggleRandomizer() {
			showRandomForm.value = !showRandomForm.value;
			return { showRandomForm };
		}
		const userArr = computed(() => {
			return users.value.filter((option: IEUser) => {
				return option.username.toLowerCase().match(SearchUser.value?.toLowerCase());
			});
		});

		function AddToArray(userArr: IEUser) {
			if (!usernames.includes(userArr)) {
				usernames.push(userArr);
			} else {
				return;
			}
		}

		//Maybe nicht ganz richtig es macht aber den anschein richtig zu sein ("Kein Warning oder so")
		function RemoveToArray(userArr: IEUser) {
			if (usernames.includes(userArr)) {
				usernames.splice(usernames.indexOf(userArr), 1);
			} else {
				return;
			}
		}

		onMounted(() => {
			store.dispatch('loadAllUsers');
		});
		//User in Autocomplete einbetten Array pls danke brudi
		return {
			showRandomForm,
			ToggleRandomizer,
			admin,
			bartender,
			password,
			partyStart,
			shuffle,
			store,
			computed,
			userArr,
			SearchUser,
			usernames,
			AddToArray,
			RemoveToArray,
		};
	},
};
</script>

<style lang="scss">
body {
	h1 {
		margin: auto;
	}

	.createPartyBtn {
		display: flex;
		justify-content: center;
	}

	.o-btn {
		color: #000000;
		background-color: #e1cc81;
	}

	.start {
		padding: 20px;
	}

	.createPartyForm {
		margin: auto;
		display: flex;
		justify-content: center;
		border: 50px solid transparent;
		border-image: url('../static/Frame.png');
		border-image-slice: 25%;
	}

	.centeredLabel {
		text-align: center;

		.o-field {
			text-align: center;

			.o-field__label {
				text-align: center;
			}
		}
	}
}

@media only screen and (max-width: 599px) {
	.createPartyForm {
		width: 100%;
	}
}
@media only screen and (min-width: 600px) {
	.createPartyForm {
		width: 100%;
	}
}
@media only screen and (min-width: 980px) {
	.createPartyForm {
		width: 50%;
	}
}
@media only screen and (min-width: 1260px) {
	.createPartyForm {
		width: 30%;
	}
}
</style>
