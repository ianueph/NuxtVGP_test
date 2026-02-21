export interface Launch {
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
            rocket: {
                id: string
            }
        }
        details: string   
	}

export enum LaunchOrder {
    Ascending = 'ascending',
    Descending = 'descending'
}

export interface LaunchGroup {
    year: number,
    launches: Launch[]
}