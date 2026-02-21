<template>
	<v-app>
		<v-main>
			<slot />
		</v-main>
		<v-app-bar :elevation="15">
			<template v-slot:prepend>
				<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			</template>

			<v-app-bar-title>Apollo Lightings Examination</v-app-bar-title>

			<template v-slot:append>	
				<v-btn icon="mdi-magnify"></v-btn>

				<v-btn icon="mdi-dots-vertical"></v-btn>
			</template>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			:location="$vuetify.display.mobile ? 'bottom' : undefined"
			temporary
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:value="item"
					link
					@click="$router.push({ path: item.href })"
				>
					<v-list-item-title v-text="item.title"></v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-footer class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3" bordered>
			<div class="flex-1-0-100 text-center mt-2">
				{{ new Date().getFullYear() }} — <strong>Apollo Lightings</strong>
			</div>
		</v-footer>
	</v-app>
</template>

<script lang="ts">
export default {
	name: 'DefaultLayout',
}
</script>
<script lang="ts" setup>

const drawer = ref(false)
const group = ref(null)

const items = [
    {
      	title: 'Home',
      	href: '/',
    },
	{
		title: 'Launches',
		href: '/space-x-launches'
	}
]

watch(group, () => {
    drawer.value = false
})
</script>
