import type { ITimer } from "$lib/types";
import { onDestroy } from "svelte";

class Timer {
  duration: number;
  interval: any;

  timerState = $state<ITimer>({
    duration: 0,
    timeLeft: 0,
    status: "stopped",
  });

  constructor(duration: number) {
    this.duration = duration;
    this.interval = null;
    this.timerState = {
      duration,
      timeLeft: duration,
      status: "stopped",
    };

    onDestroy(() => {
      clearInterval(this.interval);
    });
  }

  start() {
    this.timerState.status = "started";
    this.interval = setInterval(() => {
      if (this.timerState.timeLeft > 0) {
        this.timerState.timeLeft--;
        if (this.timerState.timeLeft === 0) {
          this.stop();
          this.timerState.status = "finished";
        }
      }
    }, 10);
  }

  pause() {
    clearInterval(this.interval);
    this.timerState.status = "paused";
  }

  stop() {
    clearInterval(this.interval);
    this.timerState.timeLeft = this.timerState.duration;
  }
}

export default Timer;
