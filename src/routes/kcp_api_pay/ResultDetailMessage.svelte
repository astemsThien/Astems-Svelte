<script>
    export let json
</script>

<div class="w-full p-5 ">
    <div class=" text-md font-bold text-orange-500">
        결과 상세 메세지
    </div>
    <div class=" border-b border-b-orange-500 mt-2">           
    </div>
    <div class="flex flex-wrap mt-4  text-xs font-bold">
        {#if json.data.res_cd == '0000' }
        <div>
            결제는 정상적으로 이루어졌지만 쇼핑몰에서 결제 결과를 처리하는 중 오류가 발생하여 자동으로 취소 처리 되었습니다.
        </div>
        {:else}
        <div>
            결제는 정상적으로 이루어졌지만 쇼핑몰에서 결제 결과를 처리하는 중 오류가 발생하여 자동으로 취소 요청 하였으나, 취소가 실패 되었습니다.
        </div>        
        {/if}        
    </div>               
</div>