<script>
	import { browser } from '$app/environment';
	import db from "$lib/localDB/db"
	import { createEventDispatcher } from 'svelte';	
	export let item

	let itemInfo = item[0]
	let subMenus = item.subMenus
	let qty =  itemInfo.SALE_QTY
	let saleAmt = itemInfo.SALE_AMT
	const price = saleAmt/qty
	

	const dispatch = createEventDispatcher()

	function renew(){
		dispatch('renew',{})
	}

	const delCartItem = async (CNT) => {
		if (browser){
			try {
				await db.cartList.where('CNT').equals(CNT).delete().then(()=>{
					renew()
				})
			} catch (error) {
				console.log(error)
			}
		}
	}

	const changeQty = async (CNT) => {
		if (browser){			
			try {
				await db.cartList.where('CNT').equals(CNT).modify({
					SALE_QTY : qty,
					SALE_AMT : price * qty,
					SALE_TOT : price * qty,
				}).then(()=>{
					renew()
				})
			} catch (error) {
				console.log(error)
			}
		}	}
</script>

<div class="flex w-full flex-wrap">
	<div class="w-full flex flex-nowrap justify-between items-center px-5 py-2">
		<div class=" text-l font-bold mt-1">
			<p class=" truncate">{itemInfo.GOODS_NM}</p>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="flex items-center  justify-center"
			on:click={()=>{delCartItem(itemInfo.CNT)}}
		>
			<svg
				class="feather feather-x"
				fill="none"
				height="24"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
				><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg
			>
		</div>
	</div>

	<div class="flex items-center w-full h-20 mb-5 space-y-2 justify-evenly">
		<img class=" h-20 rounded-xl" src={itemInfo.IMG_URL} alt="" />
		<div class="w-1/3 flex flex-nowrap justify-evenly mr-5 border rounded-xl p-3">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="w-full text-center"
				on:click={
				qty == 1
					? (qty = 1)
					: () => {
							qty -= 1 
							changeQty(itemInfo.CNT)
					  }}
			>
				-
			</div>

			<div class = " w-full">
				{itemInfo.SALE_QTY} 개
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="w-full text-center"
				on:click={() => {
					qty += 1 
					changeQty(itemInfo.CNT)
				}}
			>
				+
			</div>
		</div>
	</div>
	<div class=" text-xs font-thin  p-2  px-5">
		<p>가격 : {itemInfo.SALE_AMT} 원</p>
		<p>sub옵션 : 머그컵</p>
		<p>
			extra옵션 : {#each subMenus as item}
				 {item}
			{/each}
		</p>
	</div>
</div>

<div class="w-full border mt-2" />
