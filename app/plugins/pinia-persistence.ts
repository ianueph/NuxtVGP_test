// @filename: pinia-persistence.ts
import localforage from 'localforage'
import type { Pinia } from 'pinia'
import { createStatePersistence } from 'pinia-plugin-state-persistence'

export default defineNuxtPlugin((nuxtApp) => {
    ;(nuxtApp.$pinia as Pinia).use(
		createStatePersistence({
			storage: {
                getItem: localforage.getItem,
                setItem: localforage.setItem,
                removeItem: localforage.removeItem
			},
		}),
	)
})