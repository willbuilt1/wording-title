<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children: Snippet } = $props();
</script>

<body>
  {@render children()}
  <!-- <slot /> -->Hello
</body>

<style>
  body {
    font-family: "Arial", sans-serif;
    margin: 0;
    padding: 0;
  }
</style>
