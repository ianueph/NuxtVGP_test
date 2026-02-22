<template>
    <v-container class="rocket-details my-5">
        <h1 style="text-align: center;" class="my-15">{{ rocket?.name || "N/a"}}</h1>
            <v-switch
                v-model="imperial"
                false-value="Metric"
                true-value="Imperial"
                inset
                dense
                class="custom-switch-label"
            >
                <template #label>
                    <span style="font-size: 2em; padding-left: 1rem;">{{ imperial }}</span>
                </template>
            </v-switch>
            <favourite-button :type="FavouriteTypes.ROCKET" :id="rocket?.id"></favourite-button>
        <info-row title="Description: " :info="rocket?.description ?? 'n/a'"/>
        <info-row title="First Flight: " :info="rocket?.first_flight ?? 'n/a'"/>
        <info-row title="Height: " :info="imperial == 'Imperial' ? `${rocket?.height.feet} feet` : `${rocket?.height.meters} meters`"/>
        <info-row title="Diameter: " :info="imperial == 'Imperial' ? `${rocket?.height.feet} feet` : `${rocket?.height.meters} meters`"/>
        <info-row title="Mass: " :info="imperial == 'Imperial' ? `${rocket?.diameter.feet} feet` : `${rocket?.diameter.meters} meters`"/>
        <info-row title="Number of stages: " :info="imperial == 'Imperial' ? `${rocket?.mass.lb} pounds` : `${rocket?.mass.kg} kilograms`"/>
    </v-container>
</template>

<style scoped>
.rocket-details > * {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size:x-large
}
.rocket-details > h1 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 6em
}
</style>

<script lang="ts" setup>
import { FavouriteTypes } from '~/types/favourites';
import type { Rocket } from '~/types/rocket';
const route = useRoute();
const imperial = ref<string>("Metric"); // false = metric, true = imperial

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
const variables = {
    rocketId: route.params.id
}

const { data } = useAsyncQuery<{
	rocket: Rocket
}>(query, variables)

const rocket = computed(() => data.value?.rocket ?? null)
</script>