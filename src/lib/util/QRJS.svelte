<script>
    import { onMount } from 'svelte';

    import { get } from 'svelte/store'
	import { globalVarible } from '$lib/util/store'
    
    export let codeValue;
    export let squareSize; 
    export let value; 

    let qrcode;

    const getObject = get(globalVarible)

    onMount(() => {

        let script = document.createElement('script');
        script.src = "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"
        document.head.append(script);
        
        script.onload = () => {
            qrcode = new QRCode("qrcode", {
                text: codeValue,
                value,
                width: squareSize,
                height: squareSize,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });		
            console.log("qrcode", qrcode._htOption);			
        };	

    });
</script>
  
<style>
    #qrcode {
        width:200px;
        height:200px;
        margin-top:15px;
    }
</style>
  
<div id="qrcode"></div>
  
  