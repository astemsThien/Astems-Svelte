<script>	
	import { browser } from '$app/environment'
	import Item from './Item.svelte'	
	import db from "$lib/localDB/db"

	let totPrice 
	
	const itemList = async () => {	
		if (browser) {			
			try{			
				const lineList = await db.cartList.toArray()								
				const itemList = []				
				const maxIndex = lineList.length-1				
				if(maxIndex == -1){
					totPrice = false
					return false
				}
				else{
					let subMenuCnt = lineList[0].CNT
					let subMenus = []
					let itemCnt = lineList[0].CNT
					let itemInfo =[]
					let keyCNT= 0								
					await lineList.forEach(async (e,i,a)=> {
						if(i < maxIndex){						
							let nextItem = a[i+1]				
							if(e.CNT == subMenuCnt){				
								if(e.CNT == itemCnt){
									itemInfo.push(e)
									itemCnt = nextItem.CNT						
								}
								subMenus.push(e.SUB_MENU_NM_PRICE)
								keyCNT+=1									
								if(nextItem.CNT != subMenuCnt){
									itemList.push({...itemInfo,subMenus})					
									subMenuCnt = nextItem.CNT
									itemInfo = []
									subMenus = []						
								}								
							}
						}
						else{
							let prevItem = a[i-1] ? a[i-1] : 'no exist'
							if(e.CNT != prevItem.CNT){								
								itemInfo.push(e)								
							}
							subMenus.push(e.SUB_MENU_NM_PRICE)													
							itemList.push({...itemInfo,subMenus})							
							itemInfo = []
							subMenus = []
							keyCNT = 0										
						}					
					})
					// console.log(JSON.stringify(itemList))								
					totPrice = itemList.reduce((a,c)=>a + Number(c[0].SALE_AMT),0)				
												
					return itemList
				}				
			}
			catch(error){
				console.log(error)
			}
		}			
	}

	let cartItems = []
	cartItems = itemList()

	function renew(event){
		cartItems = itemList()
	}	

	

</script>


{#await cartItems}
	<div>loading</div>
{:then itemListValue}
	{#if itemListValue}
	<div class="flex flex-wrap items-center mt-30 ">
		<div class="w-full h-20"/>
		<div class="w-full flex flex-wrap bg-white py-3">
			<div class="flex flex-nowrap ml-4">
				<span class="font-bold ">아스템즈 강변점</span>				
			</div>
		</div>
		<div class="w-full bg-white mt-1 flex-wrap py-3 space-y-3 mb-3" >
			<div class=" w-full flex space-x-2 ml-4">
				<div>
					<svg width="21" height="21" viewBox="0 0 21 21" fill="#6500CB" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.4167 5.20833C7.54167 5.20833 5.20833 7.54167 5.20833 10.4167C5.20833 13.2917 7.54167 15.625 10.4167 15.625C13.2917 15.625 15.625 13.2917 15.625 10.4167C15.625 7.54167 13.2917 5.20833 10.4167 5.20833ZM10.4167 0C4.66667 0 0 4.66667 0 10.4167C0 16.1667 4.66667 20.8333 10.4167 20.8333C16.1667 20.8333 20.8333 16.1667 20.8333 10.4167C20.8333 4.66667 16.1667 0 10.4167 0ZM10.4167 18.75C5.8125 18.75 2.08333 15.0208 2.08333 10.4167C2.08333 5.8125 5.8125 2.08333 10.4167 2.08333C15.0208 2.08333 18.75 5.8125 18.75 10.4167C18.75 15.0208 15.0208 18.75 10.4167 18.75Z" />
					</svg>
				</div>
				<div>
					매장에서 식사하기
				</div>
			</div>
			<div class=" w-full flex space-x-2 ml-4">
				<div>
					<svg width="21" height="21" viewBox="0 0 21 21" fill="#C7C7C7" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.4167 5.20833C7.54167 5.20833 5.20833 7.54167 5.20833 10.4167C5.20833 13.2917 7.54167 15.625 10.4167 15.625C13.2917 15.625 15.625 13.2917 15.625 10.4167C15.625 7.54167 13.2917 5.20833 10.4167 5.20833ZM10.4167 0C4.66667 0 0 4.66667 0 10.4167C0 16.1667 4.66667 20.8333 10.4167 20.8333C16.1667 20.8333 20.8333 16.1667 20.8333 10.4167C20.8333 4.66667 16.1667 0 10.4167 0ZM10.4167 18.75C5.8125 18.75 2.08333 15.0208 2.08333 10.4167C2.08333 5.8125 5.8125 2.08333 10.4167 2.08333C15.0208 2.08333 18.75 5.8125 18.75 10.4167C18.75 15.0208 15.0208 18.75 10.4167 18.75Z" />
					</svg>
				</div>
				<div>
					포장하기
				</div>
			</div>
		</div>
		<div class="w-full bg-white flex flex-nowrap justify-between py-3">
			<div class="ml-4 font-bold">
				주문내역
			</div>
			<div class="mr-4 text-sm text-astems-purple">
				전체삭제
			</div>
		</div>	
		{#each itemListValue as item}
			<Item {item} on:renew = {renew}/>
		{/each}		
	</div>			
	{:else}
	<div class="flex flex-wrap items-center mt-30">
		<div class="w-full h-5" />		
		<div class="w-full flex justify-center py-20">
			<svg
				class="feather feather-frown"
				fill="none"
				height="120"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				width="120"
				xmlns="http://www.w3.org/2000/svg"
				><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line
					x1="9"
					x2="9.01"
					y1="9"
					y2="9"
				/><line x1="15" x2="15.01" y1="9" y2="9" /></svg
			>
		</div>
		<div class="w-full text-center">주문상품이 없습니다.</div>		
	</div>
	{/if}
	{#if totPrice}
	<div class="flex flex-nowrap justify-between py-10">
		<div class="ml-5"> 주문금액 :</div>
		<div class="mr-5">
			{totPrice} 원
		</div>
	</div>

	<div class="w-full flex justify-evenly items-center pb-10">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class=" bg-emerald-600 text-white rounded-xl p-5 px-8">QR 결제</div>
		
		<a href="/mobile_sample/trade_reg/{totPrice}" class=" bg-rose-500 text-white rounded-xl p-5" >모바일 결제</a>
	</div>
	{/if}

{/await}







