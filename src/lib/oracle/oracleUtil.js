import oracledb from 'oracledb';
import logger from '$lib/config/winstonConfig'
import dbConfig from '$lib/oracle/oracleConfig'
import { json } from '@sveltejs/kit';
import path from 'path'
import { dbInit } from '$lib/util/store'

const oracleInit = async () => {
	//oracle client 경로 설정
	// oracledb.initOracleClient({ libDir: path.resolve('C:\\instantclient_21_7') });	
	// oracledb.initOracleClient({ libDir: path.resolve('./src/lib/oracle/instantclient_21_7') });
	// oracledb.initOracleClient({ libDir: path.resolve(process.env.LD_LIBRARY_PATH) });
	// oracledb.initOracleClient({ libDir: path.resolve("src\\lib\\oracle\\instantclient_21_8") });
	
	logger.info('DB Initialization Success')
}

// store
dbInit.subscribe(value => {
	if (!value) {
		dbInit.set(true)
		oracleInit()
	}
})

export const dbClose = async (connection) => {
	if(connection){
		try {
			await connection.commit()
			logger.info("DB Disconnection")
		} catch (e) {
			await connection.rollback()
			logger.error(` [${e.name}] ${e.message}`)
		} finally {
			await connection.close();
		}
	}
}


export const billNoSelect = async (query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true}) => {
	const connection = await oracledb.getConnection(dbConfig)
	let result
	try {
		result = await connection.execute(query, binds, options)
	} catch (e) {
		logger.error(` [${e.name}] ${e.message}`)
	} finally {
		dbClose(connection)
	}

	return result.rows
}

export const selectBind = async (query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true}) => {
	const connection = await oracledb.getConnection(dbConfig)
	let result
	try {
		result = await connection.execute(query, binds, options)
		logger.info("[api/entry method : selectBind] " + query)

		if(result.rowsAffected !== undefined)
			logger.info(result.rowsAffected + '행 성공')
		else
			logger.info('Result Rows : ' + result.rows.length)

		// 에러확인
		// resolve(result)
	} catch (e) {
		logger.error(` [${e.name}] ${e.message}`)
	} finally {
		dbClose(connection)
	}
	return json(result)
}

export const insertBind = async (query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true, batchErrors: true}) => {
	const connection = await oracledb.getConnection(dbConfig)
	let result

	try {
		result = await connection.executeMany(query, binds, options)
		logger.info("rowsAffected : " + result.rowsAffected + " / lastRowid : " + result.lastRowid)
	} catch (e) {
		logger.error(` [${e.name}] ${e.message}`)
	} finally {
		dbClose(connection)
	}
	
	console.log("insert result", result);
	// insert result {
	// 	rowsAffected: 1,
	// 	batchErrors: [ [Error: ORA-01722: invalid number] { errorNum: 1722, offset: 0 } ]
	// }
	return json(result)
}


// export default {oracleInit, selectBind}