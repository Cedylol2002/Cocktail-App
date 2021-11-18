<template>
	<body>
		<div v-if="user.favoriten.length == 0">
			<h1>Es ist hier so Still. Sammel doch ein paar Cocktails :)</h1>
		</div>
		<div v-else>
			<div class="all-recepies center">
				<div v-for="value in user.favoriten" v-bind:key="value">
					<table class="tableData">
						<div class="center">
							<tr>
								<th>{{ value.name }}</th>
							</tr>
							<tr>
								<th><img :src="value.bild" width="150" height="150" class="bild" /></th>
							</tr>
						</div>
						<tr>
							<td>Alkohol:</td>
							<td>{{ value.alkohol ? 'Ja' : 'Nein' }}</td>
						</tr>
						<tr>
							<td>Anleitung:</td>
							<td class="Anleitung">{{ value.anleitung }}</td>
						</tr>
						<tr>
							<td>Zutaten:</td>
							<td class="directionary" v-for="(item, key) in value.zutaten" v-bind:key="key">
								{{ item.name }} - {{ item.menge }}{{ item.einheit }}
							</td>
						</tr>
						<tr>
							<td>Utensil:</td>
							<td class="directionary" v-for="(item, key) in value.utensil" v-bind:key="key">
								{{ item }}
							</td>
						</tr>

						<tr>
							<td>Schwierigkeit:</td>
							<td>{{ value.diff }}</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td class="edit">
								<o-button
									v-if="store.state.user.isAuthenticated"
									@click="store.dispatch('RemoveFromFavorites', value)"
									iconRight="star"
								/>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</body>
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

.all-recepies {
	margin-bottom: 10rem;
	color: #ffffff;

	.center {
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin: auto;
	}

	.bild {
		border: 2px solid #000000;
	}

	.tableData {
		margin: auto auto 2%;
		border: 50px solid transparent;
		border-image: url('../static/Frame.png');
		border-image-slice: 25%;
	}

	.edit {
		.o-btn {
			color: #000000;
			background-color: #e1cc81;
		}
	}

	.Anleitung {
		width: 100%;
	}

	.searcher {
		width: 10%;
	}

}

// CSS MEDIA QUERYS
@media only screen and (max-width: 599px) {
	.all-recepies {
		.FilterContainer {
			width: 70%;
		}

		.tableData {
			width: 100%;
		}

		.searcher {
			width: 100%;
		}
	}
}
@media only screen and (min-width: 600px) {
	.all-recepies {
		.FilterContainer {
			width: 70%;
		}

		.tableData {
			width: 90%;
		}

		.searcher {
			width: 100%;
		}
	}
}
@media only screen and (min-width: 980px) {
	.all-recepies {
		.FilterContainer {
			width: 70%;
		}

		.tableData {
			width: 80%;
		}

		.searcher {
			width: 60%;
		}
	}
}
@media only screen and (min-width: 1260px) {
	.all-recepies {
		.FilterContainer {
			width: 40%;
		}

		.tableData {
			width: 60%;
		}

		.searcher {
			width: 40%;
		}
	}
}
</style>
