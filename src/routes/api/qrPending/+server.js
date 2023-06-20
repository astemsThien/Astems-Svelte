import oracledb from 'oracledb';
import logger from '$lib/config/winstonConfig'
import { globalVarible, reservation } from '$lib/util/store'
import { get } from 'svelte/store'
import { json, error } from '@sveltejs/kit';

// 2022-12-12 인설트 추가
import {getDate, getDate8, getDate14, getSymbolKey, buildUrl} from '$lib/util/util'
import {qrPending, getMaxBillNo} from './qrService'


const getObject = get(globalVarible)

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    console.log("url", url);
	const obj = await url.searchParams
    console.log("obj", obj);


    const res = {
        goodsCd:"T135636",
        goodsNm:"커피",
        price:"5000",
        detail:{
            shot:"샷추가",
            cup:"텀블러",
            ice:"얼음추가",
            size:"벤티",
            price:"1000"
        }
    }

    return json(res)
}

const makeLineNo = (lineNo) => {
    return ('00' + lineNo).slice(-2)
}

// Insert
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
        // db.cartList 가져옴
		const obj = await request.clone().json()

        const billNoObject = {
            query : `
                SELECT TO_CHAR(MAX(BILL_NO) + 1, '0000') AS NEXT_BILL_NO FROM SPENDDTB
                WHERE MS_NO = :getMsNo AND POS_NO = :getPosNo
            `,
            binds : {
                getMsNo:{dir:oracledb.BIND_IN, val:getObject.msNo, type:oracledb.STRING},
			    getPosNo:{dir:oracledb.BIND_IN, val:getObject.posNo, type:oracledb.STRING}
            }
        }
        // billNo 세팅 autoincrement 못씀
        const billNo = await getMaxBillNo(obj, billNoObject.query, billNoObject.binds)


        // 헤더 상품 개수, 매출 집계 등을 위하여 디테일 세팅을 먼저 함
        const binds = []
        let headerTot = 0
        let headerAmt = 0
        for(let i = 0; i < obj.cartList.length; i++){
            binds.push({
                    lineNo: makeLineNo(i + 1), saleDate: getDate8(), msNo: getObject.msNo, posNo: getObject.posNo, billNo, 
                    goodsCd: obj.cartList[i].GOODS_CD, uPrice: obj.cartList[i].UPRICE, saleQty: obj.cartList[i].SALE_QTY, 
                    saleTot: obj.cartList[i].SALE_TOT, saleAmt: obj.cartList[i].SALE_AMT, dcAmt: obj.cartList[i].DC_AMT, salesGroup: null,
                    // stockFg: obj.cartList[i].STOCK_FG, subMenuCd: obj.cartList[i].SUB_MENU_CD, subMenuNm: obj.cartList[i].SUB_MENU_NM, 
                    stockFg: obj.cartList[i].STOCK_FG, subMenuCd: obj.cartList[i].SUB_MENU_CD, subMenuNm: null, 
                    parGoodsCd: obj.cartList[i].PAR_GOODS_CD, createDTime: getDate14(), createId: 'astems', lastDTime: getDate14(), lastId: 'astems'
                }
            )

            headerTot += Number(obj.cartList[i].SALE_TOT)
            headerAmt += Number(obj.cartList[i].SALE_AMT)
        }

        // 디테일 객체
        const detailObject = {
            query :  `
                INSERT INTO SPENDDTB VALUES (
                    :lineNo,:saleDate,:msNo,:posNo,:billNo,:goodsCd,:uPrice,:saleQty,:saleTot,:saleAmt,:dcAmt,
                    :salesGroup,:stockFg,:subMenuCd,:subMenuNm,:parGoodsCd,:createDTime,:createId,:lastDTime,:lastId
                )
            `,
            binds,
            options : {
                outFormat: oracledb.OUT_FORMAT_OBJECT,
                autoCommit: false,   // autocommit if there are no batch errors
                batchErrors: true  // identify invalid records; start a transaction for valid ones

            }
        }

        // 헤더 객체
        const headerObject = {
            query : `
                INSERT INTO SPENDHTB VALUES (
                    :saleDate,:getMsNo,:posNo,:billNo,:saleDTime,:saleTot,:saleAmt,:dcAmt,:detailCnt,
                    :procYn,:expiredYn,:packYn,:rvName,:procBillNo,:createDTime,:createId,:lastDTime,:lastId
                )
            `,
            binds : {
                saleDate:{dir:oracledb.BIND_IN, val:getDate8()},
                getMsNo:{dir:oracledb.BIND_IN, val:getObject.msNo},
                posNo:{dir:oracledb.BIND_IN, val:getObject.posNo},
                billNo:{dir:oracledb.BIND_IN, val:billNo},
                saleDTime:{dir:oracledb.BIND_IN, val:getDate14()},
                saleTot:{dir:oracledb.BIND_IN, val:headerTot},
                saleAmt:{dir:oracledb.BIND_IN, val:headerAmt},
                dcAmt:{dir:oracledb.BIND_IN, val:'0'},
                detailCnt:{dir:oracledb.BIND_IN, val:(obj.cartList[obj.cartList.length - 1].CNT + 1)},
                procYn:{dir:oracledb.BIND_IN, val:'N'},
                expiredYn:{dir:oracledb.BIND_IN, val:'Y'},
                packYn:{dir:oracledb.BIND_IN, val:'Y'},
                rvName:{dir:oracledb.BIND_IN, val:'조용진'},
                procBillNo:{dir:oracledb.BIND_IN, val:null},
                createDTime:{dir:oracledb.BIND_IN, val:getDate14()},
                createId:{dir:oracledb.BIND_IN, val:'astems'},
                lastDTime:{dir:oracledb.BIND_IN, val:getDate14()},
                lastId:{dir:oracledb.BIND_IN, val:'astems'}

            },
            options : {
                outFormat: oracledb.OUT_FORMAT_OBJECT,
                autoCommit: false,   // autocommit if there are no batch errors
                batchErrors: true,  // identify invalid records; start a transaction for valid ones
                bindDefs: [         // describes the data in 'binds'
                    { type: oracledb.STRING, maxSize: 8 },
                    { type: oracledb.STRING, maxSize: 6 },
                    { type: oracledb.STRING, maxSize: 2 },
                    { type: oracledb.STRING, maxSize: 4 },
                    { type: oracledb.STRING, maxSize: 14 },
                    { type: oracledb.STRING, maxSize: 11},
                    { type: oracledb.STRING, maxSize: 11 },
                    { type: oracledb.STRING, maxSize: 11 },
                    { type: oracledb.STRING, maxSize: 3 },
                    { type: oracledb.STRING, maxSize: 1 },
                    { type: oracledb.STRING, maxSize: 1 },
                    { type: oracledb.STRING, maxSize: 1 },
                    { type: oracledb.STRING, maxSize: 20 },
                    { type: oracledb.STRING, maxSize: 20 },
                    { type: oracledb.STRING, maxSize: 14 },
                    { type: oracledb.STRING, maxSize: 20 },
                    { type: oracledb.STRING, maxSize: 14 },
                    { type: oracledb.STRING, maxSize: 20 },
                ]
            }
        }

        
        const resp = await qrPending(obj, headerObject, detailObject)
        const respResult = JSON.parse(getSymbolKey(resp, 'state').body.source)


        // 알림톡에 쓸 객체
        reservation.set({
            posNo: getObject.posNo, 
            billNo, 
            phoneNo:'01057663821', 
            paymentDate: getDate().year + '-' + getDate().month + '-' + getDate().date + ' ' + getDate().hours + '시 ' + getDate().minutes + '분 ' + getDate().seconds + '초',
            paymentItem: obj.cartList.length > 1 ? obj.cartList[0].GOODS_NM + ' 외 ' +  (obj.cartList.length - 1) + '개' : obj.cartList[0].GOODS_NM,
            paymentPrice: headerTot,
            paymentURL: getSymbolKey(request.clone(), 'state').url.origin + buildUrl('/qrtest', {sd: getDate8(), mn : getObject.msNo, bn : billNo, pn : getObject.posNo})
        })

        if(respResult.headerCheck.batchErrors != undefined || respResult.detailCheck.batchErrors != undefined){
            // throw error(500, 'Not found')
            return json({flag: false})
        } else {
            return json({saleDate : getDate8(), msNo : getObject.msNo, billNo, posNo : getObject.posNo})
        }
	} catch (e) {
		logger.error(` // ${e.name}: ${e.message}`)
	}
} 
