import { FavouriteTypes } from "~/types/favourites";

export const useFavourites = defineStore('favourites', {
	state: () => ({ 
		favourites: {
			rockets: [] as {id: string}[]
		}
	}),
	getters: {
		isFavourite: (state) => {
			return (type: FavouriteTypes, id: string) => {
				return state.favourites[type].some(item => item.id === id)
			}
		}
	},
	actions: {
		toggleFavourite<T extends {id: string}>(
			type: FavouriteTypes,
			id: string
		) {
			const list = this.favourites[type] as T[]

			const index = list.findIndex(i => i.id === id)

			if (index === -1) {
				list.push({id} as T)
			} else {
				list.splice(index, 1)
			}
		}
	},
	persist: {
		debug: true,
		include: ['favourites']
	}
})

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

