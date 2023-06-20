<script>
	import {clearDexie} from "$lib/localDB/dbUtil"
	import db from "$lib/localDB/db"
	const goOrder = () =>{
		location.href='/order'
	}

	clearDexie(db.cartList)

</script>

<div class="min-h-screen flex flex-wrap items-start">
	<div class="w-full flex flex-nowrap justify-end">
		<div class=" border-2 rounded-md border-astems-purple px-1 mt-4 mr-4 pb-1">
			<span class="text-xs text-astems-purple font-bold">한국어 </span>
		</div>		
	</div>
	<div class="flex flex-wrap justify-center w-full">
		<div class="w-full flex justify-center">
			<img class="h-36" src="astems.png" alt="">
		</div>		
		<div class="font-extrabold text-gray-400 text-sm">
			강변점
		</div>
	</div>
</div>


<div class="static">
	<div class="w-full bg-white flex justify-center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class=" w-11/12 absolute bottom-2 bg-astems-purple text-white text-center p-4 rounded-md font-extrabold active:bg-astems-light-purple active:text-white" on:click={goOrder}>
			주문 시작하기
		</div>
	</div>	
</div>


 




