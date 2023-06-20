import { writable, readable } from 'svelte/store';

export const dbInit = writable(false)
export const sessionStore = writable(false)
export const searchDBCheck = writable(false)

export const globalVarible = writable({})

export const reservation = writable({})