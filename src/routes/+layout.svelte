<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children: Snippet } = $props();
  import '../reset.css'
  import '../app.css';
  import '$lib/styles/typography.css';
</script>




  {@render children()}






