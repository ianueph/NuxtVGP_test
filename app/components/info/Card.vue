<script lang="ts" setup>
import { CardEnums } from '~/types/cards';

const props = defineProps<{
    title: string,
    description: string,
    type: CardEnums,
    info: {
        title: string,
        value: string | number | Date,
    }[],
}>()

const reveal = ref(false)
</script>

<template>
    <div>
        <v-card
            class="mx-auto d-flex flex-column"
            max-width="344"
            height="16rem"
            elevation="16"
        >
            <v-card-text class="flex-grow-1">
            <p class="text-h4 font-weight-black">{{title}}</p>

            <p>{{ type }}</p>

            <div class="text-medium-emphasis line-clamp">
                {{description ?? "n/a"}}
            </div>
            </v-card-text>

            <v-card-actions>
            <v-btn
                text="Learn More"
                variant="text"
                @click="reveal = true"
            ></v-btn>   
            </v-card-actions>

            <v-expand-transition>
            <v-card
                v-if="reveal"
                class="position-absolute w-100 d-flex flex-column"
                height="100%"
                style="bottom: 0;"
            >
                <v-card-text class="pb-0 flex-grow-1">
                <p class="text-h4 my-0 pb-4">Additional Info</p>

                <v-container>
                    <v-row>
                        <v-col v-for="item in info" cols="6" class="pa-0">
                            <info-row :title="item.title" :info="item.value ?? 'n/a'"/>
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>

                <v-card-actions class="pt-0">
                <v-btn
                    text="Close"
                    variant="text"
                    @click="reveal = false"
                ></v-btn>
                </v-card-actions>
            </v-card>
            </v-expand-transition>
        </v-card>
    </div>
</template>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>