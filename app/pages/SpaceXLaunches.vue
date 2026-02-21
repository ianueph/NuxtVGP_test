<template>
	<v-container>
        <h1 class="my-auto">
            Space X Launches
        </h1>
        <h3 class="my-5">
            Selected year, returned {{ launches.length }} rows
        </h3>

        <v-row class="mx-auto" align="center" justify="start" dense>
            <v-col cols="auto">
                <v-checkbox 
                    label="Filter by year"
                    v-model="filtered"
                ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="3" v-if="filtered">
                <v-number-input
                    v-model="selectedYear"
                    :reverse="false"
                    controlVariant="default"
                    label=""
                    :hideInput="false"
                    :inset="false"
                    variant="outlined"
                ></v-number-input>
            </v-col>
        </v-row>

        <v-data-table
        :headers="headers"
        :items="launches"
        :items-per-page="25"
        height="94vh"
        fixed-header
        fixed-footer
        density="compact"
        item-value="id"
        show-expand
        expand-on-click
        >  
            <template v-slot:expanded-row="{columns, item}">
                <tr>
                    <td :colspan="columns.length+1" class="py-2">
                        {{item.details}}
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>
<script lang="ts" setup>
import { type Launch } from '~/types/launches'

const selectedYear = ref<number>(2000)
const filtered = ref<boolean>(false)

const headers = [
    { title: 'Mission Name', align: 'start', key: 'mission_name'},
    { title: 'Launch Date, Local', align: 'start', key: 'launch_date_local'},
    { title: 'Launch Site', align: 'start', key: 'launch_site.site_name'},
    { title: 'Rocket Name', align: 'start', key: 'rocket.rocket_name'},
] as const

const query = gql`
	query getLaunches {
		launches {
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
            }
            details
		}
	}
`
const { data } = useAsyncQuery<{
	launches: Launch[]
}>(query)

const launches = useLaunches(
    computed(() => data.value?.launches ?? []), 
    filtered,
    selectedYear
    )
</script>
