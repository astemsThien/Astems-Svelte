import { globalVarible } from '$lib/util/store'
import { get } from 'svelte/store'
import {getDate8, getDate14, getSymbolKey} from '$lib/util/util'
import { page } from '$app/stores'
import { json, error } from '@sveltejs/kit';

/** @type {import('./$types').Load} */
export const load = async ({ params, url }) => {
    const object = {}
    
    url.searchParams.forEach((value, key) =>object[key] = value)
    if(object.sd != 'null' && object.mn != 'null' && object.bn != 'null' && object.pn != 'null'){
        return {
            object,
            redirect:'/qrtest2',
            method:'POST'
        }
    }

    throw error(404, 'Not found');
}