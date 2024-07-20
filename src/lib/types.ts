export interface ITimer {
  duration: number;
  timeLeft: number;
  status: "started" | "paused" | "stopped" | "finished";
}
