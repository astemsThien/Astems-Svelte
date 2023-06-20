// +page.server.js
import { globalVarible } from '$lib/util/store'
import { get } from 'svelte/store'
const globalVar = get(globalVarible)
/** @type {import('./$types'.Actions} */
export const actions = {
    default: async ({ request }) => {
        

        let formData = await request.formData()
        console.log(formData);
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let jsonstr = JSON.stringify(object);
        let json = JSON.parse(jsonstr)

        let res_cd = json.res_cd
        if (res_cd == '0000') {
            console.log('등록 성공');
            let enc_info = json.enc_info
            
            if (enc_info == '') {
                console.log('결제 데이터 없음 ㅠㅜ');
                const post_data = {
                    approval_key: json.approvalKey,
                    traceNo: json.traceNo,
                    PayUrl: json.PayUrl,
                    pay_method : json.pay_method,
                    actionResult : json.actionResult,
                    Ret_URL : json.Ret_URL,
                    van_code : json.van_code,
                    site_cd : json.site_cd,
                    ordr_idxx : json.ordr_idxx,
                    good_name : json.good_name,
                    good_mny : json.good_mny
                }
                return post_data
            } else {
                console.log('결제 데이터 있음!');
                const post_data = {
                    req_tx : json.req_tx, // 요청 종류         
                    res_cd : json.res_cd, // 응답 코드
                    site_cd : json.site_cd, // 사이트코드       
                    tran_cd : json.tran_cd, // 트랜잭션 코드     
                    ordr_idxx : json.ordr_idxx, // 쇼핑몰 주문번호   
                    good_name : json.good_name, // 상품명            
                    good_mny : json.good_mny, // 결제 금액       
                    buyr_name : json.buyr_name, // 주문자명          
                    buyr_tel1 : json.buyr_tel1, // 주문자 전화번호   
                    buyr_tel2 : json.buyr_tel2, // 주문자 핸드폰 번호
                    buyr_mail : json.buyr_mail, // 주문자 E-mail 주소
                    use_pay_method : json.use_pay_method, // 결제 방법          
                    enc_info : enc_info, // 암호화 정보       
                    enc_data : json.enc_data, // 암호화 데이터     
                    msNo : globalVar.msNo, // 
                    chainNo : globalVar.chainNo, 
                    posNo: globalVar.posNo,
                    chainArea: globalVar.chainArea,
                  
                };
                console.log(post_data);
                return post_data

            }            
        } else {
            console.log('등록실패');
            const post_data = {
                res_cd : res_cd, // 응답 코드         
                res_msg : json.Message // 응답 메세지
            };
            return post_data
        }             
    }
}