// game state to keep track
// lives
// timer length

import { browser } from "$app/environment";
import type { IGameSettings } from "$lib/types";
import { getContext, setContext } from "svelte";

const getStateFromStorage = () => {
  if (browser) {
    const gameSettings = localStorage.getItem("gameSettings");
    let lives: number;
    let timerLength: number;
    let color: string | undefined;

    if (gameSettings) {
      const parsedSettings = JSON.parse(gameSettings) as IGameSettings;
      lives = parsedSettings.lives || 3;
      timerLength = parsedSettings.timerLength || 60;
      color = parsedSettings.color || undefined;
      return { lives, timerLength, color };
    }
  }
  return { lives: 3, timerLength: 60 };
};

export class gameState {
  gameState = $state<IGameSettings>(getStateFromStorage());

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

  setColor(color: string) {
    if (this.gameState) this.gameState.color = color;
  }
}

const GAME_STATE_KEY = Symbol("GAME");

export function setGameState() {
  return setContext(GAME_STATE_KEY, new gameState());
}

export function getGameState() {
  return getContext<ReturnType<typeof setGameState>>(GAME_STATE_KEY);
}
