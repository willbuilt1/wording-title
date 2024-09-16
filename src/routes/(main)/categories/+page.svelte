<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import type { PageData } from "./$types";
  import { getGameState } from "$lib/state/gameState.svelte";
  export let data: PageData;

  const gameState = getGameState();

  const categoryColors = ["red", "gold", "green", "blue", "purple"];
  function getCategoryColor(index: number) {
    return categoryColors[index % categoryColors.length];
  }
</script>

<h2 class="subtitle">Choose your category</h2>
<div class="container">
  {#each data.categories as category, i}
    <a
      href={`/game/${category.name}`}
      onclick={() => gameState.setColor(getCategoryColor(i))}
    >
      <Card --color={getCategoryColor(i)}>
        <div class="cardContent">
          <div class="icon">{category.icon}</div>
          <div class="name">{category.name}</div>
        </div>
      </Card>
    </a>
  {/each}
</div>

<style>
  h2 {
    text-align: center;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--unit-xlarge);
    margin-top: var(--unit-large);
    flex: 1;

    a {
      aspect-ratio: 1 / 1;
    }
    :global(.card) {
      height: 100%;
    }
  }

  .cardContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-white);
    color: var(--primary-black);
    cursor: pointer;
    height: 100%;

    * {
      filter: grayscale();
    }

    &:hover *,
    &:focus *,
    &:active * {
      filter: none;
      transform: scale(1.2);
      transition: all ease-in-out 0.2s;
    }
  }

  .icon {
    font-size: var(--font-size-large);
  }

  .name {
    text-transform: capitalize;
    font-family: var(--primary-font);
    font-size: var(--font-size-large);
    font-weight: 700;
    justify-self: baseline;
  }
</style>
