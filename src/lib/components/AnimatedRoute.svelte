<script lang="ts">
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";
  import type { Snippet } from "svelte";
  let { children } = $props<{ children: Snippet }>();
</script>

{#key $page.url}
  {#if $page.url.pathname == "/create"}
    {@render children()}
  {:else}
    <div class="fadeIn">
      {@render children()}
    </div>
  {/if}
{/key}
