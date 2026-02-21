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
        <h2>Description:</h2>
        <p style="max-width: 600px;" class="indent">{{ rocket?.description }}</p>
        <h3>First Flight Date: </h3>
        <p class="indent">{{ rocket?.first_flight }}</p>
        <h3>Height: </h3>
        <p class="indent">{{ imperial == "Imperial" ? `${rocket?.height.feet} feet` : `${rocket?.height.meters} meters` }}</p>
        <h3>Diameter: </h3>
        <p class="indent">{{ imperial == "Imperial"  ? `${rocket?.diameter.feet} feet` : `${rocket?.diameter.meters} meters`}}</p>
        <h3>Mass: </h3>
        <p class="indent">{{ imperial == "Imperial"  ? `${rocket?.mass.lb} lb` : `${rocket?.mass.kg} kg` }}</p>
        <h3>Number of stages: </h3>
        <p class="indent">{{ rocket?.stages }} stages</p>
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
  font-size: 8em
}
.indent {
  padding-left: 2rem; 
}
</style>

<script lang="ts" setup>
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