<script>
    import PayBar from '../PayBar.svelte';
    import { browser } from '$app/environment';
    import db from "$lib/localDB/db"
    import {getDate8, getDate14} from '$lib/util/util'
    
    

    /** @type {import('./$types').ActionData} */
    export let form

    let jsonStr = JSON.stringify(form)
    let json = JSON.parse(jsonStr)
    let prevPage = "/cart"    

    const sam_factory = async()=>{
        console.log('sam 파일 생성!!')       
        const samJson = {
            header: {},
            detail: {},
            slip:{}
        }

        samJson['header']= {
            saleDate: getDate8(),//string
            msNo: json.msNo,//string
            posNo: json.posNo,//string
            billNo:'0012',//string
            chainNo: json.chainNo,//string
            chainArea: json.chainArea,//string
            saleDtime:getDate14(),//string
            saleAmt: Number(json.good_mny),//number
            saleTot: Number(json.good_mny),//number
            dcAmt: 0,//number
            detailCnt: 0,//number
            slipCnt: 0,//number
            custSeq : '',//string
        }

        if (browser) {    
            try {
                const cartList = await db.cartList.toArray()
                samJson['header']['detailCnt']=Number(cartList.length)               
                cartList.forEach((e, i, a) => {                    
                    samJson['detail'][String(i)] = {
                        saleDate: getDate8(), //string
                        msNo: json.msNo, //string
                        posNo: json.posNo, //string
                        billNo: samJson['header']['billNo'], //string
                        lineNo: ('00'+String(i+1)).slice(-2), //string
                        goodsCd: e.GOODS_CD, //string
                        uPrice : Number(e.UPRICE), //number              
                        saleQty: Number(e.SALE_QTY), //number
                        saleAmt: Number(e.SALE_AMT), //number
                        saleTot: Number(e.SALE_TOT), //number
                        dcAmt: Number(e.DC_AMT), //number
                        stockFg: e.STOCK_FG, //string
                        parGoodsCd : e.PAR_GOODS_CD, //string
                        subMenuCd: e.SUB_MENU_CD, //string
                        subMeneNm: e.SUB_MENU_NM //string
                    }
                })  
            } catch (error) {
                console.log(error)
            }                    
        }
        return samJson 
    }

    
    


    const insertAt_SLIP = async (data) => {
        const insertAt_SLIP_Resulte = await insertAt_SLIP_Map[data.req_data.tran_cd](Data)
        return insertAt_SLIP_Resulte
    }

    function call_pay_form(){
        console.log('결제화면으로 이동!!')            
            var v_frm = document.order_info;
            var PayUrl = v_frm.PayUrl.value;
            // 인코딩 방식에 따른 변경 -- Start
            if(v_frm.encoding_trans == undefined){
                v_frm.action = PayUrl;
            }
            else{
                // encoding_trans "UTF-8" 인 경우
                if(v_frm.encoding_trans.value == "UTF-8"){
                    v_frm.action = PayUrl.substring(0,PayUrl.lastIndexOf("/"))  + "/jsp/encodingFilter/encodingFilter.jsp";
                    v_frm.PayUrl.value = PayUrl;
                }
                else{                    
                    v_frm.action = PayUrl;
                }
            }
        
            if (v_frm.Ret_URL.value == ""){
                /* Ret_URL값은 현 페이지의 URL 입니다. */
                alert("연동시 Ret_URL을 반드시 설정하셔야 됩니다.");
                return false;
            }
            else{                        
                v_frm.submit()                              
            }
        }
    /* kcp 통신을 통해 받은 암호화 정보 체크 후 결제 요청 (변경불가) */
    async function chk_pay(){                        
        self.name = "tar_opener";
        var pay_form = document.pay_form;
        
        if (pay_form.res_cd.value != "undefined" ){   
            if (pay_form.res_cd.value != "0000" ){
                if (pay_form.res_cd.value == "3001"){
                    alert("사용자가 취소하였습니다.");
                    location.href = "/cart"; // 샘플에서는 거래등록 페이지로 이동
                }
                pay_form.res_cd.value = "";
                location.href = "/cart"; // 샘플에서는 거래등록 페이지로 이동
            }
            else{
                const samJson = await sam_factory()
                console.log('sam파일 생성완료')            
                let samStr= JSON.stringify(samJson)                
                pay_form.samStr.value = samStr
                pay_form.submit()              
            }            
        }else if (pay_form.enc_info.value == 'undefined'){        
            call_pay_form()            
        }                     
    }    

</script>

