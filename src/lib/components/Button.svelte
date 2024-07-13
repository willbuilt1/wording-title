<script lang="ts">
    import type{ Snippet } from "svelte";
    let { children }:{children : Snippet} = $props();
</script>

<button>
{@render children()}
</button>

<style>
    button{
        background-color: var(--primary-color);
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        color: var(--primary-white);
        font-weight: 700;
        font-size: 24px;
    }
</style>