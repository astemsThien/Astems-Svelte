import oracledb from 'oracledb';
import logger from '$lib/config/winstonConfig'
import { globalVarible, reservation } from '$lib/util/store'
import { get } from 'svelte/store'
import { json } from '@sveltejs/kit';

// 2022-12-12 인설트 추가
import {getDate8, getDate14, getSymbolKey} from '$lib/util/util'
import {getMemberKakaoService, getSequenceService, notificationSendService} from './notificationService'

const getObject = get(globalVarible)

const telSlice = (str) => {
    return str.length == 9 ? str.slice(0, 2) + '-' + str.slice(2, 5) + '-' + str.slice(5, 9) : (
        str.length == 10 ? 
            str.slice(0, 2) + '-' + str.slice(2, 6) + '-' + str.slice(6, 10) : 
            str.slice(0, 3) + '-' + str.slice(3, 7) + '-' + str.slice(7, 11)
    )
}

// Insert
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const obj = await request.clone().json()

        const memberKaKaoObject = {
            query : `
                SELECT 
                    M.MS_NM, 
                    M.TEL_NO, 
                    M.KKA_USE_YN, 
                    K.YELLOWID_KEY, 
                    K.USERCODE, 
                    K.DEPTCODE, 
                    K.RESEND_YN
                FROM 
                    MMEMBSTB@REAL_ASP2 M,
                    KKALRMTB@REAL_ASP2 K
                WHERE 
                    M.MS_NO = K.MS_NO
                    AND M.MS_NO = :getMsNo
                    AND M.KKA_USE_YN = 'Y'
            `,
            binds : {
				getMsNo:{dir:oracledb.BIND_IN, val:getObject.msNo, type:oracledb.STRING}
			}
        }
        const getMemberKakao = await getMemberKakaoService(memberKaKaoObject)
        const getMemberKakaoResult = JSON.parse(getSymbolKey(getMemberKakao, 'state').body.source).rows[0]
        // console.log('getMemberKakao', getMemberKakaoResult);
        /*
            getMemberKakaoResult [
                {
                MS_NM: '고객지원데모(본사)',
                TEL_NO: '021231234',
                KKA_USE_YN: 'Y',
                YELLOWID_KEY: '444cdac23b9b49288c5cecd7ccfbd3b0165fd5a2',
                USERCODE: 'astems                        ',
                DEPTCODE: 'RQ-TBE-FY                     ',
                RESEND_YN: 'N'
                }
            ]
        */

        const seqObject = {
            query: `
                SELECT 
                    SUREDATA_SEQNO.NEXTVAL@REAL_ASP2 SEQ 
                FROM 
                    DUAL
            `
        }
        const getSequence = await getSequenceService(seqObject)
        const getSequenceResult = JSON.parse(getSymbolKey(getSequence, 'state').body.source).rows[0].SEQ

        // get(reservation) {
        //     posNo: '99',
        //     billNo: '0081',
        //     phoneNo: '01057663821',
        //     paymentDate: '2022-12-26 11시 23분 12초',
        //     paymentItem: '와인한잔 외 3개',
        //     paymentPrice: 22000
        //   }

        const messageObject = {
            msg1: `[ 매장명 : ${getMemberKakaoResult.MS_NM} ]<br/>`,
            msg2: `고객님의 주문이 예약 완료되었습니다.<br/>`,
            msg3: `<br/>`,
            msg4: `■영수번호 : ${get(reservation).posNo}-${get(reservation).billNo}<br/>`,
            msg5: `■휴대폰 번호 : ${telSlice(get(reservation).phoneNo)}<br/>`,
            msg6: `<br/>`,
            msg7: `■결제일시 : ${get(reservation).paymentDate}<br/>`,
            msg8: `■결제상품 : ${get(reservation).paymentItem}<br/>`,
            msg9: `■결제금액 : ${get(reservation).paymentPrice}원<br/>`,
            msg10: `<br/>`,
            msg11: `▶예약이 완료되었습니다. 매장 내에 배치되어있는 키오스크를 통해 QR코드로 결제를 진행해주십시오.<br/>`,
            msg12: `감사합니다.<br/>`,
            msg13: `<br/>`,
            msg14: `☎ 매장 전화번호 : ${telSlice(getMemberKakaoResult.TEL_NO)}`
        }

        let msg = ''
        for(let key in messageObject){
            msg += messageObject[key]
        }

        const notificationObject = {
            query: `
                INSERT INTO SUREDATA@REAL_ASP2( 
                      SEQNO           , USERCODE           , DEPTCODE          , BIZTYPE           , YELLOWID_KEY
                    , REQNAME         , REQPHONE           , CALLPHONE         , MSG                    
                    , REQTIME         , RESULT             , KIND              , RESEND            , TEMPLATECODE
                    , BTN_TYPE_01     , BTN_NM_01          , BTN_01_URL_01     , BTN_01_URL_02
                ) VALUES (
                      :seq                                      --순번
                    , :userCode                                 -- usercode (가맹본사 아이디)
                    , :deptCode                                 -- deptcode (가맹본사 그룹코드)
                    , 'at'                                      -- biz type (at : 알림톡, ft : 친구톡)
                    , :yellowIdKey                              -- yellow id key(가맹본사 프로필키)
                    , :reqName                                  -- 회신자명
                    , :telNo                                    -- 회신자 번호    
                    , :phoneNo                                  -- 수신자번호   
                    , replace(:msg ,'<br/>', chr(13)||chr(10))  -- 내용
                    , '00000000000000'                          -- 예약문자 전송시 'YYYYmmddHHMMss', 즉시전송시 '00000000000000'
                    , '0'                                       -- Default = 0, ( 0 : 즉시전송(숫자 0) R : 예약전송 )
                    , 'T'                                       -- M : MMS, S : SMS, I : 국제문자, L : 국제 MMS, T : BIZ MESSAGE
                    , :resendYn                                 -- RESEND 여부
                    , :templateCode                             -- 템플릿 코드

                    , :buttonType                               -- 버튼타입 WL:웹버튼, AL : 앱버튼, DS : 배송조회, BK : 봇키워드, MD : 메시지전달
                    , :buttonName                               -- 버튼이름 완전 똑같아야 됨
                    , :buttonUrl1                               -- url 앱 주소 "https://" 포함
                    , :buttonUrl2                               -- url 웹 주소 "https://" 포함
                )
            `, 
            binds : {
                seq:{dir:oracledb.BIND_IN, val:getSequenceResult},
                userCode:{dir:oracledb.BIND_IN, val:getMemberKakaoResult.USERCODE},
                deptCode:{dir:oracledb.BIND_IN, val:getMemberKakaoResult.DEPTCODE},
                yellowIdKey:{dir:oracledb.BIND_IN, val:getMemberKakaoResult.YELLOWID_KEY},
                reqName:{dir:oracledb.BIND_IN, val:getMemberKakaoResult.MS_NM},
                telNo:{dir:oracledb.BIND_IN, val:getMemberKakaoResult.TEL_NO},
                phoneNo:{dir:oracledb.BIND_IN, val:get(reservation).phoneNo},
                msg:{dir:oracledb.BIND_IN, val:msg},
                resendYn:{dir:oracledb.BIND_IN, val:getMemberKakaoResult.RESEND_YN},
                templateCode:{dir:oracledb.BIND_IN, val:'WebKiosk_003'},
                buttonType:{dir:oracledb.BIND_IN, val:'WL'},
                buttonName:{dir:oracledb.BIND_IN, val:'QR 확인'},
                buttonUrl1:{dir:oracledb.BIND_IN, val:get(reservation).paymentURL},
                buttonUrl2:{dir:oracledb.BIND_IN, val:get(reservation).paymentURL}
            },
            options : {
                outFormat: oracledb.OUT_FORMAT_OBJECT,
                autoCommit: false,   // autocommit if there are no batch errors
                batchErrors: true,  // identify invalid records; start a transaction for valid ones
                bindDefs: [         // describes the data in 'binds'
                    { type: oracledb.STRING, maxSize: 6 },
                    { type: oracledb.STRING, maxSize: 30 },
                    { type: oracledb.STRING, maxSize: 30 },
                    { type: oracledb.STRING, maxSize: 40 },
                    { type: oracledb.STRING, maxSize: 32 },
                    { type: oracledb.STRING, maxSize: 20 },
                    { type: oracledb.STRING, maxSize: 20 },
                    { type: oracledb.STRING, maxSize: 4000 },
                    { type: oracledb.STRING, maxSize: 1 },
                    { type: oracledb.STRING, maxSize: 40 },
                    { type: oracledb.STRING, maxSize: 2 },
                    { type: oracledb.STRING, maxSize: 56 },
                    { type: oracledb.STRING, maxSize: 1000 },
                    { type: oracledb.STRING, maxSize: 1000 }
                ]
            }
        }

        const notificationSend = await notificationSendService(notificationObject)
        // console.log('notificationSend', notificationSend);
        
        /* 
            필요한 값 SEQNO: 'SUREDATA_SEQNO.NEXTVAL@REAL_ASP2', USERCODE: 'astems', DEPTCODE: 'RQ-TBE-FY', BIZTYPE:'at', YELLOWID_KEY:'444cdac23b9b49288c5cecd7ccfbd3b0165fd5a2',
            REQNAME : msNm, REQPHONE : '0312405000(회신자번호)', CALLPHONE : '01057663821(수신자번호)',
            msg:
                replace('[ 매장명 : 고객지원데모(본사) ]
                고객님의 주문이 예약 완료되었습니다.

                ■영수번호 : 83-0013
                ■휴대폰 번호 : 010-5766-3821

                ■결제일시 : 2022-12-19 13:03:10
                ■결제상품 : 까페라떼
                ■결제금액 : 1,000원

                ▶예약이 완료되었습니다. 매장 내에 배치되어있는 키오스크를 통해 QR코드로 결제를 진행해주십시오.
                감사합니다.

                ☎ 매장 전화번호 : 031-240-5000' ,'<br/>', chr(13)||chr(10)),
            REQTIME: '00000000000000(-- 예약문자 전송시 'YYYYmmddHHMMss', 즉시전송시 '00000000000000')',
            RESULT: '0(Default = 0, ( 0 : 즉시전송(숫자 0) R : 예약전송 ))', KIND: 'T(M : MMS, S : SMS, I : 국제문자, L : 국제 MMS, T : BIZ MESSAGE)', 
            RESEND : 'N', TEMPLATECODE : 'WebKiosk_003(템플릿 코드)', 
            BTN_TYPE_01: 'WL', BTN_NM_01:'QR 확인', BTN_01_URL_01:'url', BTN_01_URL_02:'url'
        */

        // return json({saleDate : getDate8(), msNo : getObject.msNo, billNo, posNo : getObject.posNo})
        return json(1)
	} catch (e) {
		logger.error(` // ${e.name}: ${e.message}`)
	}
} 
