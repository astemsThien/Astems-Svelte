
export const getParams = () => {
    let params = '?'
    let length = arguments.length - 1
    for (let key in arguments) {
        let arg = arguments[key]
        for (let obj in arg) {
            params += obj + '=' + arg[obj] + '&'
        }
        if(length == key){
            params = params.substring(0, params.length - 1)
        }
    }
    console.log("params", params);

    return params
}

export const getDate = () => {
    const today = new Date();
    const year = today.getFullYear() // 년도

    const month = ('00' + (today.getMonth() + 1)).slice(-2) // 월
    // if(month.length === 1)  month = "0" + (today.getMonth() + 1)
    // else                    month = today.getMonth() + 1
    const date = ('00' + today.getDate()).slice(-2)  // 날짜
    const day = today.getDay()  // 요일
    const hours = ('00' + today.getHours()).slice(-2)      // 시
    const minutes = ('00' + today.getMinutes()).slice(-2)  // 분
    const seconds = ('00' + today.getSeconds()).slice(-2)  // 초

    return {
        year,
        month,
        date,
        day,
        hours,
        minutes,
        seconds
    }
}
export const getDate8 = () => {
    return getDate().year + "" + getDate().month + "" + getDate().date
}
export const getDate14 = () => {
    return getDate().year + "" + getDate().month + "" + getDate().date + "" + getDate().hours + "" + getDate().minutes + "" + getDate().seconds
}

export const getSymbolKey = (symbol, getKey) => {
    return symbol[Reflect.ownKeys(symbol).find(key => key.toString() === 'Symbol(' + getKey + ')')]
}


/*
    쿼리스트링 생성
*/
export const buildUrl = (path, params) => {
    const query = { ...params };
    let interpolatedPath = path;
    for (const [param, value] of Object.entries(params)) {
        const replaced = interpolatedPath.replace(`[${param}]`, value);
        if (replaced !== interpolatedPath) {
            interpolatedPath = replaced;
            delete query[param];
        }
    }
    const search = new URLSearchParams(query).toString();
    return `${interpolatedPath}${search ? `?${search}` : ""}`;
}

import { onMount } from "svelte"
import { IdleSessionTimeout } from "idle-session-timeout";
import { sessionStore } from '$lib/util/store'
// import {clearMgoostb} from '$lib/localDB/dbUtil'
import { goto } from '$app/navigation';
export const sessionCheck = async () => {
    const session = new IdleSessionTimeout(1000 * 5)
    // let session = new IdleSessionTimeout(1000 * 60 * 10)
    session.onTimeOut = () => {
        console.log('timeOut')
        // session.reset()
        // session.
        // clearMgoostb()
    }

    session.onTimeLeftChange = (timeLeft) => {
        console.log(`${timeLeft} ms left`)
    }

    onMount(() => {

        // store
        sessionStore.subscribe(value => {
            if (!value) {
                sessionStore.set(true)
                session.start()
            }
        })
    })
}