<script>
	import CashReceiptsResulte from './CashReceiptsResulte.svelte'
    import CommonResult from './CommonResult.svelte'
    import ResultDetailMessage from './ResultDetailMessage.svelte';   
    import NavBar from './NavBar.svelte'    
	import VirtualAccountResult from './VirtualAccountResult.svelte'
	import Footer from './Footer.svelte'
	import CreditCardResulte from './CreditCardResulte.svelte'
	import AccountResulte from './AccountResulte.svelte'
	import PointResulte from './PointResulte.svelte'
	import MobileResulte from './MobileResulte.svelte'
	import GiftCardResulte from './GiftCardResulte.svelte'
    
    /** @type {import('./$types').ActionData} */
    export let form 
         
    let json = form
    console.log('페이지 데이터 받음!!')   
    let prevPage='/main'
      
           
</script>

<div class="flex flex-wrap">
    <NavBar {prevPage} />
    <CommonResult {json} />
    <!-- //DB 작업 성공 여부 -->
    {#if json.bSucc != '' }
    <ResultDetailMessage {json} />
    <!-- // DB 작업 실패시 -->
    {:else}
        <!-- //DB 작업 성공시 
        //신용카드(신용카드 영수증 포함) -->
        {#if json.use_pay_method == '100000000000'}
        <CreditCardResulte {json} />
        <!-- //계좌이체 -->
        {:else if json.use_pay_method == '010000000000'}
        <AccountResulte {json} />
        <!-- //가상계좌 -->
        {:else if json.use_pay_method == '001000000000'}
        <VirtualAccountResult {json} />
        <!-- //복지포인트 -->
        {:else if json.use_pay_method == '000100000000'}
        <PointResulte {json} />
        <!-- //휴대폰결제 -->
        {:else if json.use_pay_method == '000010000000'}
        <MobileResulte {json} />
        <!-- //상품권 -->
        {:else if json.use_pay_method == '000000001000'}
        <GiftCardResulte {json} />
            <!-- // 현금 영수증 발행여부 (계좌이체, 가상계좌, 복지포인트 현긍영수증 발행 여부 ) -->
            {#if json.cash_yn != 'N' } 
                {#if json.use_pay_method == '010000000000' | json.use_pay_method == '001000000000' | json.use_pay_method == '000100000000'}
                <CashReceiptsResulte {json} />
                {/if}                
            {/if}                    
        {/if}
    {/if}        
    <Footer />
</div>


