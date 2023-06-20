<script>
import { onMount } from "svelte"
import {clearDexie, setDexie} from "$lib/localDB/dbUtil"
import axios from 'axios'
import { goto } from '$app/navigation';
import db from "$lib/localDB/db"

const getItems = async () => {
    const response = await axios.post(`/api/entry`, {
    })

    if(response.status === 200){
        return response
    }else{
        goto("/search")
    }
}

const getTest = async (query) => {
    const response = await axios.get(`/api/entry`, {
        params:{
            // getObject,
            query
        }
    })
    
    if(response.status === 200){
        return response
    }else{
        goto("/search")
    }
}

onMount(() => {

    const execute = async() => {
        try {
            const response = await getItems()

            clearDexie(db.categoryList)
            clearDexie(db.itemList)
            clearDexie(db.detailList)
            clearDexie(db.cartList)

            setDexie(db.categoryList, JSON.parse(response.data.categoryList.body.source).rows)
            setDexie(db.itemList, JSON.parse(response.data.itemList.body.source).rows)
            setDexie(db.detailList, JSON.parse(response.data.detailList.body.source).rows)

        } catch(e){
            // console.error(e)
        } finally {
            goto("/main")
        }
    }

    execute()
})

</script>




