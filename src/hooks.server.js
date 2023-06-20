import { sequence } from '@sveltejs/kit/hooks'
import logger from '$lib/config/winstonConfig'
import {getSymbolKey, getDate8} from '$lib/util/util'
import { error } from '@sveltejs/kit';


export const getSession = (event) => {
    return {
        user: {
            id: 'yunkukPark',
            name: 'yunkukPark',
            access: 'admin'
        }
    };
};

import { goto } from '$app/navigation'
import { onMount } from "svelte"
/** @type {import('@sveltejs/kit').Handle} */
async function first({ event, resolve }) {
    if(event.url.pathname.startsWith('/api/entry')){
    }

    // console.log(
    //     new Date(requestStartTime).toISOString(),
    //     event.request.method,
    //     event.url.pathname,
    //     `(${Date.now() - requestStartTime}ms)`,
    //     response.status
    // );
    // if(`${event.url.pathname}` === '/api/entry'){
    //     onMount(() => {
    //         goto("/main")
    //     })
    // }
    // if(`${event.route.id}` === '/api/entry'){
    //     console.log("route");
    //     onMount(() => {
    //         goto("/main")
    //     })
    // }

    // qr생성 get으로 접속 시 404
    if(getSymbolKey(event.request, 'state').method == 'GET' && event.url.pathname.startsWith('/qrtest2')){
        throw error(401, 'unauthorized');
    }
    
    // 오늘 자 매출이 아니면 
    if(getSymbolKey(event.request, 'state').url.searchParams.get('sd') != getDate8() 
        && event.url.pathname.startsWith('/qrtest') 
        && getSymbolKey(event.request, 'state').method == 'GET'){
        throw error(401, 'unauthorized');
    }
    
    
    
    logger.info(`[url] ${event.url.pathname}`)

    const result = await resolve(event, {
        transformPageChunk: ({ html }) => {
            // transforms are applied in reverse order
            return html;
        }
    });
    return result;
}

/** @type {import('@sveltejs/kit').Handle} */
async function second({ event, resolve }) {
    console.log('second pre-processing');
    const result = await resolve(event, {
        transformPageChunk: ({ html }) => {
            console.log('second transform');
            return html;
        }
    });
    console.log('second post-processing');
    return result;
}

export const handle = sequence(first);