<script>
    export let json
</script>

<div class="w-full p-5 font-bold text-xs">
    <div class=" text-md font-bold text-orange-500">
        상품권
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">발급사 코드</div>            
        </div>
        <div>
            {json.data.tk_van_code}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            승인시간
        </div>
        <div>
            {json.data.tk_app_time}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            승인 번호
        </div>
        <div>
            {json.data.tk_app_no}
        </div>
    </div>                         
</div>