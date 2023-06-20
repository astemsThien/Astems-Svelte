<script>
    import { page } from '$app/stores'
    import { onMount } from "svelte"

    // 쿼리스트링
    // console.log('svelte:', $page.url.searchParams.get('mn'));

    // post js 거치고 올 때 이런식으로 받음
    // /** @type {import('./$types').ActionData} */
    // export let form;
    // console.log('form', form);

    // param: { saleDate: '20221219', msNo: 'NC1932', billNo: '0091', posNo: '99' },
    //     globalObject: {
    //     msNo: 'NC1932',
    //     chainNo: 'C374',
    //     posNo: '99',
    //     chainArea: '000',
    //     packYn: 'Y',
    //     url: 'https://127.0.0.1:7777'
    // }



    /** @type {import('./$types').PageData} */
    export let data;
    // console.log('data', data);
    
    onMount(() => {

        const sendPost = (url, method, params) => {
            const form = document.createElement('form')
            form.setAttribute('method', method)
            form.setAttribute('action', url)
            // form.setAttribute('onsubmit', 'return false')
            // document.characterSet = "utf-8"
            for(let key in params){
                var hiddenField = document.createElement('input')
                hiddenField.setAttribute('type', 'hidden')
                hiddenField.setAttribute('name', key)
                hiddenField.setAttribute('value', params[key])
                console.log(hiddenField.value);
                form.appendChild(hiddenField)
            }
            document.body.appendChild(form)
            form.submit()
        }
        // https://127.0.0.1:7777/qrtest?sd=20221223&mn=NC1932&bn=0006&pn=99
        if(data.object.sd != 'null' && data.object.mn != 'null' && data.object.bn != 'null' && data.object.pn != 'null'){
            sendPost(data.redirect, data.method, data.object)
        }
    })
</script>
