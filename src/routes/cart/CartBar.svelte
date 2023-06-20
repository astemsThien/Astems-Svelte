<script>
	/**
	 * @type {string | number}
	 */
	export let prevPage;

	function goPrevPage() {
		console.log('go prevPage');
		location.href = prevPage;
	}

	function goCart() {
		location.href = '/cart';
	}

	function goHome() {
		location.href = '/main';
	}
</script>

<div class=" w-full bg-white  flex flex-nowrap justify-between items-center space-x-3 p-5">
	<!-- svelte-ignore missing-declaration -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="flex items-center" on:click={goPrevPage}>
		<div>
			<svg width="9" height="14" viewBox="0 0 9 14" fill="black" xmlns="http://www.w3.org/2000/svg">
				<path d="M8.36247 13.6125C8.47835 13.4969 8.57029 13.3595 8.63301 13.2083C8.69574 13.0571 8.72803 12.895 8.72803 12.7313C8.72803 12.5676 8.69574 12.4055 8.63301 12.2543C8.57029 12.103 8.47835 11.9657 8.36247 11.85L3.51247 7.00003L8.36247 2.15003C8.5962 1.91631 8.7275 1.59932 8.7275 1.26878C8.7275 0.938251 8.5962 0.621255 8.36247 0.387532C8.12875 0.15381 7.81176 0.0225085 7.48122 0.0225085C7.15069 0.0225085 6.8337 0.15381 6.59997 0.387532L0.862473 6.12503C0.746593 6.24068 0.654659 6.37804 0.591932 6.52925C0.529205 6.68047 0.496918 6.84257 0.496918 7.00628C0.496918 7.16999 0.529205 7.3321 0.591932 7.48331C0.654659 7.63453 0.746593 7.77189 0.862473 7.88753L6.59997 13.625C7.07497 14.1 7.87497 14.1 8.36247 13.6125Z" />
			</svg>
		</div>
		<div class="ml-2">
			<span class=" font-bold">카트</span>
		</div>
	</div>

	

	<div class="flex items-center space-x-3">
		<div class=" ">
			<svg
				class="feather feather-search"
				fill="none"
				height="24"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
				><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg
			>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class=""
			on:click={() => {
				goHome();
			}}
		>
			<svg
				class="feather feather-home"
				fill="none"
				height="24"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
				><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
					points="9 22 9 12 15 12 15 22"
				/></svg
			>
		</div>
	</div>
</div>
