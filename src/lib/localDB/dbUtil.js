import { browser } from '$app/environment';
import db from './db';
// import logger from '$lib/config/winstonConfig'

export async function clearDexie(getdb) {
    try {
        if(browser){
            await getdb.clear();     
        }
    } catch (e) {
        console.error(` ${e.name}: ${e.message}`)
    }
}

export async function setDexie(getdb, item) {
    try {
        if(browser){
            getdb.bulkAdd(item)
        }    
    } catch (e) {
        console.error(` ${e.name}: ${e.message}`)
    }
} 

export const getDexie =  async (getdb) => {
    try {
        if(browser){
            return await getdb.toArray()
        }
    } catch (e) {
        console.error(` ${e.name}: ${e.message}`)
    }
}


export const getTotPrice = async () => {
    let totPrice = 0
    if (browser) {			
        try{			
            const lineList = await db.cartList.toArray()								
            const itemList = []				
            const maxIndex = lineList.length-1				
            if(maxIndex == -1){
                totPrice = 0
                return 0
            }
            else{
                let subMenuCnt = lineList[0].CNT
                let subMenus = []
                let itemCnt = lineList[0].CNT
                let itemInfo =[]
                let keyCNT= 0								
                await lineList.forEach(async (e,i,a)=> {
                    if(i < maxIndex){						
                        let nextItem = a[i+1]				
                        if(e.CNT == subMenuCnt){				
                            if(e.CNT == itemCnt){
                                itemInfo.push(e)
                                itemCnt = nextItem.CNT						
                            }
                            subMenus.push(e.SUB_MENU_NM_PRICE)
                            keyCNT+=1									
                            if(nextItem.CNT != subMenuCnt){
                                itemList.push({...itemInfo,subMenus})					
                                subMenuCnt = nextItem.CNT
                                itemInfo = []
                                subMenus = []						
                            }								
                        }
                    }
                    else{
                        let prevItem = a[i-1] ? a[i-1] : 'no exist'
                        if(e.CNT != prevItem.CNT){								
                            itemInfo.push(e)								
                        }
                        subMenus.push(e.SUB_MENU_NM_PRICE)													
                        itemList.push({...itemInfo,subMenus})							
                        itemInfo = []
                        subMenus = []
                        keyCNT = 0										
                    }					
                })
                // console.log(JSON.stringify(itemList))								
                totPrice = itemList.reduce((a, c) => a + Number(c[0].SALE_AMT), 0)                                   
                return totPrice
            }				
        }
        catch(error){
            console.log(error)
        }
    }			
}