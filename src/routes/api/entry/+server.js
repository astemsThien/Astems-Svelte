import oracledb from 'oracledb';
import logger from '$lib/config/winstonConfig'
import {selectBind} from '$lib/oracle/oracleUtil'
import { json } from '@sveltejs/kit';
import {entryService} from './entryService'

import { globalVarible } from '$lib/util/store'
import { get } from 'svelte/store'

const getObject = get(globalVarible)


/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const obj = await url.searchParams

	const binds = {
		getMsNo:{dir:oracledb.BIND_IN, val:obj.get("getObject[msNo]"), type:oracledb.STRING},
		getChainNo:{dir:oracledb.BIND_IN, val:obj.get("getObject[chainNo]"), type:oracledb.STRING}
	}

	try {
		return await selectBind(obj.get("query"), binds)
	} catch (e) {
		logger.error(` // ${e.name}: ${e.message}`)
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		// console.log("request", request);
		const obj = await request.clone().json()
		//{ msNo: 'NC0518', chainNo: 'C069' }
		// console.log("request", obj.getObject);

		// 나중에 머든 추가하기 쉽게 객체로 만들어둠
		const categoryObject = {
			query : `
				SELECT 
					GPLU_CD,
					GPLU_NM 
				FROM 
					MCLSGGTB
				WHERE 
					MS_NO = :getMsNo
					AND CHAIN_NO = :getChainNo
			`,
			binds : {
				getMsNo:{dir:oracledb.BIND_IN, val:getObject.msNo, type:oracledb.STRING},
				getChainNo:{dir:oracledb.BIND_IN, val:getObject.chainNo, type:oracledb.STRING}
			}
		}
		const categoryList = await entryService(categoryObject)

		const itemObject = {
			query : `
				SELECT 
					M.GPLU_CD, 
					M.PLU_CD, 
					M.GOODS_CD, 
					T.GOODS_NM, 
					T.UPRICE, 
					M.IMG_PATH, 
					M.IMG_FILE_NM, 
					M.NEW_YN, 
					M.HIT_YN, 
					M.PACK_YN, 
					M.SHOP_YN, 
					TMP.DETAIL_YN
				FROM 
					MCLSGDTB M
				LEFT JOIN TGOODSTB T ON(
					M.GOODS_CD = T.GOODS_CD 
					AND M.CHAIN_NO = T.CHAIN_NO
				)
				LEFT JOIN (
					SELECT 
						M.GOODS_CD, 
						-- 부가메뉴 있으면 1 없으면 0
						NVL2(TMP.CNT, 1, 0) AS DETAIL_YN
					FROM 
						MCLSGDTB M
					LEFT OUTER JOIN(
						SELECT 
							GOODS_CD, 
							COUNT(*) AS CNT
						FROM 
							MCLSGSTB
						WHERE 
							MS_NO = :getMsNo 
							AND CHAIN_NO = :getChainNo
						GROUP BY 
							GOODS_CD
					)TMP ON(M.GOODS_CD = TMP.GOODS_CD)
					WHERE 
						M.MS_NO = :getMsNo
						AND M.CHAIN_NO = :getChainNo
				)TMP ON(TMP.GOODS_CD = M.GOODS_CD)
				WHERE 
					M.MS_NO = :getMsNo 
					AND M.CHAIN_NO = :getChainNo
			`,
			binds : {
				getMsNo:{dir:oracledb.BIND_IN, val:getObject.msNo, type:oracledb.STRING},
				getChainNo:{dir:oracledb.BIND_IN, val:getObject.chainNo, type:oracledb.STRING}
			}
		}
		const itemList = await entryService(itemObject)

		const detailObject = {
			query : `
				SELECT 
					D.GPLU_CD, 
					D.PLU_CD, 
					D.GOODS_CD, 
					D.SEQ, 
					D.SUB_GROUP_CD, 
					D.SUB_GROUP_NM, 
					D.SUB_FG,
					D.SUB_GROUP_QTY, 
					D.SUB_GROUP_GUIDE, 
					M.STOCK_FG, 
					M.UPCHARGE_UPRICE
				FROM 
					MCLSGSTB D
				LEFT JOIN 
					MSUBMNTB M ON(
						D.MS_NO = M.MS_NO 
						AND D.SUB_GROUP_CD = M.SUB_GROUP_CD 
						AND D.GOODS_CD = M.GOODS_CD
					)
				WHERE 
					D.MS_NO = :getMsNo
					AND D.CHAIN_NO = :getChainNo
			`,
			binds : {
				getMsNo:{dir:oracledb.BIND_IN, val:getObject.msNo, type:oracledb.STRING},
				getChainNo:{dir:oracledb.BIND_IN, val:getObject.chainNo, type:oracledb.STRING}
			}
		}
		const detailList = await entryService(detailObject)

		return json({
			categoryList,
			itemList,
			detailList
		})
	} catch (e) {
		logger.error(` // ${e.name}: ${e.message}`)
	}
} 
