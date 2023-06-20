<script>
    export let json
</script>

<div class="w-full p-5 font-bold text-xs">
    <div class=" text-md font-bold text-orange-500">
        포인트
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs flex flex-wrap">
            <div class="w-full">포인트사</div>            
        </div>
        <div>
            {json.data.pnt_issue}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            포인트 승인시간
        </div>
        <div>
            {json.pnt_app_time}
        </div>            
    </div>
    <div class="flex items-center w-full py-2 mt-3">
        <div class="w-1/3 text-xs">
            포인트 승인번호
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
        <div class="w-1/3 text-xs">
            사용가능 포인트
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
</div>