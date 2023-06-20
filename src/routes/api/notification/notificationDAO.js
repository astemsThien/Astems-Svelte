import oracledb from 'oracledb';
import { json } from '@sveltejs/kit';

export const getMemberKakaoDAO = async (connection, query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true}) => {
	return json(await connection.execute(query, binds, options))
}
export const getSequenceDAO = async (connection, query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true}) => {
	return json(await connection.execute(query, binds, options))
}

export const notificationSendDAO = async (connection, query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true}) => {
	return json(await connection.execute(query, binds, options))
}