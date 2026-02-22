<template>
    <v-btn @click="toggleFavouriteSafe()">
        <v-icon icon="mdi-heart-outline" v-if="isFavourite"></v-icon> 
        <v-icon icon="mdi-heart" v-else></v-icon>
        <v-icon icon="mdi-rocket-launch"></v-icon> 
    </v-btn>
</template>

<script lang="ts" setup>
import { FavouriteTypes } from '~/types/favourites';
const store = useFavourites()

const props = defineProps<{
    id?: string,
    type: FavouriteTypes,
}>();

const isFavourite = computed(() => {
    if (!props.id) return false;
    return store.isFavourite(props.type, props.id)
})

function toggleFavouriteSafe() {
  if (!props.id) return; // do nothing if id is undefined
  store.toggleFavourite(props.type, props.id);
}
</script>