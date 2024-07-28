<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import type { PageData } from "./$types";
  import Timer from "$lib/state/timer.svelte";
  import Pause from "$lib/icons/Pause.svelte";
  import Play from "$lib/icons/Play.svelte";
  import { getGameState } from "$lib/state/gameState.svelte";
  import Check from "$lib/icons/Check.svelte";
  import Skip from "$lib/icons/Skip.svelte";

  let { data } = $props<{ data: PageData }>();

  const gameState = getGameState();
  const { lives, timerLength, color } = gameState.gameState;

  // timer logic
  const timer = new Timer(timerLength);
  const timerState = timer.timerState;

  function startTimer() {
    timer.start();
  }

  function pauseTimer() {
    timer.pause();
  }

  // game logic
  const words = $state(data.words);
  let word = $state(getRandomWord());
  let score = $state(0);
  let numberOfLives = $state(lives ?? 3);

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function handleAnswer() {
    words.splice(words.indexOf(word), 1);
    word = getRandomWord();
  }

  function handleCorrect() {
    score += 1;
    handleAnswer();
  }

  function handleWrong() {
    numberOfLives -= 1;
    handleAnswer();
  }

  const disabled = $derived(timerState.status !== "started" || lives === 0);

  function gameOver() {
    if (lives === 0 || words.length === 0 || timerState.status === "finished") {
      return true;
    }
  }
</script>

<section>
  <div class="score">{score}</div>
  <div class="time">{timerState.timeLeft}<span>seconds</span></div>
  <div class="lives">
    {#each Array.from({ length: numberOfLives }, (_, i) => i) as _}
      <span>❤️</span>
    {/each}
  </div>
</section>
<Card --color={color}>
  <div class="cardContent">{word ?? ""}</div>
</Card>
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

<style>
  section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-top: var(--unit-large);
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
  .cardContent {
    text-transform: capitalize;
    font-size: var(--font-size-large);
    color: var(--primary-black);
    text-align: center;
    padding-top: var(--unit-xxxlarge);
    padding-bottom: var(--unit-xxxlarge);
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
    margin-top: var(--unit-xxlarge);
    text-align: center;

    &:has(button:disabled) {
      color: grey;
    }
  }

  .gameButton {
    color: var(--primary-white);
    background-color: grey;
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
