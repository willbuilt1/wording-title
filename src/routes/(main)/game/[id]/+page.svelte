<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import type { PageData } from "./$types";
  import Timer from "$lib/state/timer.svelte";
  import Pause from "$lib/icons/Pause.svelte";
  import Play from "$lib/icons/Play.svelte";
  import { getGameState } from "$lib/state/gameState.svelte";
  import Check from "$lib/icons/Check.svelte";
  import Skip from "$lib/icons/Skip.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import GameModal from "$lib/components/GameModal.svelte";
  import type { TGameStatus } from "$lib/types";
  import GameStack from "$lib/components/GameStack.svelte";
  import { shuffleArray } from "$lib/helpers/helpers";

  let { data } = $props<{ data: PageData }>();
  let showModal = $state(true);
  let gameStatus: TGameStatus = $state("initial");

  const gameSettings = getGameState();
  const { lives, timerLength, color } = gameSettings.gameState;

  // timer logic
  const timer = new Timer(timerLength);
  const timerState = timer.timerState;
  $effect(() => {
    gameOver();
  });
  function startTimer() {
    timer.start();
    gameStatus = "running";
    showModal = false;
  }

  function pauseTimer() {
    gameStatus = "paused";
    showModal = true;
    timer.pause();
  }

  // game logic
  // TODO: refactor to use a store
  const words = $state(shuffleArray(data.words));
  let score = $state(0);
  let numberOfLives = $state(lives);
  let answerCorrect = $state<boolean>();
  let answerCount = $state(0);

  function handleAnswer(correct: boolean) {
    gameOver();
    answerCount += 1;
    answerCorrect = correct;
  }

  function handleCorrect() {
    score += 1;
    handleAnswer(true);
  }

  function handleWrong() {
    if (numberOfLives) numberOfLives -= 1;
    gameOver();
    handleAnswer(false);
  }

  const disabled = $derived(timerState.status !== "started" || lives === 0);

  function gameOver() {
    if (lives === 0 || words.length === 0 || timerState.status === "finished") {
      gameStatus = "finished";
      showModal = true;
    }
  }
</script>

<section>
  <div class="score">{score}</div>
  <div class="time">{timerState.timeLeft}<span>seconds</span></div>
  {#if numberOfLives}
    <div class="lives">
      {#each Array.from({ length: numberOfLives }, (_, i) => i) as _}
        <span>❤️</span>
      {/each}
    </div>
  {/if}
</section>
<h3>{data.category}</h3>
<div class="cardContainer">
  <GameStack
    cards={words}
    {color}
    answerCorrect={{ id: answerCount, correct: answerCorrect }}
  />
</div>
<div class="buttonContainer">
  <div>
    <button class="gameButton" onclick={handleWrong} {disabled}><Skip /></button
    >
    <div>Skip</div>
  </div>
  {#if timerState.status !== "started"}
    <button class="gameButton large" onclick={startTimer}>
      <Play />
    </button>
  {:else}
    <button class="gameButton large" onclick={pauseTimer}>
      <Pause />
    </button>
  {/if}
  <div>
    <button class="gameButton" onclick={handleCorrect} {disabled}
      ><Check /></button
    >
    <div>Got it</div>
  </div>
</div>
<Modal bind:showModal>
  <GameModal
    modalType={gameStatus}
    closeModal={() => (showModal = false)}
    startGame={startTimer}
    {score}
  />
</Modal>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-bottom: var(--unit-xxlarge);
    align-items: center;
    line-height: 1;

    div:nth-child(1) {
      text-align: left;
    }
    div:nth-child(3) {
      text-align: right;
    }
  }
  h3 {
    text-align: center;
    font-size: var(--font-size-large);
    font-weight: 700;
    text-transform: uppercase;
    padding-bottom: var(--unit-large);
    margin-top: var(--unit-large);
  }
  .cardContainer {
    max-width: 80vw;
    height: 200px;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .score {
    font-size: var(--font-size-xlarge);
    font-weight: 700;
  }

  .time {
    font-size: var(--font-size-xxxlarge);
    font-weight: 700;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: var(--font-size-small);
      text-transform: uppercase;
    }
  }

  .buttonContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--unit-large);
    margin-top: var(--unit-xxxlarge);
    text-align: center;

    &:has(button:disabled) {
      color: var(--primary-grey);
    }
  }

  .gameButton {
    color: var(--primary-white);
    background-color: var(--primary-grey);
    border: none;
    border-radius: var(--unit-small);
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--unit-medium);
    display: flex;
    flex-direction: column;

    &:disabled {
      background-color: rgb(47, 46, 46);
    }

    &.large {
      width: 100px;
      height: 100px;
      /* border-radius: 50%; */
      padding: var(--unit-large);
    }
  }

  .lives {
    span {
      font-size: var(--font-size-large);
    }
  }
</style>
