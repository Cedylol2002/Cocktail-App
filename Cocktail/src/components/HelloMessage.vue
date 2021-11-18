<template>
	<div v-if="store.state.user.isAuthenticated">
		<h1>
			<u>Hallo und Willkommen bei Cocktailiny, {{ user.username }}</u>
		</h1>
	</div>
	<div v-else>
		<h1>
			<u>Hallo und Willkommen bei Cocktailiny</u>
		</h1>
	</div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
export default {
	setup() {
		const store = useStore();
		return {
			store,
			user: store.state.user,
		};
	},
};
</script>

<style lang="scss">
h1 {
	text-align: center;
}
</style>
