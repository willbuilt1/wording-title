<script lang="ts">
  import { getGameState } from "$lib/state/gameState.svelte";

  const state = getGameState();
  const gameState = state.gameState;

  function handleSubmit(event: {
    currentTarget: HTMLFormElement & EventTarget;
  }) {
    // event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("fired");

    const lives = event.currentTarget.lives.value;
    const timerLength = event.currentTarget.timerLength.value;
    console.log({ lives, timerLength });

    state.setLives(lives);
    state.setTimerLength(timerLength);
  }
</script>

<h1>Settings</h1>

<div>number of lives: {gameState.lives ? gameState.lives : "♾️"}</div>
<div>Timer length: {gameState.timerLength ? gameState.timerLength : "♾️"}</div>

<form on:submit|preventDefault={handleSubmit}>
  <label for="lives">Number of lives</label>
  <input type="number" id="lives" name="lives" min="1" max="10" />

  <label for="timerLength">Timer length</label>
  <input type="number" id="timerLength" name="timerLength" min="1" max="60" />

  <button type="submit">Save</button>
</form>
