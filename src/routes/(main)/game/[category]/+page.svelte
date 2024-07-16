<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import type { PageData } from "./$types";

  let { data } = $props<{ data: PageData }>();

  const words = $state(data.words);
  let word = $state(getRandomWord());
  let score = $state(0);

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
</script>

<section>
  <div>II</div>
  <div>1:00</div>
  <div>❤️❤️❤️</div>
</section>
<div class="score">{score}</div>
<Card --color={data.colour}>
  <div class="cardContent">{word ?? ""}</div>
</Card>
<div class="buttonContainer">
  <button class="button" onclick={() => handleAnswer()}>Wrong</button>
  <button class="button" onclick={() => handleCorrect()}>Correct</button>
</div>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-top: var(--unit-large);
    padding-bottom: var(--unit-xxlarge);

    div {
      text-align: center;
    }

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
    font-size: var(--font-size-large);
    font-weight: 700;
    font-size: var(--font-size-xlarge);
    text-align: center;
    /* padding-top: var(--unit-xxlarge); */
    padding-bottom: var(--unit-xxlarge);
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
</style>
