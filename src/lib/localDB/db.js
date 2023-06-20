import Dexie from 'dexie';
const db = new Dexie('whDatabase');

db.version(1).stores({
	orderType: 'id++,type',
	selectedItem: 'id++, GOODS_CD, GOODS_NM, UPRICE, SALE_QTY, SALE_TOT, SALE_AMT, DC_AMT, STOCK_FG, SUB_MENU_CD, SUB_MENU_NM, PAR_GOODS_CD, PACK_YN, IMG_URL',
	cartList: 'id++, CNT, GOODS_CD, GOODS_NM, UPRICE, SALE_QTY, SALE_TOT, SALE_AMT, DC_AMT, STOCK_FG, SUB_MENU_CD, SUB_MENU_NM, PAR_GOODS_CD, PACK_YN, IMG_URL, SUB_MENU_PRICE_NM',
	// cartList: 'id++,name,price,qty,subOption,extraOption,imgUrl',
	// menuBarList: '++,name,menu',
	// mgoodstb: '++id,no,name,description,price,imgUrl,subOption,extraOption,new,menu',
	// testDB:'++id, msNm, chainNo, msNo, goodsCd, goodsNm, price',
	categoryList: '++id, GPLU_CD, GPLU_NM',
	itemList: 'id++, GPLU_CD, PLU_CD, GOODS_CD, GOODS_NM, UPRICE, IMG_PATH, IMG_FILE_NM, NEW_YN, HIT_YN, PACK_YN, SHOP_YN, DETAIL_YN',
	detailList: 'id++, GPLU_CD, PLU_CD, GOODS_CD, SEQ, SUB_GROUP_CD, SUB_GROUP_NM, SUB_FG, SUB_GROUP_QTY, SUB_GROUP_GUIDE, STOCK_FG, UPCHARGE_UPRICE'
});


export default db