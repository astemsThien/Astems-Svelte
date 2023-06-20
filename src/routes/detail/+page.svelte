<script>
	import ItemDetail from './ItemDetail.svelte'
import Navbar from './NavBar.svelte'


	let prevPage = '/order'
	

</script>

<div class="relative ">
	<div class="fixed w-full">
		<Navbar {prevPage} />
	</div>
	<ItemDetail />
</div>






