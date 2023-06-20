<script>
    export let json
</script>

<div class="w-full p-5 ">
    <div class=" text-md font-bold text-orange-500">
        요청  DATA
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex flex-nowrap justify-center ">
        <textarea class="border w-full mt-3" name="" id="" cols="30" rows="10">{json.req_data}
        </textarea>
    </div>               
</div>

<div class="w-full p-5 ">
    <div class=" text-md font-bold text-orange-500">
        응답  DATA
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex flex-nowrap justify-center ">
        <textarea class="border w-full mt-3" name="" id="" cols="30" rows="10">{json.res_data}
        </textarea>
    </div>               
</div>

<div class="w-full p-5 font-bold text-xs">
    <div class=" text-md font-bold text-orange-500">
        처리 결과
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            결과코드
        </div>
        <div>
            {json.data.res_data.res_cd}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            결과 메세지
        </div>
        <div>
            {json.data.res_data.res_msg}
        </div>            
    </div>                 
</div>

{#if json.data.res_data.res_cd == '0000' && json.bSucc == '' }    
<div class="w-full p-5 font-bold text-xs">
    <div class=" text-md font-bold text-orange-500">
        공통
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            KCP 거래번호
        </div>
        <div>
            {json.data.res_data.tno}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            결제금액
        </div>
        <div>
            {json.data.res_data.amount}
        </div>            
    </div>                    
</div>
{/if}