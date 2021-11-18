<template>
	<body>
		<h1>Alle Zutaten</h1>
		<div class="normalButton">
			<fa icon="glass-martini-alt" @click="toggle" />
		</div>
		<div v-show="showMe">
			<p class="centeringText" v-for="(value, index) in store.state.zutaten" v-bind:key="index"></p>
			<table class="table">
				<tr>
					<th>{{ value.name }}</th>
				</tr>
			</table>
		</div>
	</body>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();
		const showMe = ref(false);

		return {
			store,
			showMe,

			toggle: () => {
				showMe.value = !showMe.value;
				store.dispatch('loadAllZutaten');
			},
		};
	},
};
</script>
