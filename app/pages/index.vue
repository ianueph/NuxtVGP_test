<template>
	<v-container class="my-8">
		<h1 class="mb-6">Ships</h1>

		<v-row>
			<v-col
			v-for="ship in ships"
			:key="ship.id"
			cols="12"
			sm="6"
			md="3"
			>
			<info-card
				:title="ship.name"
				description="N/A"
				:type="CardEnums.Ship"
				:info="getShipInfo(ship)"
			/>
			</v-col>
		</v-row>
	</v-container>

	<v-container class="my-8">
		<h1 class="mb-6">Rockets</h1>

		<v-row>
			<v-col
			v-for="rocket in rockets"
			:key="rocket.id"
			cols="12"
			sm="6"
			md="3"
			>
			<info-card
				:title="rocket.name"
				:description="rocket.description"
				:type="CardEnums.Rocket"
				:info="getRocketInfo(rocket)"
			/>
			</v-col>
		</v-row>
	</v-container>

	<v-container class="my-8">
		<h1 class="mb-6">Launches</h1>

		<v-row>
			<v-col
			v-for="launch in launches"
			:key="launch.id"
			cols="12"
			sm="6"
			md="3"
			>
			<info-card
				:title="launch.mission_name"
				:description="launch.details"
				:type="CardEnums.Launch"
				:info="getLaunchInfo(launch)"
			/>
			</v-col>
		</v-row>
	</v-container>
</template>
<script lang="ts" setup>
import { CardEnums } from '~/types/cards'
import type { Launch } from '~/types/launches'
import type { Rocket } from '~/types/rocket'
import type { Ship } from '~/types/ships'


const variables = {
	limit: 6,
	offset: 0,
}

const query = gql`
	query getShips($limit: Int, $offset: Int) {
		ships(limit: $limit, offset: $offset) {
			id
			name
			weight_kg
			home_port
		}
		rockets(limit: $limit, offset: $offset) {
			id
			name
			description
			diameter {
				meters
			}
			height {
				meters
			}
			stages
			success_rate_pct
			mass {
				kg
			}
			boosters
			cost_per_launch
		}
		launches(limit: $limit, offset: $offset) {
			id
            mission_name
            launch_date_local
            launch_site {
                site_name
                site_id
                site_name_long
            }
            rocket {
                rocket_name
                rocket {
                    id
                }
            }
            details
		}
	}
`

const { data } = useAsyncQuery<{
	ships: Ship[],
	rockets: Rocket[],
	launches: Launch[],
}>(query, variables)

const ships = computed(() => data.value?.ships ?? [])
const rockets = computed(() => data.value?.rockets ?? [])
const launches = computed(() => data.value?.launches ?? [])

const getShipInfo = (ship: Ship) => [
	{ title: 'Home Port', value: ship.home_port ?? 'N/A' },
	{ title: 'Weight (kg)', value: ship.weight_kg ?? 'N/A' },
]

const getRocketInfo = (rocket: Rocket) => [
	{ title: 'Mass (kg)', value: rocket.mass?.kg ?? 'N/A' },
	{ title: 'Height (m)', value: rocket.height?.meters ?? 'N/A' },
	{ title: 'Diameter (m)', value: rocket.diameter?.meters ?? 'N/A' },
	{ title: 'Stages', value: rocket.stages ?? 'N/A' },
	{ title: 'Boosters', value: rocket.boosters ?? 'N/A' },
	{ title: 'Success %', value: rocket.success_rate_pct ?? 'N/A' },
]

const getLaunchInfo = (launch: Launch) => [
	{ title: 'Launch date', value: launch.launch_date_local ?? 'N/A' },
	{ title: 'Rocket', value: launch.rocket.rocket_name ?? 'N/A' },
	{ title: 'Launch Site', value: launch.launch_site?.site_name ?? 'N/A' },
]
</script>
