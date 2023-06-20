<script>
	import { browser } from '$app/environment';	
	import Item from './Item.svelte';
	import db from "$lib/localDB/db"
	import { liveQuery } from 'dexie';
	

	let prevPage = '/order'

	let searchWord = null	
	

	function goPrevPage() {
		console.log('go prevPage');
		location.href = prevPage;
	}

	function goSearch() {
		location.href = '/search';
	}

	$: searchList = liveQuery(async () => {
		try {			
			if (browser) {
				
				if([...searchWord].length==0){
					searchWord=null
				}
				var b = searchWord
				var regex = new RegExp(b) ;
				console.log(regex);
				const orderList = await db.itemList.filter( (item) => { return regex.test(item.GOODS_NM) }).toArray()

				return orderList;
			}
		} catch (error) {
			console.log(error);
		}
	});
</script>

<div class=" w-full bg-white  flex flex-nowrap  items-center space-x-3 pt-5 ">
	<!-- svelte-ignore missing-declaration -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="px-5 w-30 " on:click={goPrevPage}>
		<div>
			<svg
				class="feather feather-arrow-left"
				fill="none"
				height="24"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
				><line x1="19" x2="5" y1="12" y2="12" /><polyline points="12 19 5 12 12 5" /></svg
			>
		</div>
	</div>

	<div>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			placeholder="찾을 상품을 입력하세요."
			type="text"
			bind:value={searchWord}
		/>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class=" "
		
	>
		<svg
			class="feather feather-search"
			fill="none"
			height="24"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg
		>
	</div>
</div>

{#if $searchList}
	<!-- promise was fulfilled -->
	<div class="flex flex-wrap items-center mt-30">
		<div class="w-full h-5" />

		<div class="w-full h-10 mb-2 font-bold px-5">주문상품</div>

		{#each $searchList as item}
			<Item {item} />
		{:else}
			<div class="w-full text-center">검색된 상품이 없습니다.</div>
		{/each}
	</div>
{/if}