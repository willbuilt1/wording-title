<script lang="ts">
  import { getGameState } from "$lib/state/gameState.svelte";
  import Card from "$lib/components/Card.svelte";

  const state = getGameState();
  const gameState = state.gameState;

  let lives = $derived(gameState.lives);
  let timerLength = $derived(gameState.timerLength);

  const livesOptions = [1, 2, 3, undefined];
  const timerLengthOptions = [30, 60, 90, 120];
</script>

<h2>Settings</h2>

<Card>
  <div class="cardContainer">
    <h3>Number of lives</h3>
    <div class="buttonContainer">
      {#each livesOptions as option}
        <button
          class="button {lives === option ? '' : 'grey'}"
          onclick={() => state.setLives(option)}
        >
          {#if option === undefined}
            <span class="infinity">∞</span>
          {:else}
            {"❤️".repeat(option)}
          {/if}
        </button>
      {/each}
    </div>
    <h3>Timer length</h3>
    <div class="buttonContainer">
      {#each timerLengthOptions as option}
        <button
          class="button {timerLength === option ? '' : 'grey'}"
          onclick={() => state.setTimerLength(option)}
        >
          {option}
        </button>
      {/each}
    </div>
  </div>
</Card>
<a class="button" href="/categories">Start Game</a>

<style>
  h2 {
    margin-bottom: var(--unit-large);
  }

  h3 {
    color: var(--primary-black);
    margin-bottom: var(--unit-small);
  }

  .cardContainer {
    padding: var(--unit-medium);
  }

  .buttonContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--unit-large);
  }

  .button {
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--primary-black);
  }

  a.button {
    margin-top: var(--unit-large);
    display: block;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  .infinity {
    font-size: 40px;
    line-height: 1;
  }
</style>
