<script>
    export let json
</script>

<div class="w-full p-5 font-bold text-xs">
    <div class=" text-md font-bold text-orange-500">
        휴대폰
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">휴대폰 결제시간</div>            
        </div>
        <div>
            {json.data.app_time}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            통신사 코드
        </div>
        <div>
            {json.data.commid}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            휴대폰 번호
        </div>
        <div>
            {json.data.mobile_no}
        </div>
    </div>                         
</div>