<script>    
    import { getContext } from 'svelte';   
    import { slide } from "svelte/transition";
    
    export let id;
    export let title;    
    export let option = "";

    let isHovered = false;
    let isFocused = false;
    let isActive = false

    const active = getContext("context");

    $: isCurrentActive = $active === id;
    $: isActive = isCurrentActive==true? !isActive : isActive
    const onClickHandler = () => {
        if (isCurrentActive) {            
            $active = null;
        } 
        else {            
            $active = id;
        }
    }
</script>


<div 
class="
    border-gray-100 
    border-2 
    rounded-sm
">

    <button 
    on:click={onClickHandler}
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
    on:focus={() => isFocused = true}
    on:blur={() => isFocused = false}
    class="flex text-left w-full focus:outline-none items-center p-4">
        <div class="w-full">
            <div class="
                font-bold 
                text-sm 
                mb-1 
                transition 
                text-gray-700 
            "
            class:text-blue-400={isHovered || isFocused}>
                <span class="
                    border-b-2 
                    inline-block 
                    border-transparent
                    transition
                "
                class:border-opacity-50={isFocused}
                class:border-blue-300={isFocused}>
                    {title}  
                </span>
                <span class=" text-astems-purple text-xs">
                    {option}
                </span>    
            </div>             
        </div>

        <div class="
            w-8
            transform 
            transition
            text-gray-300 
        "
        class:rotate-180={isCurrentActive}
        class:text-blue-400={isHovered || isFocused}>
            
        </div>
    </button>

    {#if isActive}
        <div class="px-4 pb-4 mt-4 bg-gray-100"
        transition:slide>
            <slot/>
        </div>
    {/if}
</div>