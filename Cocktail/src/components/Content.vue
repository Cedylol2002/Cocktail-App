<template>
	<body>
		<HelloMessage />
	</body>
</template>
<script lang="ts">
import HelloMessage from './HelloMessage.vue';
import { useStore } from 'vuex';

export default {
	components: {
		HelloMessage,
	},
	setup() {
		const store = useStore();
		return {};
	},
};
</script>

<style lang="scss">

</style>
