<template>
	<RandomCocktail />
</template>

<script lang="ts">
import RandomCocktail from '../components/randomCocktail.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
	name: 'View-RandomRezepte',
	components: {
		RandomCocktail,
	},

	setup() {
		const store = useStore();
		onMounted(() => {
			store.dispatch('loadRandomCocktail');
		});
		return {};
	},
};
</script>
