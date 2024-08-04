<script lang="ts">
  import Card from "$lib/components/Card.svelte";
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
  };
</script>

{#snippet initial()}
  <button class="containerButton" onclick={() => countdownTimer.start()}>
    <Card>
      <div class="container">
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
    </Card>
  </button>
{/snippet}

{#snippet finished()}
  <Card>
    <div class="container">
      <h2>Game Over</h2>
      <p>Your score: {score}</p>
      <button onclick={closeModal}>Close</button>
    </div>
  </Card>
{/snippet}

{#snippet paused()}
  <Card>
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
  </Card>
{/snippet}

{@render modalTypes[modalType as keyof typeof modalTypes]()}

<style>
  h2 {
    text-align: center;
  }
  .containerButton {
    background-color: transparent;
    border: none;
  }

  .container {
    padding: var(--unit-large);
    width: 80vw;
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
