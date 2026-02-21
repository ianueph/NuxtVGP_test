import type { Launch, LaunchGroup } from "~/types/launches";

export function useLaunchGrouping(launches: Ref<Launch[]>) {
    const groupLaunchesByYear = computed((): LaunchGroup[] => {
        const grouped: Record<number, Launch[]> = {};

        launches.value.forEach(launch => {
            if (!launch.launch_date_local) return;
            const year = new Date(launch.launch_date_local).getFullYear();
            if (!grouped[year]) grouped[year] = [];
            grouped[year].push(launch);
        });

        return Object.entries(grouped)
            .map(([year, launches]) => ({
                year: Number(year),
                launches
            }))
            .sort((a, b) => b.year - a.year);
    });

    return groupLaunchesByYear;
}