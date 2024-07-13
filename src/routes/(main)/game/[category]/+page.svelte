<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data);
</script>

<Card --color={data.colour}>
  <div class="cardContent">Word</div>
</Card>

<style>
  .cardContent {
    color: var(--primary-black);
  }
</style>
