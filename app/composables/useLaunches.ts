import type { Launch } from "~/types/launches";

export function useLaunches(
    launches: Ref<Launch[], null>,
    filtered: Ref<boolean>,
    selectedYear: Ref<number | null>
) {
    return computed(() => {
        const items = launches ?? []

        if (!filtered.value) return items.value
        if (!selectedYear.value) return items.value

        return items.value.filter(
            l => new Date(l.launch_date_local).getFullYear() == selectedYear.value!
        )
    })
}