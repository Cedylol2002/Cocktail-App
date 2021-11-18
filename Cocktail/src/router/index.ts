import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/random',
		name: 'Random',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Random.vue'),
	},
	{
		path: '/all',
		redirect: '/rezepte',
	},
	{
		path: '/rezepte',
		name: 'Rezepte',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/AllRezepte.vue'),
	},

	{
		path: '/addRecept',
		redirect: '/recept',
	},
	{
		path: '/recept',
		name: 'recept',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/AddRecept.vue'),
	},
	{
		path: '/addZutat',
		redirect: '/zutat',
	},
	{
		path: '/zutat',
		name: 'zutat',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/AddZutat.vue'),
	},
	{
		path: '/editRezept',
		redirect: '/edit',
	},
	{
		path: '/edit',
		name: 'edit',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/EditRezept.vue'),
	},
	{
		path: '/LoginSite',
		redirect: '/Login',
	},
	{
		path: '/Login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/LoginSite.vue'),
	},
	{
		path: '/Register',
		redirect: '/Registrieren',
	},
	{
		path: '/Registrieren',
		name: 'Registrieren',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../components/Registrieren.vue'),
	},

	{
		path: '/partymode',
		redirect: '/party',
	},
	{
		path: '/party',
		name: 'Party',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Party.vue'),
	},

	{
		path: '/favSite',
		redirect: '/favorite',
	},
	{
		path: '/favorite',
		name: 'favorite',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../components/favoriten.vue'),
	},
	{
		path: '/Set',
		redirect: '/Settings',
	},
	{
		path: '/Settings',
		name: 'Settings',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../components/Settings.vue'),
	},

	{
		path: '/BarKeeper',
		redirect: '/Bartender',
	},
	{
		path: '/Bartender',
		name: 'Bartender',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../components/Bartender.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
