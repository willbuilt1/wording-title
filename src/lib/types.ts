export interface ITimer {
  duration: number;
  timeLeft: number;
  status: "started" | "paused" | "stopped" | "finished";
}

export interface IGameState {
  timerLength: number;
  lives?: number;
  color?: string;
}
