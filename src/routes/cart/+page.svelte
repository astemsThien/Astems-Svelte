<script>
	import CartBar from './CartBar.svelte'
	import CartList from './CartList.svelte'


	// 용진
	import axios from 'axios'
	import { goto } from '$app/navigation';
	import {buildUrl} from '$lib/util/util'
	import {getDexie} from '$lib/localDB/dbUtil'
	import db from "$lib/localDB/db"

	// qr주소 get
	const getQrRendering = async () => {
		const response = await axios.post(`/api/qrPending`, {
			cartList: await getDexie(db.cartList)
		})

		if(response.status === 200){
			return response
		}else{
			goto("/search")
		}
	}

	// qr생성 전 알림톡 발송
	const notificationSend = async (msNo) => {
		const response = await axios.post(`/api/notification`, {
			msNo
		})

		if(response.status === 200){
			return response
		}else{
			goto("/search")
		}
	}

	// 버튼 이벤트
	const paymentPending = async () => {
		if(confirm("예약 하시겠슴까?")){
			const qrRendering = await getQrRendering()
			// console.log('qrRendering', qrRendering);

			console.log('qrRendering', qrRendering.data.flag);

			// globalVarible, qrRender
			// <QRCode codeValue='{getObject.url}/api/qrPending' squareSize=200/>

			if(qrRendering.data.flag === undefined && qrRendering.data.flag !== false){
				// 알림톡 버튼을 위해서 url생성만 get 요청 후에 post 요청 할 예정
				
				notificationSend()
				// 테스트
				goto('/', {replaceState:true})
			}else{
				// 에러처리 해야됨
				goto('/qrtest2')
			}
			
		}
	}

	let prevPage = '/order'
</script>
<div class="relative w-full">
	<div class="fixed w-full bg-white">
		<CartBar {prevPage} />
	</div>
	<div class="fixed w-full bottom-0 bg bg-white h-14 flex flex-nowrap  justify-center">
		<div class="w-11/12 my-2 flex flex-nowrap space-x-2">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={paymentPending} class="w-full text-astems-purple border border-astems-purple text flex justify-center items-center rounded-lg">
				<div>
					키오스크 결제
				</div>
			</div>	
			<div class="w-full text-white bg-astems-purple text flex justify-center items-center rounded-lg">
				<div>
					모바일 결제
				</div>
			</div>			
		</div>
	</div>
</div>
<div class="w-full bg-gray-100">
	<CartList />
</div>



