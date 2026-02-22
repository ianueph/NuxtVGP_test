<script lang="ts" setup>
import { FavouriteTypes } from '~/types/favourites'
import { LaunchOrder, type Launch } from '~/types/launches'

const selectedYear = ref<number>(2000)
const isFilteredByYear = ref<boolean>(false)
const order = ref<LaunchOrder>(LaunchOrder.Ascending)

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
                rocket {
                    id
                }
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
    isFilteredByYear,
    order,
    selectedYear
    )
</script>


<style scoped>
.launch-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  margin-bottom: 30px;
}
</style>

<template>
	<v-container>
        <v-row class="mt-10">
            <v-col class="launch-header">
                <h1 class="my-auto">
                    Space X Launches
                </h1>
                <h3 class="my-5">
                    We returned {{ launches.length }} rows.
                </h3>
                <v-row align="center" justify="start" dense>
                    <v-col cols="auto" class="mx-3 my-auto">
                        <v-checkbox 
                            label="Filter by year"
                            v-model="isFilteredByYear"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="auto" class="mx-3 my-auto">
                        <v-switch
                            v-model="order"
                            :label="`Order: ${order}`"
                            false-value="ascending"
                            true-value="descending"
                            inset
                            dense
                        ></v-switch>
                    </v-col>
                </v-row>
            </v-col>
              
            <v-col>
                <launch-timeline v-model="selectedYear" v-if="isFilteredByYear"/>
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
        >  
            <template v-slot:expanded-row="{columns, item}">
                <tr>
                    <td :colspan="columns.length+1" class="py-2">
                        {{item.details}}
                    </td>
                </tr>
            </template>
            <template #item.launch_site.site_name="{item}">
                {{
                    item.launch_site?.site_name ??
                    item.launch_site?.site_id ??
                    "N/A"
                }}
            </template>
            <template #item.rocket.rocket_name="{item}">
                <div class="d-flex align-center justify-space-between">
                    <nuxt-link :to="{ name: 'rocket-id', params: { id: item.rocket.rocket.id}}">
                        {{ item.rocket.rocket_name }}
                    </nuxt-link>
                    <favourite-button :id="item.rocket.rocket.id" :type="FavouriteTypes.ROCKET">
                        
                    </favourite-button>
                </div>
            </template>
        </v-data-table>
    </v-container>
</template>
