<script>   

    /** @type {import('./$types').Actionform} */
    export let form

    let jsonStr = JSON.stringify(form)
    let json = JSON.parse(jsonStr) 
    
    

    function goNextPage(){

        console.log('gogo')

        if (json.Code == "0000"){
                           
        document.formData.submit()
        }
        else{
        
            document.location.href = "/cart";
        }

    }   

</script>


<form method="post"  name="formData" action='/mobile_sample/order_mobile'  on:load={goNextPage()}>
    <!--//footer-->
    <input type="hidden" name="site_cd"         value={json.site_cd }/>  <!-- 사이트 코드 -->
    <input type="hidden" name="ordr_idxx"       value={json.ordr_idxx }/><!-- 주문번호     -->
    <input type="hidden" name="good_mny"        value={json.good_mny }/> <!-- 결제금액     -->
    <input type="hidden" name="good_name"       value={json.good_name }/><!-- 상품명       -->
    <!-- 리턴 URL (kcp와 통신후 결제를 요청할 수 있는 암호화 데이터를 전송 받을 가맹점의 주문페이지 URL) -->
    <input type="hidden" name="Ret_URL"         value={json.Ret_URL }/>
    <!-- 인증시 필요한 파라미터(변경불가)-->
    <input type="hidden" name="pay_method"      value={json.pay_method }/>
    <input type="hidden" name="ActionResult"    value={json.actionResult }/>
    <input type="hidden" name="van_code"        value={json.van_code }/>
    <!-- 거래등록 응답 값 -->
    <input type="hidden" name="approvalKey"     value={json.approvalKey }/>
    <input type="hidden" name="traceNo"         value={json.traceNo }/>
    <input type="hidden" name="PayUrl"          value={json.PayUrl }/>
    <!-- order_mobile 분기 처리를 위한 구분 값  -->
    <input type="hidden" name="enc_info"        value="" />
    <input type="hidden" name="res_cd"          value={json.Code}/>
    <input type="hidden" name="res_msg"         value={json.Message}/>
</form>




