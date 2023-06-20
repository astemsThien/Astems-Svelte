import { globalVarible } from '$lib/util/store'
import { get } from 'svelte/store'
import { getDate8, getDate14, getSymbolKey } from '$lib/util/util'
import { page } from '$app/stores'
import { goto } from '$app/navigation';
import { json, error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const formData = await request.formData()
        
        console.log('formData', getSymbolKey(formData, 'state'));
        // console.log('formData', formData);
        return { globalObject: get(globalVarible) }
    }
}

