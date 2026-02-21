import type { Launch, LaunchOrder } from "~/types/launches";

export function useLaunches(
    launches: Ref<Launch[], null>,
    filtered: Ref<boolean>,
    order: Ref<LaunchOrder>,
    selectedYear: Ref<number | null>
) {
    return computed(() => {
        let items = launches.value ?? []

        if (filtered.value && selectedYear.value) {
            items = items.filter(
                l => new Date(l.launch_date_local).getFullYear() === selectedYear.value
            )
        }

        if (order.value == 'descending') {
            items = [...items].reverse()
        }

        return items
    })
}