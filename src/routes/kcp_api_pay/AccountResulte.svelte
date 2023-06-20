<script>
    export let json
</script>

<div class="w-full p-5 font-bold text-xs">
    <div class=" text-md font-bold text-orange-500">
        계좌이체
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">계좌이체시간</div>            
        </div>
        <div>
            {json.data.app_time}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            이체은행
        </div>
        <div>
            {json.data.bankname}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            은행코드
        </div>
        <div>
            {json.data.bankcode}
        </div>
    </div>                         
</div>