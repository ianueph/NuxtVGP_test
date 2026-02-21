<template>
	<v-container>
        <h1>
            Space X Launches
        </h1>
        <h3>
            Selected year
        </h3>
        <v-number-input
            v-model="selectedYear"
            :reverse="false"
            controlVariant="default"
            label=""
            :hideInput="false"
            :inset="false"
            variant="outlined"
            width="400"
        ></v-number-input>
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

const launches = useFilteredLaunches(
    computed(() => data.value?.launches ?? []), 
    selectedYear
    )
</script>
