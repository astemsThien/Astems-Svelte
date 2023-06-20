<script>
    export let prevPage
</script>

<div class="w-full flex flex-nowrap justify-between p-5">
    <a href={prevPage} >
        <svg
            class="feather feather-arrow-left"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            ><line x1="19" x2="5" y1="12" y2="12" /><polyline points="12 19 5 12 12 5" /></svg
        >
    </a>
    <div class=" font-bold">
        TEST SAMPLE
    </div>
    <a href="/main">
        <svg
            class="feather feather-x"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            ><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg
        >
    </a>
</div>
