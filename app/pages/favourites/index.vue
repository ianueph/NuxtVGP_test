<script lang="ts" setup async>
import { CardEnums } from '~/types/cards';
import type { Rocket } from '~/types/rocket';

const store = useFavourites()

const query = gql`
	query getRocket($rocketId: ID!) {
		  rocket(id: $rocketId) {
            id
            name
            description
            first_flight
            diameter {
                meters
                feet
            }
            height {
                meters
                feet
            }
            mass {
                kg
                lb
            }
            stages
        }
    }
`

const ids = computed(() => store.favourites.rockets)
const queries = computed(() => (
    ids.value.map((id) => useAsyncQuery<{rocket:Rocket}>(query, {rocketId: id.id}))
))
const rockets : ComputedRef<Rocket[]> = computed(() =>
    queries.value.map(query => query.data.value?.rocket ?? {} as Rocket
))

const getRocketInfo = (rocket: Rocket | undefined) => [
	{ title: 'Mass (kg)', value: rocket?.mass?.kg ?? 'N/A' },
	{ title: 'Height (m)', value: rocket?.height?.meters ?? 'N/A' },
	{ title: 'Diameter (m)', value: rocket?.diameter?.meters ?? 'N/A' },
	{ title: 'Stages', value: rocket?.stages ?? 'N/A' },
	{ title: 'Boosters', value: rocket?.boosters ?? 'N/A' },
	{ title: 'Success %', value: rocket?.success_rate_pct ?? 'N/A' },
]

</script>

<template>
    <v-container class="ma-3 mx-auto">
		<v-row align="center" justify="space-between" dense>
            <v-col cols="auto">
                <h1 class="mb-0">Favourite Rockets</h1>
            </v-col>

            <v-col cols="auto">
                <v-btn small @click="store.$reset()">
                <v-icon icon="mdi-rocket-launch" class="me-1"></v-icon>
                    Reset
                </v-btn>
            </v-col>
        </v-row>

		<v-row>
			<v-col
			v-for="rocket in rockets"
			:key="rocket.id"
			cols="12"
			sm="6"
			md="3"
			>
			<info-card
				:title="rocket.name ?? 'n/a'"
				:description="rocket.description ?? 'n/a'"
				:type="CardEnums.Rocket"
				:info="getRocketInfo(rocket)"
			/>
			</v-col>
		</v-row>
	</v-container>
</template>
