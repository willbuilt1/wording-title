// game state to keep track
// lives
// timer length

import { browser } from "$app/environment";
import type { IGameState } from "$lib/types";
import { getContext, onMount, setContext } from "svelte";
import { get } from "svelte/store";

const getStateFromStorage = () => {
  if (browser) {
    const gameSettings = localStorage.getItem("gameSettings");
    let lives: number;
    let timerLength: number;

    if (gameSettings) {
      const parsedSettings = JSON.parse(gameSettings) as IGameState;
      lives = parsedSettings.lives || 3;
      timerLength = parsedSettings.timerLength || 60;
      return { lives, timerLength };
    }
  }
  return { lives: 3, timerLength: 60 };
};

export class gameState {
  gameState = $state<IGameState>(getStateFromStorage());

  constructor() {
    $effect(() => {
      localStorage.setItem("gameSettings", JSON.stringify(this.gameState));
    });
  }

  setLives(lives: number | undefined) {
    if (this.gameState) this.gameState.lives = lives;
  }

  setTimerLength(timerLength: number) {
    if (this.gameState) this.gameState.timerLength = timerLength;
  }
}

const GAME_STATE_KEY = Symbol("GAME");

export function setGameState() {
  return setContext(GAME_STATE_KEY, new gameState());
}

export function getGameState() {
  return getContext<ReturnType<typeof setGameState>>(GAME_STATE_KEY);
}
