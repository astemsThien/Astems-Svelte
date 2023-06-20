import oracledb from 'oracledb';
import logger from '$lib/config/winstonConfig'
import {dbClose} from '$lib/oracle/oracleUtil'
import {qrHeader, qrDetail, maxBillNo} from './qrDAO'

import {getDate8, getDate14, getSymbolKey} from '$lib/util/util'
import dbConfig from '$lib/oracle/oracleConfig'
import { json } from '@sveltejs/kit';

// 시퀀스, a_i 대신 billNo세팅
export const getMaxBillNo = async (obj, query, binds) => {
    let result
    const connection = await oracledb.getConnection(dbConfig)
    try {
        const rows = await maxBillNo(connection, query, binds)

        if(JSON.parse(getSymbolKey(rows, 'state').body.source).rows[0].NEXT_BILL_NO === null){
            result = '0001'
        }else{
            result = await (JSON.parse(getSymbolKey(rows, 'state').body.source).rows[0].NEXT_BILL_NO).slice(-4);
        }

        logger.info(`api/qrPending/qrService : method : getMaxBillNo`)
    } catch (e) {
        logger.error(` [${e.name}] ${e.message}`)
    } finally {
        await dbClose(connection)
    }
    return result
}

// 예약테이블 헤더 및 디테일 삽입
export const qrPending = async (obj, headerObject, detailObject) => {
    const connection = await oracledb.getConnection(dbConfig)
    
    let headerCheck
    let detailCheck
    
    try {
        const headerResult = await qrHeader(connection, headerObject.query, headerObject.binds, headerObject.options)
        headerCheck = await JSON.parse(getSymbolKey(headerResult.clone(), 'state').body.source)

        // 헤더 isnert 성공 시
        if(headerCheck.rowsAffected > 0 && headerCheck.batchErrors === undefined){
            const detailResult = await qrDetail(connection, detailObject.query, detailObject.binds, detailObject.options)
            detailCheck = await JSON.parse(getSymbolKey(detailResult.clone(), 'state').body.source)
            
            // 디테일 insert 성공 시
            if(detailCheck.rowsAffected > 0 && detailCheck.batchErrors === undefined){
                logger.info(`method : qrPending   qr생성 성공`)
            }else{
                logger.error('method : qrPending   qr생성 실패')
                logger.error(detailCheck.batchErrors)
                connection.rollback()
            }
        }else{
            logger.error(headerCheck.batchErrors)
            connection.rollback()
        }

    } catch (e) {
        logger.error(` [${e.name}] ${e.message}`)
    } finally {
        await dbClose(connection)
    }

    return json({
        headerCheck,
        detailCheck
    })
}