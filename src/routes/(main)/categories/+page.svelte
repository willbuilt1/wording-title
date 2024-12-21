<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import type { PageData } from "./$types";
  import { getGameState } from "$lib/state/gameState.svelte";
  export let data: PageData;
  console.log(data);
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
          <div class="icon">
            {category.icon}
          </div>
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
    justify-content: flex-end;
    padding-bottom: var(--unit-xxlarge);
    align-items: center;
    color: var(--primary-black);
    cursor: pointer;
    height: 100%;
    position: relative;

    * {
      filter: grayscale();
    }

    &:hover .icon,
    &:focus .icon,
    &:active .icon {
      filter: grayscale();
      transform: scale(1.2);
      transition: all ease-in-out 0.3s;
    }
  }

  .icon {
    font-size: 70px;
    line-height: 1;
    filter: blur(3px) grayscale();
    transform: scale(1);
    transition: all ease-in-out 0.3s;
  }

  .name {
    text-transform: capitalize;
    font-family: var(--primary-font);
    font-size: var(--font-size-xlarge);
    font-weight: 700;
    justify-self: baseline;
  }
</style>
