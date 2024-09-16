<script lang="ts">
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";
  import type { Snippet } from "svelte";
  let { children } = $props<{ children: Snippet }>();
</script>

{#key $page.url}
  <div class="fadeIn">
    {@render children()}
  </div>
{/key}
