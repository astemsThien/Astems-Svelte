<script>
	import db from "$lib/localDB/db"

	export let item

	const imgUrl = item.IMG_PATH+ item.IMG_FILE_NM

	const getDetailList = async (goodsCd) => {
		return await db.detailList.where('GOODS_CD').equals(goodsCd).toArray()
	}
	const getPackYn = async () => {
		return await db.orderType.toArray
	}
	const itemDetail = getDetailList(item.GOODS_CD)

	const packYn = getPackYn()

	async function setSelectedItem() {
		try {
			const id = await db.selectedItem.add({
				GOODS_CD : item.GOODS_CD, 
				GOODS_NM : item.GOODS_NM, 
				UPRICE : item.UPRICE,
				PACK_YN : packYn[packYn.length-1], 
				IMG_URL: item.IMG_PATH+item.IMG_FILE_NM,
			});			
		} catch (error) {
			console.log(error)
		}
	}

	function goDetail() {
		setSelectedItem()
		location.href = '/detail'
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class=" w-7/12  pl-3 " on:click={goDetail}>
	<div class=" text-l font-black">
		<p class=" truncate">{item.GOODS_NM}</p>
	</div>
	<div class="mt-1 text-xs font-thin ">
		<p class=' text-astems-purple font-black'>{item.UPRICE} 원</p>
		<div class="flex flex-nowrap items-center ">
			<div class=" mt-1 truncate text-gray-500 ">제품 간략 소개</div>
			
		</div>
						
	</div>
</div>

<div class="flex items-center w-4/12  space-y-2 object-cover justify-center mx-2 h-24">
	<img class="w-full object-fill h-18 rounded-lg " src={imgUrl} alt="" />
</div>
