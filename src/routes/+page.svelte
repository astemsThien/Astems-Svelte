<script lang="js">
	import Entry from './entry/+page.svelte';

	import QRCode from "$lib/util/QRJS.svelte"
	import { page } from '$app/stores';

	import { get } from 'svelte/store'
	import { globalVarible } from '$lib/util/store'

	// qr로 받아와야하는 데이터
	let msNo = 'NC1932'
	let chainNo = 'C374'
	let posNo = '99'
	let chainArea = '000'
	let packYn = 'Y'

	let url

	const getObject = get(globalVarible)
	page.subscribe((val) => {url = val.url.origin})
	
	globalVarible.set({msNo, chainNo, posNo, chainArea, packYn, url})
</script>

<Entry/>
<!-- <center>
	<QRCode codeValue='{getObject.url}/api/qrPending' squareSize=200/>
</center> -->


