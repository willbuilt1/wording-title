<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import type { PageData } from "./$types";
  import Timer from "$lib/utils/timer.svelte";
  import Pause from "$lib/icons/Pause.svelte";
  import Play from "$lib/icons/Play.svelte";

  let { data } = $props<{ data: PageData }>();

  // timer logic
  const timer = new Timer(60);
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
  let lives = $state(3);

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
    lives -= 1;
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
  {#if timerState.status !== "started"}
    <button class="timerButton" onclick={startTimer}>
      <Play />
    </button>
  {:else}
    <button class="timerButton" onclick={pauseTimer}>
      <Pause />
    </button>
  {/if}
  <div class="displayText">{timerState.timeLeft}</div>
  <div class="lives">
    {#each Array.from({ length: lives }, (_, i) => i) as _}
      <span>❤️</span>
    {/each}
  </div>
</section>
<div class="score displayText">{score}</div>
<Card --color={data.colour}>
  <div class="cardContent">{word ?? ""}</div>
</Card>
<div class="buttonContainer">
  <button class="button" onclick={handleWrong} {disabled}>Wrong</button>
  <button class="button" onclick={handleCorrect} {disabled}>Correct</button>
</div>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-top: var(--unit-large);
    padding-bottom: var(--unit-xxlarge);
    align-items: center;

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
    padding-bottom: var(--unit-xxlarge);
  }

  .displayText {
    font-size: var(--font-size-xlarge);
    font-weight: 700;
    text-align: center;
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    gap: var(--unit-large);
    margin-top: var(--unit-xxlarge);
  }

  button {
    color: var(--primary-black);
  }

  .timerButton {
    background-color: transparent;
    width: fit-content;
    border: none;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lives {
    span {
      font-size: var(--font-size-xlarge);
    }
  }
</style>
