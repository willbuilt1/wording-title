<script lang="ts">
  import Card from "./Card.svelte";

  let { cards, color, answerCorrect } = $props<{
    cards: { id: number; word: string }[];
    color?: string;
    answerCorrect?: boolean;
  }>();

  let cardStack = $state(cards);
  let correctStack: { id: number; word: string }[] = $state([]);
  let incorrectStack: { id: number; word: string }[] = $state([]);

  $effect(() => {
    console.log(answerCorrect);
    function moveCard(correct: boolean) {
      const removedCard = cardStack.pop();
      correct
        ? correctStack.push(removedCard!)
        : incorrectStack.push(removedCard!);
    }
    if (!document.startViewTransition) {
      if (answerCorrect !== undefined) moveCard(answerCorrect);
      return;
    }
    document.startViewTransition(() => {
      if (answerCorrect !== undefined) moveCard(answerCorrect);
    });
  });
</script>

<div class="game">
  {#each incorrectStack as s}
    <div class="card left" style:--transition-name={`card-${s.id}`}></div>
  {/each}

  {#each cardStack as card}
    <div class="card" style:--transition-name={`card-${card.id}`}>
      <Card --color={color}>
        <div class="cardContent">{card.word ?? ""}</div>
      </Card>
    </div>
  {/each}

  {#each correctStack as s}
    <div class="card right" style:--transition-name={`card-${s.id}`}></div>
  {/each}
</div>

<style>
  .game {
    position: relative;
    height: 100%;
    width: 80%;
  }

  .card {
    position: absolute;
    view-transition-name: var(--transition-name);
    top: 0px;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }

  .left {
    left: 0;
    opacity: 0;
    view-transition-name: var(--transition-name);
  }
  .right {
    left: 100%;
    opacity: 0;
    view-transition-name: var(--transition-name);
  }
  .cardContent {
    text-transform: capitalize;
    font-size: var(--font-size-large);
    color: var(--primary-black);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-weight: 700;
  }
</style>
