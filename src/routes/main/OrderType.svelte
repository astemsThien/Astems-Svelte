<script>
	import { browser } from '$app/environment'
	import db from "$lib/localDB/db"

	async function setOrderTypeEatIn() {
		try {
			if (browser) {
				const id = await db.orderType.add({
					type: 'eatIn'
				})
				location.href = '/order'
			}
		} catch (error) {
			console.log('set eatIn error')
		}
	}

	

	async function setOrderTypeTakeOut() {
		try {
			if (browser) {
				const id = await db.orderType.add({
					type: 'takeOut'
				});
				location.href = '/order'
			}
		} catch (error) {
			console.log('set take out error')
		}
	}
</script>


	
		<div class="flex flex-nowrap w-full h-auto items-center justify-between m-2 ">			

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="w-full bg-gray-100"
				on:click={() => {
					setOrderTypeEatIn();
				}}
			>
				<div class="flex flex-wrap justify-center border  py-10   transition-shadow duration-300 h-full ease-in-out bg-white text-gray-600 active:bg-slate-700 active:text-white">
					<div class="flex w-full justify-center p-2 ">
						<svg
							class="feather feather-user"
							fill="none"
							height="48"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							width="48"
							xmlns="http://www.w3.org/2000/svg"
							><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle
								cx="12"
								cy="7"
								r="4"
							/></svg
						>
					</div>
					<div>
						<span class="font-bold">매장</span>
					</div>
				</div>
			</div>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="w-full"
				on:click={() => {
					setOrderTypeTakeOut();
				}}
			>
				<div class="flex flex-wrap justify-center border  py-10   transition-shadow duration-300 h-full ease-in-out bg-white text-gray-600 active:bg-slate-700 active:text-white">
					<div class="flex w-full justify-center p-2">
						<svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M-6 -2H44V48H-6V-2Z" fill="#7C7C7C"/>
							</svg>
							
					</div>
					<div>
						<span class="font-bold">포장</span>
					</div>
				</div>
			</div>
		</div>	
			