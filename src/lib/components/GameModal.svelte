<script lang="ts">
  import Timer from "$lib/state/timer.svelte";
  import type { TGameStatus } from "$lib/types";
  let { closeModal, startGame, modalType, score } = $props<{
    closeModal: () => void;
    startGame: () => void;
    modalType: TGameStatus;
    score: number;
  }>();
  const countdownTimer = new Timer(3);

  $effect(() => {
    if (countdownTimer.timerState.status === "finished") {
      //close modal after 1 second
      setTimeout(() => {
        closeModal();
        startGame();
      }, 1000);
    }
  });

  const modalTypes = {
    initial,
    paused,
    finished,
    running,
  };
</script>

{#snippet initial()}
  <div class="container" onclick={() => countdownTimer.start()}>
    <h2>Ready?</h2>
    {#if countdownTimer.timerState.status === "started"}
      <div class="countdown big">
        {countdownTimer.timerState.timeLeft}
      </div>
    {:else if countdownTimer.timerState.status === "finished"}
      <div class="countdown big">Go!</div>
    {:else}
      <div class="countdown">Tap to start</div>
    {/if}
  </div>
{/snippet}

{#snippet finished()}
  <div class="container">
    <h2>Game Over</h2>
    <p>You scored</p>
    <p>{score}</p>
    <button onclick={closeModal}>Close</button>
  </div>
{/snippet}

{#snippet paused()}
  <div class="container">
    <h2>Game Paused</h2>
    <button
      class="button"
      onclick={() => {
        closeModal();
        startGame();
      }}>Close</button
    >
  </div>
{/snippet}

{#snippet running()}{/snippet}

{@render modalTypes[modalType as keyof typeof modalTypes]()}

<style>
  .container {
    padding: var(--unit-large);
    width: 80vw;
    max-width: 100%;
    background-color: var(--primary-white);
    border-radius: var(--unit-medium);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--unit-large);
  }

  .countdown {
    font-size: 2rem;
    text-align: center;
    white-space: nowrap;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.big {
      font-size: var(--font-size-xxlarge);
    }
  }
</style>
