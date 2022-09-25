<script lang="ts">
  import Clock from "./Clock.svelte";
  import SwitchButton from "./SwitchButton.svelte";
  import { ClockState } from "./ClockState";
  import ToggleButton from "./ToggleButton.svelte";
  import { onMount } from "svelte";
  import TimeList from "./TimeList.svelte";

  // Current Clock
  let currentState: ClockState = ClockState.countdown;

  // Countdown
  let isCountingDown: boolean = false;
  $: {
    if (isCountingDown) startCountDown();
    else stopCountDown();
  }
  let countdownStartTime: number;
  let countdownInterval: NodeJS.Timer;
  export let msecondLeft: number = 0; //In second
  // Time
  let msecondSinceMorning: number;
  // Timer
  let isCountingUp: boolean = false;
  $: {
    if (isCountingUp) startTimer();
    else stopTimer();
  }
  let msecondPassed: number = 0;
  let timerStartTime: number;
  let timerInterval: NodeJS.Timer;

  // (TODO: Refactor [countdown, time, timer] into classes)
  // Countdown function
  function startCountDown() {
    countdownStartTime = Date.now() + msecondLeft;
    countdownInterval = setInterval(() => {
      msecondLeft = countdownStartTime - Date.now();
      //Detect if secondLeft meet 0 after countDown()
      if (msecondLeft <= 0) {
        alertTimeUp();
        isCountingDown = false;
        msecondLeft = 0;
      }
    });
  }
  function stopCountDown() {
    clearInterval(countdownInterval);
  }
  function alertTimeUp() {
    if (Notification.permission !== "granted") {
      alert("Time Up");
      Notification.requestPermission();
    } else {
      var notification = new Notification("Times Up!", {
        icon: "favicon.png",
        body: "倒计时已结束",
      });
      notification.onclick = function () {
        // Do something on user click the notification
      };
    }
  }
  // Timer
  function startTimer() {
    timerStartTime = Date.now() - msecondPassed; // Record the time of pressing start, and store [secondPassed] into it
    timerInterval = setInterval(() => {
      msecondPassed = Date.now() - timerStartTime;
    });
  }
  function stopTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    timerStartTime = Date.now();
    msecondPassed = 0;
    clearTimes();
  }
  let recordTime: (millisecond: number) => void;
  let clearTimes: () => void;
  //
  setInterval(() => {
    const date = new Date();
    const timeZoneOffsetSecond = date.getTimezoneOffset() * 60000;
    msecondSinceMorning = (date.getTime() - timeZoneOffsetSecond) % 86400000; // Fun fact: 1day = 86400000ms
  });
  // Utools
  function clockText2Second(text: string): number {
    // example: "00:02:15" -> 135(seconds)
    let numbers: number[] = text.match(/\d+/g)?.map(Number)!; // Get hour, minute, second in a number[]

    switch (numbers.length) {
      case 1:
        return numbers[0];
      case 2:
        return time2Second(numbers[1], numbers[0]);
      case 3:
        return time2Second(numbers[2], numbers[1], numbers[0]);
      default:
        return -1;
    }
  }
  // Example: "3m1m2s" -> 180s+60s+2s -> 242s
  function letterText2Second(text: string): number {
    // Separate all numbers in days, hours, minutes, second. Example: "3m1m4s" -> minutes = [3, 1]; seconds = [4]
    let days: number[] = text.match(/[0-9]+(?=d)/g)?.map(Number) ?? []; // Set to [](empty array) if [text.match()] is undefined
    let hours: number[] = text.match(/[0-9]+(?=h)/g)?.map(Number) ?? [];
    let minutes: number[] = text.match(/[0-9]+(?=m)/g)?.map(Number) ?? [];
    let seconds: number[] = text.match(/[0-9]+(?=s)/g)?.map(Number) ?? [];
    // Sum up all the numbers in arrays
    let day = sum(days);
    let hour = sum(hours);
    let minute = sum(minutes);
    let second = sum(seconds);
    // get the result in second
    let result = time2Second(second, minute, hour, day);
    return result;
  }

  function sum(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
  }

  function time2Second(
    second: number,
    minute: number = 0,
    hour: number = 0,
    day: number = 0
  ) {
    return ((day * 24 + hour) * 60 + minute) * 60 + second;
  }

  onMount(() => {
    if (!Notification) {
      // alert("It seems like your current browser doesn't support notification\n你的浏览器不支持消息提醒");
      return;
    }
    if (Notification.permission !== "granted") Notification.requestPermission();

    window.utools.onPluginEnter(({ code, type, payload }) => {
      // console.log('用户进入插件', code, type, payload);
      switch (code) {
        case "countdown":
          currentState = ClockState.countdown;
          break;
        case "countdown-input-clock":
          currentState = ClockState.countdown;
          msecondLeft = clockText2Second(payload) * 1000;
          isCountingDown = true;
          break;
        case "countdown-input-letter":
          currentState = ClockState.countdown;
          msecondLeft = letterText2Second(payload) * 1000;
          isCountingDown = true;
          break;
        case "time":
          currentState = ClockState.time;
          break;
        case "timer":
          currentState = ClockState.timer;
          break;
        default:
          break;
      }
    });
  });
</script>

<main>
  {#if currentState == ClockState.countdown}
    <div class="center-container">
      <Clock
        bind:msecond={msecondLeft}
        {currentState}
        style="grid-area: clock;"
      />
    </div>
    <div class="btn-container">
      <ToggleButton bind:value={isCountingDown} style="grid-area: center;" />
    </div>
  {:else if currentState == ClockState.time}
    <div class="center-container">
      <Clock
        msecond={msecondSinceMorning}
        {currentState}
        style="grid-area: clock;"
      />
    </div>
  {:else if currentState == ClockState.timer}
    <div class="center-container">
      <Clock msecond={msecondPassed} {currentState} style="grid-area: clock;" />
      <TimeList bind:recordTime bind:clearTimes style="grid-area: time-list;" />
    </div>
    <div class="btn-container">
      <button
        style="grid-area: left;"
        class="circle-btn-small"
        on:click={() => recordTime(msecondPassed)}
      >
        <img src="img/add.png" alt="add" />
      </button>
      <ToggleButton bind:value={isCountingUp} style="grid-area: `center`;" />
      <button
        style="grid-area: right;"
        class="circle-btn-small"
        on:click={resetTimer}
      >
        <img src="img/restart.png" alt="" />
      </button>
    </div>
  {/if}
  <SwitchButton bind:currentState />
</main>

<style lang="scss">
  @import "Global.scss";
  main {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
  }
  .btn-container {
    display: grid;
    gap: 10px;
    position: fixed;
    bottom: 6vh;
    left: 50vw;
    transform: translateX(-50%);
    align-items: center;
    grid-template-columns: 1fr min-content 1fr;
    grid-template-areas: "left center right";
  }
  #record-time-btn {
    width: 40px;
    height: 40px;
    color: var(--foreground-color);
    font-size: large;
    padding: 0;
  }
  .center-container {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: grid;
    place-content: center;
    grid-template-areas:
      "."
      "clock"
      "time-list";
    grid-template-rows: 1fr min-content 1fr;
    justify-items: center;
  }
</style>
