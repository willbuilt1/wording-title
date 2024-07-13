<script lang="ts">
    import type { Snippet } from "svelte";
    let { children }: { children: Snippet } = $props();
</script>
  
  
  
<nav>Navbar</nav>
<main>{@render children()}</main>

<style>
    nav{
        border-bottom: solid 1px var(--primary-white);
        padding: 8px 16px;
    }
    main{
        padding-left: 16px;
        padding-right: 16px;
    }
</style>