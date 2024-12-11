

<script>
    // this variable will be important if deploying to a non-root url,
    // such as with github pages when you don't have a custom domain;
    // defined in `svelte.config.js`
	import { base } from '$app/paths';
    const nav_items = ["home", "about"] ;
</script>

<div id="navbar"> 

    {#each nav_items as item}
        <a href="{base}/{item === "home" ? '' : item}">{item}</a>
    {/each}

</div>

<slot/>

<style>
    #navbar {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }
</style>
