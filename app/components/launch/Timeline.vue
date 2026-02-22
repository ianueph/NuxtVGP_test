<script setup lang="ts">
    import { useLaunchGrouping } from '~/composables/useLaunchGrouping';
    import { LaunchOrder, type Launch, type LaunchGroup } from '~/types/launches';

    function getBiggestLaunchGroup(groups: LaunchGroup[]): LaunchGroup | null {
        return groups.reduce<LaunchGroup | null>((maxGroup, group) => {
            if (!maxGroup) return group;
            return group.launches.length > maxGroup.launches.length ? group : maxGroup;
        }, null);
    }

    const model = defineModel();

    function handleClick(year: number) {
        model.value = year
    }

    const query = gql`
        query getLaunches {
            launches {
                id
                mission_name
                launch_date_local
                launch_site {
                    site_name
                    site_id
                    site_name_long
                }
                rocket {
                    rocket_name
                    rocket {
                        id
                    }
                }
                details
            }
        }
    `
    const { data } = useAsyncQuery<{
        launches: Launch[]
    }>(query)

    const launches = useLaunches(
        computed(() => data.value?.launches ?? []), 
        ref(false),
        ref<LaunchOrder>(LaunchOrder.Descending),
        ref(0),
    )

    const launch_group_arr = useLaunchGrouping(launches);
    const reverse_launch_group_arr = computed(() => [...launch_group_arr.value].reverse());
    const maxGroup = computed(() => getBiggestLaunchGroup(launch_group_arr.value)?.launches.length ?? 1);
</script>

<style setup>
.timeline {
    display: flex;
    align-items: flex-end; /* bars grow from bottom */
    height: 90%;
    justify-content: center;
    margin-top: 20px;
    max-width: 700px;
}

.bar-container {
    display: flex;
    flex-direction: column-reverse; /* stack bar and label vertically */
    align-items: center;    /* center horizontally */
    flex: 1;
    height: 100%;
    margin: 0 2px;
}

.bar {
    width: 100%;
    background: #cecece;
    cursor: pointer;
    transition: 0.2s ease;
    border: 1px solid #999;
    box-sizing: border-box;
}

.bar:hover {
    background: #e4e4e4;
}

.bar-label {
    margin-top: 4px;
    font-size: 12px;
    text-align: center;
}
</style>

<template>
  <div class="timeline">
    <div
      v-for="launch_group in [...launch_group_arr].reverse()"
      :key="launch_group.year"
      class="bar-container"
      @click="handleClick(launch_group.year)"
    >
        <div class="bar-label">
            {{ launch_group.year }} ({{ launch_group.launches.length }})
        </div>
        <div
            class="bar"
            :style="{ height: ((launch_group.launches.length / maxGroup) * 100) + '%' }
            "
        ></div>
    </div>
  </div>
</template>