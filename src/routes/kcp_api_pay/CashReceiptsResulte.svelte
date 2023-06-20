<script>
    export let json

    /* 현금 영수증 */ 
        /* 실결제시 : "https://admin8.kcp.co.kr/assist/bill.BillActionNew.do" */ 
        /* 테스트시 : "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do" */   
        function receiptView2( cash_no, ordr_idxx, amount ) 
        {
            receiptWin2 = "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=cash_bill&cash_no=";
            receiptWin2 += cash_no + "&";             
            receiptWin2 += "order_id="     + ordr_idxx + "&";
            receiptWin2 += "trade_mony="  + amount ;
    
            window.open(receiptWin2, "", "width=370, height=625"); 
        } 
</script>

<div class="w-full p-5 font-bold text-xs">
    <div class=" text-md font-bold text-orange-500">
        현금영수증
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            현금영수증 등록여부
        </div>
        <div>
            {json.cash_yn}                
        </div>            
    </div>
    {#if typeof json.data.cash_authno != 'undefined'}
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            현금영수증 승인번호
        </div>
        <div>
            {json.cash_authno}                
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            현금영수증 거래번호
        </div>
        <div>
            {json.cash_no}                
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            현금영수증 확인
        </div>
        <div>
            {#if json.use_pay_method == '000100000000'}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="text-blue-500" on:click={receiptView2}>현금영수증을 확인합니다.</div>
            {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="text-blue-500" on:click={receiptView2}>현금영수증을 확인합니다.</div>
            {/if}               
        </div>            
    </div>
    {/if}                       
</div>