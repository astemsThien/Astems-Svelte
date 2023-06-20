<script>
	import { browser } from '$app/environment';
	import db from "$lib/localDB/db"
	import Loading from '../Loading.svelte';
	import Body from './Body.svelte';
	import Item from './Item.svelte';
	import { getTotPrice } from '$lib/localDB/dbUtil'
	import { get } from 'svelte/store'
	import ExtraOption from './ExtraOption.svelte'
	import ExtraOptionStore from './ExtraOptionStore.svelte'


	let totPrice = getTotPrice()
	let selectOptionActive = 0
	let extraOptionActive
	let active = '0';
	let qty = 1;
	let totalOptions =[]
	let selectOptions = []
	let extraOptions = []
	let touchCount = 0

	$: extraSum = extraOptions.reduce((c,p)=>{		
		return c + p[2]		
	},0)
	$: selectSum = selectOptions.reduce((c,p)=>{		
		return c + p[2]		
	},0)
		
	

	const addExtraOption = (extraOption) =>{
		if(!extraOptions.map(e=>e[0]).includes(extraOption[0])){
			touchCount += 1
			extraOptions.push(extraOption)
			extraOptionActive = extraOption[0] + touchCount					
		}else{
			touchCount += 1
			extraOptions = extraOptions.filter(e=> e[0] !== extraOption[0])
			extraOptionActive = extraOption[0] + touchCount			
		}
							 		
	}

	async function getItemInfo() {
		try {
			if (browser) {
				const item = await db.selectedItem.toArray()
				const extraOptions = await db.detailList.where({GOODS_CD : item[0].GOODS_CD, STOCK_FG:'2'}).toArray()
				const selectOptions = await db.detailList.where({GOODS_CD : item[0].GOODS_CD, STOCK_FG:'3'}).toArray()
				
				const info = {
					sitem : item[0],
					extraOptions : extraOptions,
					selectOptions : selectOptions
				}
				
				return info
			}
		} catch (error) {
			console.log(error);
		}
	}
	

	let promise = getItemInfo();


	async function itemAdd(v,url) {		
		let cartList = await db.cartList.toArray()
			
		if(extraOptions[0] == undefined){
			try {
				await db.cartList.add({
					CNT : cartList.length!=0 ? cartList[cartList.length-1].CNT + 1 : 0 ,  
					GOODS_CD : v.sitem.GOODS_CD, 
					GOODS_NM : v.sitem.GOODS_NM, 
					UPRICE : v.sitem.UPRICE, 
					SALE_QTY : qty, 
					SALE_TOT : (extraSum+v.sitem.UPRICE)*qty, 
					SALE_AMT : (extraSum+v.sitem.UPRICE)*qty, 
					DC_AMT : '0', 
					STOCK_FG : '2', 
					SUB_MENU_CD : '', 
					SUB_MENU_NM : '', 
					PAR_GOODS_CD : '01', 
					PACK_YN : v.sitem.PACK_YN, 
					IMG_URL : v.sitem.IMG_URL  
				});
							
			} catch (error) {
				console.log(error);
			}
			location.href=url
		}
		else{													
			const insert_cartList_promises = extraOptions.map(async function(e) {
				try {										
						await db.cartList.add({							
							CNT : cartList.length!=0 ? cartList[cartList.length-1].CNT + 1 : 0 , 
							GOODS_CD : v.sitem.GOODS_CD, 
							GOODS_NM : v.sitem.GOODS_NM, 
							UPRICE : v.sitem.UPRICE, 
							SALE_QTY : qty, 
							SALE_TOT : (extraSum+v.sitem.UPRICE)*qty, 
							SALE_AMT : (extraSum+v.sitem.UPRICE)*qty, 
							DC_AMT : '0', 
							STOCK_FG : '2', 
							SUB_MENU_CD : e[0], 
							SUB_MENU_NM : e[1], 
							PAR_GOODS_CD : '01', 
							PACK_YN : v.sitem.PACK_YN, 
							IMG_URL : v.sitem.IMG_URL,
							SUB_MENU_NM_PRICE : e[1]+'('+e[2]+')'+'원', 
					});					
				} catch (error) {
					console.log(error);
					return false
				}
			})
			await Promise.all(insert_cartList_promises)
			location.href=url						
		}		
	}
</script>

