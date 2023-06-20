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
			console.log('setSuccess')
			console.log(id)
		} catch (error) {
			console.log(error)
		}
	}

	function goDetail() {
		setSelectedItem();
		location.href = '/detail';
	};



	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class=" w-3/5 h-20 pl-10" on:click={goDetail}>
	<div class=" text-l font-bold mt-1">
		<p class=" truncate">{item.GOODS_NM}</p>
	</div>
	<div class="mt-2 text-xs font-thin ">
		<p class=" truncate">상품설명</p>
		<p>{item.UPRICE} 원</p>
	</div>
</div>

<div class="flex items-center w-2/5 h-20 mb-5 space-y-2    object-cover justify-center">
	<img class="object-fit h-20 rounded-lg" src={imgUrl} alt="" />
</div>
