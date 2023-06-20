import oracledb from 'oracledb';
import { json } from '@sveltejs/kit';

export const maxBillNo = async (connection, query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true}) => {
	return json(await connection.execute(query, binds, options))
}

export const qrHeader = async (connection, query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true}) => {
	return json(await connection.execute(query, binds, options))
}

export const qrDetail = async (connection, query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true, batchErrors: true}) => {
	return json(await connection.executeMany(query, binds, options))
}


// export default {oracleInit, selectBind}