import * as fs from 'fs'
import * as crypto from 'crypto'
import oracledb from 'oracledb';
import logger from '$lib/config/winstonConfig'
import {selectBind, insertBind} from '$lib/oracle/oracleUtil'


const SSALEDM = async (sam) =>{
    const promiseOne = await insertAt_STRNHDTB(sam)
    const promiseTwo = await insertAt_STRNDTTB(sam)
    
    return Promise.all([promiseOne,promiseTwo])
}

const insertAt_cardSlip = async () => {              
}
const insertAt_cashSlip = async () => {              
}
const insertAt_SLIP_Map = {
'100000000000' : insertAt_cardSlip,
'001000000000' : insertAt_cashSlip,
}

const insertAt_STRNHDTB = async (sam) => {
    console.log('헤더에 삽입!!')
    const query = `
        INSERT INTO STRNHDTB (SALE_DATE, MS_NO, POS_NO, BILL_NO, CHAIN_NO, CHAIN_AREA, SALE_DTIME) 
        VALUES ( :SALE_DATE, :MS_NO, :POS_NO, :BILL_NO, :CHAIN_NO, :CHAIN_AREA, :SALE_DTIME ) 
    `;
    const binds = {
        SALE_DATE: {dir:oracledb.BIND_IN, val:sam.header.saleDate, type:oracledb.STRING, masSize: 8},
        MS_NO: {dir:oracledb.BIND_IN, val:sam.header.msNo, type:oracledb.STRING, masSize: 6},
        POS_NO: {dir:oracledb.BIND_IN, val:sam.header.posNo, type:oracledb.STRING, masSize: 2},
        BILL_NO: {dir:oracledb.BIND_IN, val:sam.header.billNo, type:oracledb.STRING, masSize: 4},
        CHAIN_NO: {dir:oracledb.BIND_IN, val:sam.header.chainNo, type:oracledb.STRING, masSize: 4},
        CHAIN_AREA: {dir:oracledb.BIND_IN, val:sam.header.chainArea, type:oracledb.STRING, masSize: 3},
        SALE_DTIME: {dir:oracledb.BIND_IN, val:sam.header.saleDtime, type:oracledb.STRING, masSize: 14}
    }        
    try {
        const resulte = await selectBind(query, binds)
        console.log('promiseOne');
        console.log(resulte)
        return resulte.body.source
    } catch (e) {
        logger.error(` // ${e.name}: ${e.message}`)          
    } 
}   

const insertAt_STRNDTTB = async (sam) => {        
    const Insert_STRNDTTB_Query = `
        INSERT INTO STRNDTTB (SALE_DATE, MS_NO, POS_NO, BILL_NO, LINE_NO, CHAIN_NO, CHAIN_AREA, GOODS_CD ) 
        VALUES ( :SALE_DATE, :MS_NO, :POS_NO, :BILL_NO, :LINE_NO, :CHAIN_NO, :CHAIN_AREA, :GOODS_CD ) 
    `;
    console.log('samdetail')
    console.log(sam.detail)
    console.log(Object.keys(sam.detail))    
    const promises = Object.keys(sam.detail).map(async (key, index) => {
        console.log('디테일에 삽입!!')
        console.log(sam.detail[key].lineNo)
        const binds = {
            SALE_DATE: {dir:oracledb.BIND_IN, val:sam.header.saleDate, type:oracledb.STRING, masSize: 8},
            MS_NO: {dir:oracledb.BIND_IN, val:sam.header.msNo, type:oracledb.STRING, masSize: 6},
            POS_NO: {dir:oracledb.BIND_IN, val:sam.header.posNo, type:oracledb.STRING, masSize: 2},
            BILL_NO: {dir:oracledb.BIND_IN, val:sam.header.billNo, type:oracledb.STRING, masSize: 4},
            LINE_NO: {dir: oracledb.BIND_IN, val: sam.detail[key].lineNo , type: oracledb.STRING, masSize: 2},
            CHAIN_NO: {dir:oracledb.BIND_IN, val:sam.header.chainNo, type:oracledb.STRING, masSize: 4},
            CHAIN_AREA: {dir:oracledb.BIND_IN, val:sam.header.chainArea, type:oracledb.STRING, masSize: 3},    
            GOODS_CD: {dir: oracledb.BIND_IN, val:sam.detail[key].goodsCd , type: oracledb.STRING, masSize: 20},
            // UPRICE: {dir: oracledb.BIND_IN, val:sam.detail[key].uPrice , type: oracledb.STRING },
            // SALE_QTY: {dir: oracledb.BIND_IN, val:sam.detail[key].saleQty , type: oracledb.STRING },
            // SALE_AMT: {dir: oracledb.BIND_IN, val:sam.detail[key].saleAmt , type: oracledb.STRING },
            // SALE_TOT: {dir: oracledb.BIND_IN, val:sam.detail[key].saleTot , type: oracledb.STRING },
            // DC_AMT: {dir: oracledb.BIND_IN, val:sam.detail[key].dcAmt, type: oracledb.STRING },
            // STOCK_FG: {dir: oracledb.BIND_IN, val:sam.detail[key].stockFg , type: oracledb.STRING },
            // PAR_GOODS_CD: {dir: oracledb.BIND_IN, val:sam.detail[key].parGoodsCd , type: oracledb.STRING },
            // SUB_MENU_CD: {dir: oracledb.BIND_IN, val:sam.detail[key].subMenuCd , type: oracledb.STRING },
            // SUB_MENU_NM: {dir: oracledb.BIND_IN, val:sam.detail[key].subMeneNm , type: oracledb.STRING },
        }
        try {
            return await selectBind(Insert_STRNDTTB_Query, binds)
        } catch (e) {
            logger.error(` // ${e.name}: ${e.message}`)                             
        }        
    })
    return promises    
}


