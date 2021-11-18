import { createApp } from 'vue';
import Oruga from '@oruga-ui/oruga-next';

import { iconMdi } from './Icon';

import App from './App.vue';
import store from './store/index';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import router from './router';

library.add(fas);

const app = createApp(App).use(router).component('fa', FontAwesomeIcon);

app.use(store);
app.use(Oruga, {
	iconComponent: 'icon-mdi',
	iconPack: 'mdijs',
	customIconPacks: {
		mdijs: {
			iconPrefix: 'mdi-',
		},
	},
});

app.component('icon-mdi', iconMdi);
app.mount('#app');
