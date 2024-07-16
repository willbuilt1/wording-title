<script lang="ts">
  import type { Snippet } from "svelte";
  let { children } = $props<{ children: Snippet }>();
</script>

<nav><button onclick={() => history.back()}>{"<"}</button></nav>
<main>{@render children()}</main>

<style>
  nav {
    border-bottom: solid 1px var(--primary-white);
    padding: 16px;
  }
  button {
    background-color: transparent;
    border: none;
    color: var(--primary-white);
    font-size: 24px;
  }
  main {
    padding-left: 16px;
    padding-right: 16px;
  }
</style>
