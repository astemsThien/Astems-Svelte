<script>	
	
    export let json

    /* 신용카드 영수증 */ 
    /* 실결제시 : "https://admin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=card_bill&tno=" */ 
    /* 테스트시 : "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=card_bill&tno=" */ 
    function receiptView( tno, ordr_idxx, amount ) 
    {
        receiptWin = "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=card_bill&tno=";
        receiptWin += tno + "&";
        receiptWin += "order_no=" + ordr_idxx + "&"; 
        receiptWin += "trade_mony=" + amount ;

        window.open(receiptWin, "", "width=455, height=815"); 
    }

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
        카드
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            카드
        </div>
        <div>
            {json.data.card_cd}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            승인번호
        </div>
        <div>
            {json.data.app_no}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            할부개월
        </div>
        <div>
            {json.data.quota}
        </div>
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            무이자여부
        </div>
        <div>
            {json.data.noinf}
        </div>
    </div>
    {#if json.data.pnt_issue == 'SCSK' || json.data.pnt_issue == 'SCWB' }//복합결제(신용카드+포인트) 승인결과 처리
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            포인트사
        </div>
        <div>
            {json.data.pnt_issue}
        </div>
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">포인트</div>
            <div>승인시간</div>
        </div>
        <div>
            {json.data.pnt_app_time}
        </div>           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">포인트</div>
            <div>승인번호</div>
        </div>
        <div>
            {json.data.pnt_app_no}
        </div>           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">적립금액</div>
            <div>or 사용금액</div>
        </div>
        <div>
            {json.data.pnt_amount}
        </div>           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            발생 포인트
        </div>
        <div>
            {json.data.add_pnt}
        </div>
    </div>
    
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">사용가능</div>
            <div>포인트</div>
        </div>
        <div>
            {json.data.use_pnt}
        </div>           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            총 누적 포인트
        </div>
        <div>
            {json.data.rsv_pnt}
        </div>
    </div>
        {#if json.cash_yn == 'Y'}
        <div class="flex items-center w-full py-2 mt-3">
            <div class="w-1/3 text-xs ">                
                현금영수증 확인
            </div>
            <div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="text-blue-500" on:click={()=>{receiptView2(json.data.cash_no, json.ordr_idxx, json.dataset_dev.pnt_amount)}}>현금영수증을 확인합니다.</div>
            </div>           
        </div> 
        {/if}
    {/if}
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs ">                
            현금영수증 확인
        </div>
        <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="text-blue-500" on:click={()=>{receiptView(json.data.tno, json.ordr_idxx, json.dataset_dev.amount)}}>현금영수증을 확인합니다.</div>
        </div>           
    </div>                        
</div>
