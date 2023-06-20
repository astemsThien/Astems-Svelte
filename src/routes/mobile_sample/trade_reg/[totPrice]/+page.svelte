<script>
    import PayBar from "../../PayBar.svelte";
    /** @type {import('./$types').PageData} */
    export let data
    let totPrice = data.totPrice

    let prevPage="/cart"

    async function goNextPage(){

        if (document.order_info.pay_method != '' |undefined){                    
            document.order_info.submit()
            }
        else{

            document.location.href = "/mobile_sample/trade_reg";
        }

    }   

    function jsf__chk_type(){        
            if ( document.order_info.ActionResult.value == "card" )
            { 
                console.log('카드');               
                document.order_info.pay_method.value = "CARD";
            }
            else if ( document.order_info.ActionResult.value == "acnt" )
            {
                document.order_info.pay_method.value = "BANK";
            }
            else if ( document.order_info.ActionResult.value == "vcnt" )
            {
                document.order_info.pay_method.value = "VCNT";
            }
            else if ( document.order_info.ActionResult.value == "mobx" )
            {
                document.order_info.pay_method.value = "MOBX";
            }
            else if ( document.order_info.ActionResult.value == "ocb" )
            {
                document.order_info.pay_method.value = "TPNT";
                document.order_info.van_code.value = "SCSK";
            }
            else if ( document.order_info.ActionResult.value == "tpnt" )
            {
                document.order_info.pay_method.value = "TPNT";
                document.order_info.van_code.value = "SCWB";
            }
            else if ( document.order_info.ActionResult.value == "scbl" )
            {
                document.order_info.pay_method.value = "GIFT";
                document.order_info.van_code.value = "SCBL";
            }
            else if ( document.order_info.ActionResult.value == "sccl" )
            {
                document.order_info.pay_method.value = "GIFT";
                document.order_info.van_code.value = "SCCL";
            }
            else if ( document.order_info.ActionResult.value == "schm" )
            {
                document.order_info.pay_method.value = "GIFT";
                document.order_info.van_code.value = "SCHM";
            }
        }


</script>
<div class="flex flex-wrap ">
    <PayBar {prevPage} />
    <div class="w-full border-b"></div>

    <form class="w-full max-h-screen" name="order_info" method="post" action="/mobile_sample/kcp_api_trade_reg"  >

        <div class="flex flex-wrap p-5">
            <p class=" text-xs font-thin text-gray-400 mb-1">이 페이지는 거래등록을 요청하는 샘플 페이지입니다.</p>
            <p class=" text-xs">소스 수정 시 [※ 필수] 또는 [※ 옵션] 표시가 포함된 문장은 가맹점의 상황에 맞게 적절히 수정 적용하시기 바랍니다.</p>
        </div>
        <div class="px-5 font-bold">
            <p class=" text-orange-600 py-2">
                거래등록
            </p>
            <div class="border-b border-orange-700">
            </div>

            <div class="flex flex-wrap">
                <div class="flex items-center w-full py-2 mt-3">
                    <div class="w-1/3 text-xs">
                        주문번호(체인명)
                    </div>
                    <input class="  rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="ordr_idxx" type="text" value="astems" readonly>
                </div>
                <div class="flex items-center w-full py-2">
                    <div class="w-1/3 text-xs">
                        상품명(매장명)
                    </div>
                    <input class=" appearance-none  rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="good_name" type="text" value="webkiosk" readonly>
                </div>
                <div class="flex items-center w-full py-2">
                    <div class="w-1/3 text-xs">
                        상품금액
                    </div>
                    <input class="appearance-none rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="good_mny" type="text" bind:value={totPrice} readonly>
                </div>

            </div>

            <p class=" text-orange-600 py-2">
                결제수단
            </p>
            <div class="border-b border-orange-700">
            </div>

            <div class="flex flex-wrap">
                <div class="flex items-center w-full py-5">
                    <div class="w-1/3 text-xs">
                        결제수단
                    </div>
                    <select name="ActionResult" class="w-full border h-10 text-xs" on:change={()=>jsf__chk_type()}>
                        <option value="" selected>  선택하십시오</option>
                        <option value="card">신용카드</option>
                        <option value="acnt">계좌이체</option>
                        <option value="vcnt">가상계좌</option>
                        <option value="mobx">휴대폰</option>
                        <option value="ocb">OK캐쉬백</option>
                        <option value="tpnt">복지포인트</option>
                        <option value="scbl">도서상품권</option>
                        <option value="sccl">문화상품권</option>
                        <option value="schm">해피머니</option>
                    </select>
                </div>
            </div>

            <label class=" bg-orange-600 p-3 text-white flex justify-center mt-5">
                <div>
                    <input type="submit"  value="거래등록">
                </div>
            </label>

        </div>        
        <input type="hidden"   name="Ret_URL"         value="https://127.0.0.1:7777/mobile_sample/order_mobile" />
        <!-- <input type="hidden"   name="Ret_URL"         value="https://astemskiosk.kro.kr/kcp_api_pay" /> -->
        <input type="hidden"   name="user_agent"      value="" /> <!--사용 OS-->
        <input type="hidden"   name="site_cd"         value="T0000" /> <!--사이트코드-->
        <!-- 인증시 필요한 파라미터(변경불가)-->
        <input type="hidden" name="pay_method"      value="" />
        <input type="hidden" name="van_code"        value="" />
    </form>

    <div class="w-full flex flex-nowrap justify-center pb-20">
        
        <div class="footer">
            ⓒ NHN KCP Corp.
        </div>
       
    </div>

</div>