// 서명데이터 생성 예제
function make_sign_data(data){
    // 개인키 READ
    // "splPrikeyPKCS8.pem" 은 테스트용 개인키
    // "changeit" 은 테스트용 개인키비밀번호
    let key_file = fs.readFileSync('..\\..\\certificate\\splPrikeyPKCS8.pem').toString();
    let password = 'changeit';
    // 서명데이터생성
    return crypto.createSign('sha256').update(data).sign({
    format: 'pem',
    key: key_file,
    passphrase: password
    }, 'base64');
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {        

        const KCP_CERT_INFO = '-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----'

        let formData = await request.formData()
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let jsonstr = JSON.stringify(object);
        let json = JSON.parse(jsonstr)
        console.log(json);

        let site_cd = json.site_cd;
  
        // 결제 REQ DATA
        let req_data = {
            tran_cd : json.tran_cd,
            site_cd : site_cd,
            kcp_cert_info : KCP_CERT_INFO,
            enc_data : json.enc_data,
            enc_info : json.enc_info,
            ordr_mony : json.ordr_mony // 결제요청금액   ** 1 원은 실제로 업체에서 결제하셔야 될 원 금액을 넣어주셔야 합니다. 결제금액 유효성 검증 **
        };
        

        // 결제 API URL
        // 개발 : https://stg-spl.kcp.co.kr/gw/enc/v1/payment
        // 운영 : https://spl.kcp.co.kr/gw/enc/v1/payment
        let res_data = await fetch("https://stg-spl.kcp.co.kr/gw/enc/v1/payment", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_data),
        })
        // 결제 API RES
        .then(response => {
                    
            return response.json(); 
        })
            .then(res_data => {

                const data = {
                    req_data : req_data,
                    res_data : res_data,                    
                };
                
            /*
            ==========================================================================
                승인 결과 DB 처리 실패시 : 자동취소
            --------------------------------------------------------------------------
                승인 결과를 DB 작업 하는 과정에서 정상적으로 승인된 건에 대해
            DB 작업을 실패하여 DB update 가 완료되지 않은 경우, 자동으로
                승인 취소 요청을 하는 프로세스가 구성되어 있습니다.

            DB 작업이 실패 한 경우, bSucc 라는 변수(String)의 값을 "false"
                로 설정해 주시기 바랍니다. (DB 작업 성공의 경우에는 "false" 이외의
                값을 설정하시면 됩니다.)
            --------------------------------------------------------------------------
            */
            let bSucc =''; // DB 작업 실패 또는 금액 불일치의 경우 "false" 로 세팅
            // bSucc='false'인 경우 자동취소로직 진행
            if( bSucc == 'false' ) {
                req_data = '';
                // 취소 REQ DATA
                let tno = data.tno;
                let mod_type = 'STSC';
                let cancel_sign_data = site_cd + '^' + tno + '^' + mod_type;
                let kcp_sign_data = make_sign_data(cancel_sign_data);

                req_data = {
                    site_cd : site_cd,
                    tno : tno,
                    kcp_cert_info : KCP_CERT_INFO,
                    kcp_sign_data : kcp_sign_data,
                    mod_type : mod_type,
                    mod_desc : '가맹점 DB 처리 실패(자동취소)'
                };
                // 취소 API URL
                // 개발 : https://stg-spl.kcp.co.kr/gw/mod/v1/cancel
                // 운영 : https:/spl.kcp.co.kr/gw/mod/v1/cancel
                fetch("https://stg-spl.kcp.co.kr/gw/mod/v1/cancel", {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req_data),
                })
                // 취소 API RES
                .then(response => {
                    return response.json();
                })
                // RES JSON DATA Parsing
                .then(data => {
                    return {
                        req_data : JSON.stringify(req_data),
                        res_data : JSON.stringify(data),
                        data : data,
                        bSucc : bSucc
                    };
                })
            // bSucc='false'가 아닌경우 자동취소로직 생략 후 결제결과처리
            } else {
                return {
                    req_data : JSON.stringify(req_data),
                    res_data : JSON.stringify(data),
                    data : data,
                    use_pay_method : json.use_pay_method,
                    ordr_idxx : json.ordr_idxx,
                    cash_yn : json.cash_yn,
                    cash_tr_code : json.cash_tr_code,
                    bSucc : bSucc
                };
            }   
        });
        console.log(res_data);

        return res_data

        
        
    }
}