<div class="flex flex-wrap text"  >
    <PayBar {prevPage} />
    <div class="w-full border-b"></div>

    <form class="w-full max-h-screen" name="order_info" method="post"  >

        <div class="flex flex-wrap p-5">
            <p class=" text-xs font-thin text-gray-400 mb-1">이 페이지는 거래등록 완료 후 주문 요청하는 샘플 페이지입니다.</p>
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
                        주문번호
                    </div>
                    <input class="rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ordr_idxx" name="ordr_idxx" type="text" value={json.ordr_idxx} readonly>
                </div>
                <div class="flex items-center w-full py-2">
                    <div class="w-1/3 text-xs">
                        상품명
                    </div>
                    <input class=" appearance-none  rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="good_name" name="good_name" type="text" value={json.good_name} readonly>
                </div>
                <div class="flex items-center w-full py-2">
                    <div class="w-1/3 text-xs">
                        상품금액
                    </div>
                    <input class="appearance-none rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="good_mny" type="text" value={json.good_mny} readonly>
                </div>
                <div class="flex items-center w-full py-2">
                    <div class="w-1/3 text-xs">
                        주문자명
                    </div>
                    <input class="appearance-none rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="buyr_name" type="text" value="홍길동" readonly>
                </div>
                <div class="flex items-center w-full py-2">
                    <div class="w-1/3 text-xs">
                        전화번호
                    </div>
                    <input class="appearance-none rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="buyr_tel1" type="text" value="02-0000-0000" readonly>
                </div>
                <div class="flex items-center w-full py-2">
                    <div class="w-1/3 text-xs">
                        휴대폰 번호
                    </div>
                    <input class="appearance-none rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="buyr_tel2" type="text" value="010-0000-0000" readonly>
                </div>
                <div class="flex items-center w-full py-2">
                    <div class="w-1/3 text-xs">
                        이메일
                    </div>
                    <input class="appearance-none rounded w-full py-2 px-3 font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="buyr_mail" type="text" value="test@test.co.kr" readonly>
                </div>
            </div>           

            <a href="#none" class=" bg-orange-600 p-3 text-white flex justify-center mt-5" on:click={()=>call_pay_form()} >
                <div>
                    결제요청
                </div>
            </a>

        </div>
        <!-- //contents -->       

        <!-- footer -->
        <div class="w-full flex flex-nowrap justify-center pb-20">
        
            <div class="footer">
                ⓒ NHN KCP Corp.
            </div>
           
        </div>
        <!--//footer-->

        <!-- 공통정보 -->
        <input type="hidden" name="req_tx"          value="pay" />              <!-- 요청 구분 -->
        <input type="hidden" name="shop_name"       value="TEST SITE" />        <!-- 사이트 이름 --> 
        <input type="hidden" name="site_cd"         value={json.site_cd}>    <!-- 사이트 코드 -->
        <input type="hidden" name="currency"        value="410"/>               <!-- 통화 코드 -->
        <!-- 인증시 필요한 파라미터(변경불가)-->
        <input type="hidden" name="escw_used"       value="N" />
        <input type="hidden" name="pay_method"      value={json.pay_method} />
        <input type="hidden" name="ActionResult"    value={json.actionResult} />
        <input type="hidden" name="van_code"        value={json.van_code} />
        <!-- 신용카드 설정 -->
        <input type="hidden" name="quotaopt"        value="12"/> <!-- 최대 할부개월수 -->
        <!-- 가상계좌 설정 -->
        <input type="hidden" name="ipgm_date"       value="" />
        <!-- 리턴 URL (kcp와 통신후 결제를 요청할 수 있는 암호화 데이터를 전송 받을 가맹점의 주문페이지 URL) -->
        <input type="hidden" name="Ret_URL"         value={json.Ret_URL} />
        <!-- 화면 크기조정 -->
        <input type="hidden" name="tablet_size"     value="1.0 " />
        <!-- 추가 파라미터 ( 가맹점에서 별도의 값전달시 param_opt 를 사용하여 값 전달 ) -->
        <input type="hidden" name="param_opt_1"     value="" />
        <input type="hidden" name="param_opt_2"     value="" />
        <input type="hidden" name="param_opt_3"     value="" />
        <!-- 거래등록 응답값 -->
        <input type="hidden" name="approval_key" id="approval" value={json.approval_key}/>
        <input type="hidden" name="traceNo"                    value={json.traceNo} />
        <input type="hidden" name="PayUrl"                     value={json.PayUrl} />
        <!-- 인증창 호출 시 한글깨질 경우 encoding 처리 추가 (**인코딩 네임은 대문자) -->
        <input type="hidden" name="encoding_trans" value="UTF-8" /> 
        
        <!-- 
        =======================================
            옵션 정보                                                               
        --------------------------------------
            ※ 옵션 - 결제에 필요한 추가 옵션 정보를 입력 및 설정합니다.
        --------------------------------------
        -->
        <!--  카드사 리스트 설정
        예) 비씨카드와 신한카드 사용 설정시 -->
        <!-- <input type="hidden" name="used_card"    value="CCBC:CCLG"> -->
        <!-- 무이자 옵션
                ※ 설정할부    (가맹점 관리자 페이지에 설정 된 무이자 설정을 따른다) - "" 로 설정
                ※ 일반할부    (KCP 이벤트 이외에 설정 된 모든 무이자 설정을 무시한다) - "N" 로 설정
                ※ 무이자 할부 (가맹점 관리자 페이지에 설정 된 무이자 이벤트 중 원하는 무이자 설정을 세팅한다)   - "Y" 로 설정  -->
        <!-- <input type="hidden" name="kcp_noint"       value=""/> --> 
        <!-- 무이자 설정
                ※ 주의 1 : 할부는 결제금액이 50,000 원 이상일 경우에만 가능
                ※ 주의 2 : 무이자 설정값은 무이자 옵션이 Y일 경우에만 결제 창에 적용
                예) BC 2,3,6개월, 국민 3,6개월, 삼성 6,9개월 무이자 : CCBC-02:03:06,CCKM-03:06,CCSS-03:06:04 -->
        <!-- <input type="hidden" name="kcp_noint_quota" value="CCBC-02:03:06,CCKM-03:06,CCSS-03:06:09"/> --> 
        
        <!-- KCP는 과세상품과 비과세상품을 동시에 판매하는 업체들의 결제관리에 대한 편의성을 제공해드리고자, 
            복합과세 전용 사이트코드를 지원해 드리며 총 금액에 대해 복합과세 처리가 가능하도록 제공하고 있습니다
            복합과세 전용 사이트 코드로 계약하신 가맹점에만 해당이 됩니다
            상품별이 아니라 금액으로 구분하여 요청하셔야 합니다
            총결제 금액은 과세금액 + 부과세 + 비과세금액의 합과 같아야 합니다. 
            (good_mny = comm_tax_mny + comm_vat_mny + comm_free_mny)
        -->
        <!-- <input type="hidden" name="tax_flag"       value="TG03"> -->  <!-- 변경불가    -->
        <!-- <input type="hidden" name="comm_tax_mny"   value=""    > -->  <!-- 과세금액    --> 
        <!-- <input type="hidden" name="comm_vat_mny"   value=""    > -->  <!-- 부가세     -->
        <!-- <input type="hidden" name="comm_free_mny"  value=""    > -->  <!-- 비과세 금액 --> 
        
            
        <!-- 결제창 한국어/영어 설정 옵션 (Y : 영어) -->
        <!-- <input type="hidden" name="eng_flag"        value="Y"/> -->                      
                
        <!-- 가맹점에서 관리하는 고객 아이디 설정을 해야 합니다. 상품권 결제 시 반드시 입력하시기 바랍니다. -->
        <!-- <input type="hidden" name="shop_user_id"    value=""/> --> 
        
        <!-- 복지포인트 결제시 가맹점에 할당되어진 코드 값을 입력해야합니다. -->
        <!-- <input type="hidden" name="pt_memcorp_cd"   value=""/> --> 
            
        <!-- 결제창 현금영수증 노출 설정 옵션 (Y : 노출) -->
        <!-- <input type="hidden" name="disp_tax_yn"     value="Y"/> -->
    </form>

    <form name="pay_form" method="post" action="/kcp_api_pay" on:load={chk_pay()}>
        <input type="hidden" name="req_tx"         value={json.req_tx} />               <!-- 요청 구분          -->
        <input type="hidden" name="res_cd"         value={json.res_cd} />               <!-- 결과 코드          -->
        <input type="hidden" name="site_cd"        value={json.site_cd} />              <!-- 사이트 코드      -->
        <input type="hidden" name="tran_cd"        value={json.tran_cd} />              <!-- 트랜잭션 코드      -->
        <input type="hidden" name="ordr_idxx"      value={json.ordr_idxx} />            <!-- 주문번호           -->
        <input type="hidden" name="good_mny"       value={json.good_mny} />             <!-- 휴대폰 결제금액    -->
        <input type="hidden" name="good_name"      value={json.good_name} />            <!-- 상품명             -->
        <input type="hidden" name="buyr_name"      value={json.buyr_name} />            <!-- 주문자명           -->
        <input type="hidden" name="buyr_tel1"      value={json.buyr_tel1} />            <!-- 주문자 전화번호    -->
        <input type="hidden" name="buyr_tel2"      value={json.buyr_tel2} />            <!-- 주문자 휴대폰번호  -->
        <input type="hidden" name="buyr_mail"      value={json.buyr_mail} />            <!-- 주문자 E-mail      -->
        <input type="hidden" name="enc_info"       value={json.enc_info} />
        <input type="hidden" name="enc_data"       value={json.enc_data} />
        <input type="hidden" name="use_pay_method" value={json.use_pay_method} />
        <input type="hidden" name="cash_yn"        value={json.cash_yn} />              <!-- 현금영수증 등록여부-->
        <input type="hidden" name="cash_tr_code"   value={json.cash_tr_code} />
        <!-- 추가 파라미터 -->
        <input type="hidden" name="msNo"    value={json.msNo} />
        <input type="hidden" name="chainNo"    value={json.chainNo} />
        <input type="hidden" name="chainArea"    value={json.chainArea} />
        <input type="hidden" name="posNo"    value={json.posNo} />
        <input type="hidden" name="samStr"         value=""    />
    </form>
    
    

</div>