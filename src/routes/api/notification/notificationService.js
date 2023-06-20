import { json } from "@sveltejs/kit";
import oracledb from 'oracledb';
import logger from '$lib/config/winstonConfig'
import {dbClose} from '$lib/oracle/oracleUtil'

import {getSymbolKey} from '$lib/util/util'
import dbConfig from '$lib/oracle/oracleConfig'
import {getMemberKakaoDAO, getSequenceDAO, notificationSendDAO} from './notificationDAO'

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
export const getMemberKakaoService = async (object) => {
    const connection = await oracledb.getConnection(dbConfig)
    let result
    try {
        result = await getMemberKakaoDAO(connection, object.query, object.binds)
        logger.info(`method : getMemberKakaoService`)
        // console.log('result', result);

    } catch (e) {
        logger.error(` [${e.name}] ${e.message}`)
    } finally {
        await dbClose(connection)
    }

    return (result)
}

export const getSequenceService = async (object) => {
    const connection = await oracledb.getConnection(dbConfig)
    let result
    try {
        result = await getSequenceDAO(connection, object.query)
        logger.info(`method : getSequenceService`)

    } catch (e) {
        logger.error(` [${e.name}] ${e.message}`)
    } finally {
        await dbClose(connection)
    }
    return (result)
}

export const notificationSendService = async (object) => {
    const connection = await oracledb.getConnection(dbConfig)
    let result
    try {
        result = await notificationSendDAO(connection, object.query, object.binds, object.options)
        logger.info(`method : getSequenceService`)

    } catch (e) {
        logger.error(` [${e.name}] ${e.message}`)
    } finally {
        await dbClose(connection)
    }
    return (result)
}