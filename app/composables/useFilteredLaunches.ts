import type { Launch } from "~/types/launches";

export function useFilteredLaunches(
    launches: Ref<Launch[], null>,
    selectedYear: Ref<number | null>
) {
    return computed(() => {
        const items = launches ?? []

        if (!selectedYear.value) return items.value

        return items.value.filter(
            l => new Date(l.launch_date_local).getFullYear() >= selectedYear.value!
        )
    })
}