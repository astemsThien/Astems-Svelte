<script>
	import { page } from '$app/stores';
	import ErrorScreen from '../components/screens/ErrorScreen.svelte'; // your own Error screen component
	import NotFoundScreen from '../components/screens/NotFoundScreen.svelte'; // your own 404 screen component

	let status = $page.status

	let message = $page.error.message
</script>
  
{#if status == 404} <!-- Used '==' instead of '===' to match string/number status code (just to be sure) -->
	<NotFoundScreen />
{:else}		
	<ErrorScreen {message} {status} />
{/if}