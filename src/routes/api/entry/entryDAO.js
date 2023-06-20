import oracledb from 'oracledb';
import { json } from '@sveltejs/kit';

export const entryDAO = async (connection, query, binds = [], options = {outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true}) => {
	return json(await connection.execute(query, binds, options))
}
