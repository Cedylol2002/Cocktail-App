import { createStore } from 'vuex';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Cocktail, { Zutat } from '../../server/src/interfaces/IECocktails';
import IEUser from '../../server/src/interfaces/IEUser';

const API_BASE_URL_COCKTAILS = 'http://localhost:5000/api/cocktail/';
const API_BASE_URL_USERS = 'http://localhost:5000/api/users/';
const store = createStore({
	strict: true,
	state: {
		cocktailByName: {} as Cocktail,
		allCocktails: [] as Cocktail[],
		allUtensil: [],
		randomCocktail: {} as Cocktail,
		zutaten: [] as Zutat[],
		showMe: false,
		shuffleShowMe: false,
		searchShowMe: false,
		user: {
			_id: '',
			username: '',
			password: '',
			email: '',
			favoriten: [] as Cocktail[],
			isAdmin: false,
			isAuthenticated: false,
			accessToken: '',
		},
		users: [] as IEUser[],
	},
	mutations: {
		setCocktailByName(state, responseBody: Cocktail) {
			state.cocktailByName = responseBody;
		},
		setAllCocktails(state, responseBody: Cocktail[]) {
			state.allCocktails = responseBody;
		},
		setRandomCocktail(state, responseBody: Cocktail) {
			state.randomCocktail = responseBody;
		},
		setAllZutaten(state, responseBody: Zutat[]) {
			state.zutaten = responseBody;
		},
		setAllUtensil(state, responseBody) {
			state.allUtensil = responseBody;
		},
		setAllUsers(state, responseBody: IEUser[]) {
			state.users = responseBody;
		},
		setLoggedInUser(state, user: IEUser) {
			state.user._id = user._id || '';
			state.user.username = user.username || '';
			state.user.password = user.password || '';
			state.user.email = user.email || '';
			state.user.favoriten = user.favoriten || [];
			state.user.isAuthenticated = true;
			state.user.isAdmin = user.admin || false;
		},
		setUserLoggedOut(state) {
			state.user._id = '';
			state.user.username = '';
			state.user.password = '';
			state.user.email = '';
			state.user.favoriten = [];
			state.user.isAuthenticated = false;
			state.user.isAdmin = false;
		},
		setFavorite(state, rezept: Cocktail) {
			if (!state.user.favoriten.includes(rezept)) state.user.favoriten.push(rezept);
		},
		removeFavorite(state, rezept: Cocktail) {
			state.user.favoriten.splice(state.user.favoriten.indexOf(rezept), 1);
		},
		setAccessToken(state, token) {
			state.user.accessToken = token;
		},
	},
	actions: {
		async loadAllCocktails({ commit }) {
			await axios
				.get(API_BASE_URL_COCKTAILS + 'rezepte/all')
				.then((res: AxiosResponse) => {
					commit('setAllCocktails', res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async loadAllUtensil({ commit }) {
			await axios
				.get(API_BASE_URL_COCKTAILS + 'utensil/all')
				.then((res: AxiosResponse) => {
					commit('setAllUtensil', res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async loadRandomCocktail({ commit }) {
			await axios
				.get(API_BASE_URL_COCKTAILS + 'random/rezept')
				.then((res: AxiosResponse) => {
					commit('setRandomCocktail', res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async loadCocktailByName({ commit }, name: string) {
			await axios
				.get(API_BASE_URL_COCKTAILS + 'rezept/' + name)
				.then((res: AxiosResponse) => {
					commit('setCocktailByName', res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async loadAllZutaten({ commit }) {
			await axios
				.get(API_BASE_URL_COCKTAILS + 'zutaten/all')
				.then((res: AxiosResponse) => {
					commit('setAllZutaten', res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async loadAllUsers({ commit, state }) {
			await axios
				.get(API_BASE_URL_USERS + 'allusers', {
					headers: {
						Authorization: 'Bearer ' + state.user.accessToken,
					},
				})
				.then((res: AxiosResponse) => {
					commit('setAllUsers', res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async getloggedInUser({ commit, state }) {
			const value = localStorage.getItem('loggedIn') || 'false';
			if (JSON.parse(value) === true && state.user.accessToken) {
				await axios
					.get(API_BASE_URL_USERS + 'getuser', {
						headers: {
							Authorization: 'Bearer ' + state.user.accessToken,
						},
					})
					.then((res: AxiosResponse) => commit('setLoggedInUser', res.data))
					.catch((error) => {
						console.log(error);
					});
			} else if (JSON.parse(value) === true && !state.user.accessToken) {
				await axios
					.post(
						API_BASE_URL_USERS + 'refreshtoken',
						{},
						{
							withCredentials: true,
							xsrfCookieName: 'refreshtoken',
						},
					)
					.then((res: AxiosResponse) => {
						commit('setAccessToken', res.data.accesstoken);
						axios
							.get(API_BASE_URL_USERS + 'getuser', {
								headers: {
									withCredentials: true,
									Authorization: 'Bearer ' + res.data.accesstoken,
								},
							})
							.then((res: AxiosResponse) => commit('setLoggedInUser', res.data))
							.catch((error) => {
								console.log(error);
							});
					})
					.catch((error: AxiosError) => {
						if (error.response?.status != 500) {
							commit('setUserLoggedOut');
						}
					});
			}
		},
		async logout({ commit, state }) {
			await axios
				.post(
					API_BASE_URL_USERS + 'logout',
					{},
					{
						withCredentials: true,
						headers: {
							Authorization: 'Bearer ' + state.user.accessToken,
						},
					},
				)
				.then((res: AxiosResponse) => {
					commit('setUserLoggedOut');
					localStorage.removeItem('loggedIn');
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async AddToFavorites({ commit }, rezept: Cocktail) {
			commit('setFavorite', rezept);
		},
		async RemoveFromFavorites({ commit }, rezept: Cocktail) {
			commit('removeFavorite', rezept);
		},
		async UpdateUser({ commit, state }) {
			const value = localStorage.getItem('loggedIn') || 'false';
			const User = {
				_id: state.user._id,
				username: state.user.username,
				email: state.user.email,
				favoriten: state.user.favoriten,
				admin: state.user.isAdmin,
			};
			if (JSON.parse(value) === true && state.user.accessToken) {
				await axios
					.post(API_BASE_URL_USERS + `updateuser/${state.user._id}`, User, {
						withCredentials: true,
						headers: {
							Authorization: 'Bearer ' + state.user.accessToken,
						},
					})
					.then((res: AxiosResponse) => {
						commit('setLoggedInUser', res.data);
						localStorage.removeItem('loggedIn');
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
	},
	getters: {},
});

export default store;
