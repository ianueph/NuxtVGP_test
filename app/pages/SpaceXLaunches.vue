<template>
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
</template>
<script lang="ts" setup>
const headers = [
    { title: 'Mission Name', align: 'start', key: 'mission_name'},
    { title: 'Launch Date, Local', align: 'start', key: 'launch_date_local'},
    { title: 'Launch Site', align: 'start', key: 'launch_site.site_name'},
    { title: 'Rocket Name', align: 'start', key: 'rocket.rocket_name'},
]

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
	launches: {
		id: string
        mission_name: string
        launch_date_local: Date
        launch_site: {
            site_name_long: string  
            site_name: string
            site_id: string
        }
        rocket: {
            rocket_name: string
        }
        details: string   
	}[]
}>(query)

const launches = computed(() => data.value?.launches ?? [])
</script>
