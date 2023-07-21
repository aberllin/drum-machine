const soundKeyMap = {
  heater1: {
    key: "q",
    label: "Heater 1",
  },
  heater2: {
    key: "w",
    label: "Heater 2",
  },
  heater3: {
    key: "e",
    label: "Heater 3",
  },
  heater4: { key: "a", label: "Heater 4" },
  clap: {
    key: "s",
    label: "Clap",
  },
  "open-HH": {
    key: "d",
    label: "Open HH",
  },
  "kick-n-hat": {
    key: "z",
    label: "Kick-n-Hat",
  },
  kick: {
    key: "x",
    label: "Kick",
  },
  "closed-hh": {
    key: "c",
    label: "Closed HH",
  },
};

let powerOn = true;
const powerSwitcher = document.getElementById("power-toggle");
powerSwitcher.addEventListener("click", () =>
  powerSwitcher.checked ? (powerOn = false) : (powerOn = true)
);

const soundVolume = document.getElementById("volume");
const soundButtons = document.querySelectorAll(".drum-pad");
const displayLabelBlock = document.getElementById("display");
const playSound = (item) => {
  const itemChildren = item.children;
  if (itemChildren.length) {
    if (powerOn === true) {
      const audio = itemChildren[0];
      item.style.boxShadow = "inset 0.2rem 0.2rem 0.5rem #8d99ae";

      if (audio.paused) {
        audio
          .play()
          .catch((err) => console.error("Failed to play audio: ", err));
      }

      audio.volume = soundVolume.value;

      audio.addEventListener("input", () => (audio.volume = soundVolume.value));
      audio.addEventListener(
        "ended",
        () => (item.style.boxShadow = "8px 10px 28px -11px rgba(66, 68, 90, 1)")
      );
      displayLabelBlock.innerText = soundKeyMap[item.id].label;
    }
  }

  item.removeEventListener("click", () => playSound(item));
  item.removeEventListener("keypress", () => playSound(item));
};

soundButtons.forEach((button) => {
  button.addEventListener("click", () => playSound(button));
});

document.addEventListener("keypress", (event) => {
  soundButtons.forEach((button) => {
    const correspondingSound = soundKeyMap[button.id];
    if (correspondingSound && correspondingSound.key === event.key) {
      playSound(button);
    }
  });
});