<!-- svelte-ignore missing-declaration -->
{#await promise}
<!-- promise is pending -->
<div class="relative ">
	<div class="fixed w-full bg-white">
		<Loading />
	</div>
</div>
{:then v}

	<!-- promise was fulfilled -->

	<img class="object-fill w-full h-64  " src={v.sitem.IMG_URL} alt="" 
	/>		
	<div class="flex flex-wrap items-end mt-5">			
		<div class="w-full">
			<span class="mx-5 border border-astems-light-purple rounded-xl text-center text-xs text-astems-light-purple p-1">
				Best
			</span>
			<div class="mx-5 text-xl font-extrabold pt-3 pb-3">
				<div>
					{v.sitem.GOODS_NM}
				</div>
			</div>				
		</div>
		<div class="w-full text-center bg-gray-100 p-3 mx-4 rounded-xl text-gray-400 text-xs font-bold">
			상품 설명 보기
		</div>
		<div class="w-full mx-5 mt-3 mb-1 flex flex-nowrap justify-between">
			<div class="font-extrabold">
				수량
			</div>
			<div class="flex flex-nowrap space-x-2 items-center">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={qty === 1
						? (qty = 1)
						: () => {
								qty = qty - 1;
							}}
					class=" text-gray-400"
				>
					<svg  height="20" viewBox="0 0 20 20" fill={qty==1?"#C7C7C7":"#252525"} xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM5.5 9.5C5.22386 9.5 5 9.72386 5 10C5 10.2761 5.22386 10.5 5.5 10.5H14.5C14.7761 10.5 15 10.2761 15 10C15 9.72386 14.7761 9.5 14.5 9.5H5.5Z" />
					</svg>					
				</div>
				<div class="text-xl font-bold">
					{qty} 	
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => {
						qty = qty + 1;
					}}
					class=" text-gray-400"
				>
					<svg  height="20" viewBox="0 0 20 20" fill="#252525" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM5 10C5 9.72386 5.22386 9.5 5.5 9.5H9.5V5.5C9.5 5.22386 9.72386 5 10 5C10.2761 5 10.5 5.22386 10.5 5.5V9.5H14.5C14.7761 9.5 15 9.72386 15 10C15 10.2761 14.7761 10.5 14.5 10.5H10.5V14.5C10.5 14.7761 10.2761 15 10 15C9.72386 15 9.5 14.7761 9.5 14.5V10.5H5.5C5.22386 10.5 5 10.2761 5 10Z" />
					</svg>
					
				</div>
			</div>				
		</div>
		<div class="w-full mx-5 flex flex-nowrap justify-between mb-4">
			<div class="font-bold">
				가격
			</div>
			<div class="font-bold">
				{(extraSum+v.sitem.UPRICE)*qty} 원
			</div>				
		</div>
		<div class="w-full border-b" 
		/>
		<div class="w-full">		
			<div class="space-y-4">			
				<Body bind:active>
					<Item id="0" title="선택 옵션" option="(필수 선택)">
						<div class="p-1">
							{#each v.selectOptions as selectoption}					
								<div class="flex flex-nowrap">
									<div class="mr-2">
										<svg width="21" height="21" viewBox="0 0 21 21" fill="#6500CB" xmlns="http://www.w3.org/2000/svg">
											<path d="M10.4167 5.20833C7.54167 5.20833 5.20833 7.54167 5.20833 10.4167C5.20833 13.2917 7.54167 15.625 10.4167 15.625C13.2917 15.625 15.625 13.2917 15.625 10.4167C15.625 7.54167 13.2917 5.20833 10.4167 5.20833ZM10.4167 0C4.66667 0 0 4.66667 0 10.4167C0 16.1667 4.66667 20.8333 10.4167 20.8333C16.1667 20.8333 20.8333 16.1667 20.8333 10.4167C20.8333 4.66667 16.1667 0 10.4167 0ZM10.4167 18.75C5.8125 18.75 2.08333 15.0208 2.08333 10.4167C2.08333 5.8125 5.8125 2.08333 10.4167 2.08333C15.0208 2.08333 18.75 5.8125 18.75 10.4167C18.75 15.0208 15.0208 18.75 10.4167 18.75Z" />
										</svg>											
									</div>
									<div>
										{selectoption.SUB_GROUP_NM}	
									</div>
								</div>																					 
							{/each}
						</div>
					</Item> 
			
					<Item id="1" title="추가 옵션" option="(중복 가능)">
						<div class='flex flex-wrap p-1'>
							<ExtraOptionStore bind:extraOptionActive>
							{#each v.extraOptions as extraOption }							
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<div class="flex flex-nowrap space-x-3 items-center py-2 "  on:click={()=>addExtraOption([extraOption.SUB_GROUP_CD,extraOption.SUB_GROUP_NM,extraOption.UPCHARGE_UPRICE] )}>									
									<ExtraOption id={extraOption.SUB_GROUP_CD} title={extraOption.SUB_GROUP_NM+" : "+extraOption.UPCHARGE_UPRICE+" 원 추가"} extraOptions={extraOptions}/>																	
								</div>																						 
							{/each}
							</ExtraOptionStore>	
						</div>
					</Item> 
			
					<Item id="2" title="기타 옵션" option="(단일 선택)">
						
					</Item> 
				</Body>
			</div>					
			
		</div>
		<div class="w-full border-b" 
		/>				
	</div>
	
	<div class="bg-gray-100 p-5 flex flex-nowrap justify-between font-extrabold">
		<div class="">
			총 주문 가격 
		</div>
		<div class=" text-astems-purple">
			{#await totPrice}
				<!-- promise is pending -->
			{:then price}
				<!-- promise was fulfilled -->
				{price} 원
			{/await}
		</div>
	</div>

	<div class="flex flex-nowrap justify-between w-auto bg-white ">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				itemAdd(v,'/order');
			}}
			class="w-full rounded-lg m-1 border border-astems-purple bg-white active:bg-gray-600 active:text-white text-astems-purple p-5 text-center font-extrabold"
		>
			카트에 담기
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				itemAdd(v,'/cart');
			}}
			class="w-full rounded-lg m-1 bg-astems-purple active:bg-gray-600 active:text-white  text-white p-5 text-center font-extrabold "
		>
			주문하기
		</div>
	</div>
{/await}


