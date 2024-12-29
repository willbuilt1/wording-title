<script lang="ts">
  import GameStack from "$lib/components/GameStack.svelte";
  const cards = [
    {
      id: 1,
      word: "Soccer",
    },
    {
      id: 2,
      word: "Basketball",
    },
    {
      id: 3,
      word: "Baseball",
    },
    {
      id: 4,
      word: "American Football",
    },
    {
      id: 5,
      word: "Tennis",
    },
    {
      id: 6,
      word: "Golf",
    },
    {
      id: 7,
      word: "Rugby",
    },
    {
      id: 8,
      word: "Cricket",
    },
    {
      id: 9,
      word: "Ice Hockey",
    },
    {
      id: 10,
      word: "Field Hockey",
    },
  ];
  const color = "blue";
</script>

<GameStack {cards} {color} />
