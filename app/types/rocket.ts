export interface Rocket {
		id: string
		name: string
		description: string
		diameter: {
			meters: number
			feet: number
		}
		height: {
			meters: number
			feet: number
		}
		stages: number
		success_rate_pct: number
		mass: {
			kg: number
			lb: number
		}
		boosters: number
		cost_per_launch: number
        first_flight: string
	}