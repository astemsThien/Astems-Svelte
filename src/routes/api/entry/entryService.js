import oracledb from 'oracledb';
import logger from '$lib/config/winstonConfig'
import {dbClose} from '$lib/oracle/oracleUtil'

import {getSymbolKey} from '$lib/util/util'
import dbConfig from '$lib/oracle/oracleConfig'
import {entryDAO} from './entryDAO'

export const entryService = async (Object) => {
    const connection = await oracledb.getConnection(dbConfig)
    let result
    try {
        result = await entryDAO(connection, Object.query, Object.binds)
        logger.info(`method : entryService`)

    } catch (e) {
        logger.error(` [${e.name}] ${e.message}`)
    } finally {
        await dbClose(connection)
    }
    return getSymbolKey(result, 'state')
}