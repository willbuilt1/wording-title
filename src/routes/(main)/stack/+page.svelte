<script lang="ts">
const array = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(array)

let cards = $state(array)
let currentCard =$state(1)
let correctStack: number[] = $state([])
let incorrectStack: number[] = $state([])
function onclick(correct: boolean) {
    function moveCard(correct: boolean) {
        const removedCard = cards.shift()
        correct ? correctStack.push(removedCard!) : incorrectStack.push(removedCard!)
        currentCard = cards[0]
    }
    if (!document.startViewTransition){
        moveCard(correct)
        return;
    }
    document.startViewTransition(()=> {
        moveCard(correct)
    })
    console.log( currentCard)
}

</script>


<div class="game">
    <div class="discard-pile">
        {#each incorrectStack as s}
            <div class="card stack" style:--transition-name={`card-${s}`}></div>
        {/each}
    </div>

    <div class="cards">
        {#each cards as card}
            <div class="card" style:--transition-name={`card-${card}`} style:translate= {`-${Math.random() * 3}px -${Math.random() * 1}px`} style:rotate={`${Math.random() * 5}deg`}></div>
        {/each}
    </div>
    

    <div class="discard-pile">
        {#each correctStack as s}
            <div class="card stack" style:--transition-name={`card-${s}`}></div>
        {/each}
    </div>
</div>
    
<button onclick= {()=>onclick(true)}>Correct!</button>
<button onclick = {()=> onclick(false)}>Incorrect!</button>


<style>
    .game {
        display: flex;
        gap: 40px
    }
    .cards {
       position: relative;
        width: 200px;
        height: 200px;
        border: solid 1px white;
    }
    .discard-pile {
        position: relative;
        width: 200px;
        height: 200px;
        border: solid 1px white;
    }
    .card {
        position: absolute;
        view-transition-name: var(--transition-name);
        inset: 10px;
        background-color: rgb(246, 202, 202);
        border-radius: 10px;
        box-shadow: -2px 3px 0px rgb(249 249 249 / 8%);
        
    }

    .stack {
        position: absolute;
        inset: 10px;
        background-color: red;
        view-transition-name: var(--transition-name);

    }
</style>