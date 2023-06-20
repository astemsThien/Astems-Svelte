<script>
    import { setContext } from "svelte";
    
    import { writable } from "svelte/store";

    export let extraOptionActive;

		/* 
			I want to sync the value of the active prop and of the activeStore
			so when one of them changes the other one will change. 
			Like how 2-way binding.
		*/
    const extraOptionActiveStore = writable(extraOptionActive);
	  $: extraOptionActiveStore.set(extraOptionActive);
	  $: extraOptionActive = extraOptionActiveStore;		
	
    setContext("extraOptionActiveStore", extraOptionActiveStore);
</script>

<slot/>