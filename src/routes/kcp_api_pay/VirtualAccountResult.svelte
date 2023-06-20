<script>
    export let json

    /* 가상 계좌 모의입금 페이지 호출 */
        /* 테스트시에만 사용가능 */
        /* 실결제시 해당 스크립트 주석처리 */
        function receiptView3() 
        {
            let receiptWin3 = "http://devadmin.kcp.co.kr/Modules/Noti/TEST_Vcnt_Noti.jsp"; 
            window.open(receiptWin3, "", "width=520, height=300"); 
        }
        
</script>

<div class="w-full p-5 font-bold text-xs">
    <div class=" text-md font-bold text-orange-500">
        가상계좌
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">가상계좌</div>
            <div>채번시간</div>
        </div>
        <div>
            {json.data.res_data.tno}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            채번은행
        </div>
        <div>
            {json.data.res_data.bankname}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            채번은행코드
        </div>
        <div>
            {json.data.res_data.bankcode}
        </div>
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            가상계좌번호
        </div>
        <div>
            {json.data.res_data.account}
        </div>
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">입금할 계좌</div>
            <div>입금주</div>
        </div>
        <div>
            {json.data.res_data.depositor}
        </div>           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">가상계좌</div>
            <div>입금마감일자</div>
        </div>
        <div>
            {json.data.res_data.depositor}
        </div>           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">모의입금</div>
            <div>(테스트시 사용)</div>
        </div>
        <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="text-blue-500" on:click={receiptView3}>모의입금 페이지로 이동합니다.</div>
        </div>           
    </div>                     
</div>