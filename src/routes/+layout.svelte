<script lang="ts">
  // import type { Snippet } from "svelte";
  // let { children }: { children: Snippet } = $props();
  import "../reset.css";
  import "../app.css";
  import "$lib/styles/typography.css";
  import "$lib/styles/components.css";
  import "$lib/styles/animations.css";
  import { setGameState } from "$lib/state/gameState.svelte";
  import { invalidate } from "$app/navigation";

  let { data, children } = $props();
  let { session, supabase } = $derived(data);

  $effect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
  setGameState();
</script>

{@render children()}
