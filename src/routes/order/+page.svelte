<script>
	import Loading from './../Loading.svelte'
	import db from "$lib/localDB/db"
	import NavBar from './NavBar.svelte'
	import { onMount } from 'svelte'
	import Item from './Item.svelte'
	import { browser } from '$app/environment'
	import { getDexie, clearDexie, getTotPrice } from '$lib/localDB/dbUtil'
	

	let prevPage = '/main';
	let activeMenu = 'new';
	

	async function getNewItemList() {
		try {			
			if (browser) {
				const items = await db.itemList.where('NEW_YN').equals('Y').toArray();
				ButtonActive('new')

				return items
			}
		} catch (error) {
			console.log(error)
		}
	}

	async function getMenuItemList(GPLU_CD) {
		try {
			const items = await db.itemList.where('GPLU_CD').equals(GPLU_CD).toArray();
			ButtonActive(GPLU_CD)
			
			return items
		} catch (error) {
			console.log(error)
		}
	}

	function ButtonActive(selectedMenu) {
		let prevMenu = activeMenu
		let currMenu = selectedMenu
		activeMenu = selectedMenu

		document.getElementById(prevMenu).classList.remove('bg-astems-purple');
		document.getElementById(prevMenu).classList.remove('text-white');
		document.getElementById(currMenu).classList.add('bg-astems-purple');
		document.getElementById(currMenu).classList.add('text-white');
	}

	onMount(() => {
		clearDexie(db.selectedItem)
		ButtonActive(activeMenu)
	});

	let Item_List_Promise = getNewItemList()
	let Category_List_Promise = getDexie(db.categoryList)

	let qty = 0
	let temp = -1
	async function checkItemCount() {
		return await db.cartList.orderBy('CNT').eachKey(CNT => {						
			if(temp !== CNT){					
				qty+=1
				console.log('더하기!!')
			}
			temp = CNT			
		})
	}

	let promise = checkItemCount();

	let totPrice = getTotPrice()

	function goCart() {
		location.href = '/cart';
	}
	
</script>

<div class="relative ">
	<div class="fixed w-full bg-white">
		<NavBar {prevPage} />
		<div class=" w-full flex flex-col ">
			<div class="flex overflow-x-scroll  hide-scroll-bar ">
				<div class="flex flex-nowrap py-3 ml-3 space-x-5 ">
					<div class="inline-block ">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							id="new"
							class="min-w-max px-3 py-1 border rounded-lg transition-shadow duration-300 ease-in-out  active:bg-astems-light-purple active:text-white"
							on:click={() => {
								Item_List_Promise = getNewItemList();
							}}
						>
							New
						</div>
					</div>
					{#await Category_List_Promise}
						<!-- promise is pending -->
					{:then value}
					
						<!-- promise was fulfilled -->
						{#each value as item}
						<!-- content here -->
						<div class="inline-block ">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								id={item.GPLU_CD}
								class="min-w-max px-3 py-1 border rounded-lg transition-shadow duration-300 ease-in-out  active:bg-astems-light-purple active:text-white"
								on:click={() => {
									Item_List_Promise = getMenuItemList(item.GPLU_CD);
								}}
							>
								{item.GPLU_NM}
							</div>
						</div>
					{/each}
					{:catch error}
						<!-- promise was rejected -->
					{/await}
					
					<div class="inline-block ">
						<div class="min-w-max  transition-shadow duration-300 ease-in-out" />
					</div>
				</div>
			</div>
			<div class=" border-b" />
		</div>
	</div>
	<div class="fixed w-full bottom-0  flex flex-nowrap justify-center bg-white">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="fixed w-11/12 bottom-0  bg-astems-purple h-12 flex flex-nowrap items-center rounded-lg mb-2 active:bg-astems-light-purple active:text-white" on:click={goCart}>

			<div class="flex flex-nowrap text-white justify-between w-full mx-2">
			{#await promise}
				<!-- promise is pending -->
			{:then value}
				<!-- promise was fulfilled -->
				<div class="flex flex-nowrap font-semi">
					<input class="w-6 ml-2 bg-white rounded-full text-astems-purple text-center font-bold mr-2" bind:value={qty} readonly/>
					<div>
						합계 :
						{#await totPrice}
							<!-- promise is pending -->
						{:then price}
							<!-- promise was fulfilled -->
							{price}
						{/await}
						원
					</div>
				</div>
				<span class="mr-2 font-bold">
					카트 이동하기
				</span>		
			{/await}
			</div>	
		</div>
	</div>
</div>

<div class=" flex flex-wrap w-full mt-30 border-b">
	<div class=" w-full h-20 " />
	<div class=" w-full h-8 " />

	{#await Item_List_Promise}
		<!-- promise is pending -->
		<Loading />
	{:then value}
		<!-- promise was fulfilled -->
		{#each value as item}
			<!-- content here -->
			<div class='w-full flex flex-nowrap border-b items-center justify-between h-24'>
				<Item {item} />
			</div>			
		{/each}		
	{/await}  
</div>


