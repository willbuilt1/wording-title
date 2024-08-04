export type TGameStatus = "initial" | "running" | "paused" | "finished";

export interface ITimer {
  duration: number;
  timeLeft: number;
  status: "started" | "paused" | "stopped" | "finished";
}

export interface IGameSettings {
  timerLength: number;
  lives?: number;
  color?: string;
}
