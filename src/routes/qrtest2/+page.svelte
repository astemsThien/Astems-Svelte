<script>
    import QRCode from "$lib/util/QRJS.svelte"

    /** @type {import('./$types').ActionData} */
    export let form;
    // console.log('form', form);
</script>

<center>
    <strong>QR Render</strong>
    <QRCode codeValue='/api/qrRender' value = '{form}' squareSize=200/>
</center>