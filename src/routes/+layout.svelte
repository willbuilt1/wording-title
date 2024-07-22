<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children: Snippet } = $props();
  import "../reset.css";
  import "../app.css";
  import "$lib/styles/typography.css";
  import "$lib/styles/components.css";
  import { setGameState } from "$lib/state/gameState.svelte";

  setGameState();
</script>

{@render children()}
