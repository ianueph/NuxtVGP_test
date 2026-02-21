export interface Rocket {
    id: string,
    name: string,
    description: string,
    first_flight: string,
    diameter: {
        feet: number,
        meters: number,
    }
    height: {
        meters: number,
        feet: number,
    },
    mass: {
        kg: number,
        lb: number,
    },
    stages: number
}