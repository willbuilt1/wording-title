<script lang="ts">
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
  import Back from "$lib/icons/Back.svelte";
  import type { Snippet } from "svelte";
  let { children } = $props<{ children: Snippet }>();
</script>

<nav>
  <button onclick={() => history.back()}><Back size={"24"} /></button>
  <a class="logo" href="/">WT</a>
</nav>
<AnimatedRoute><main>{@render children()}</main></AnimatedRoute>

<style>
  nav {
    border-bottom: solid 1px var(--primary-color);
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .logo {
    font-size: var(--font-size-large);
    font-weight: 700;
    text-align: center;
    color: var(--primary-white);
  }
  button {
    background-color: transparent;
    border: none;
    color: var(--primary-white);
    font-size: 24px;
    justify-self: start;
  }
  main {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: var(--unit-xlarge);
    max-width: 480px;
    margin: 0 auto;
  }
</style>
