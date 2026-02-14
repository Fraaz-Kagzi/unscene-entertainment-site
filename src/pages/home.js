import "../styles.css";
import { initNav } from "../shared/nav.js";

function initHomeAudioControl() {
    const audio = document.getElementById("bg-audio");
    const btn = document.getElementById("audio-toggle");
    if (!audio || !btn) return;

    // Subtle ambient level (adjust if needed)
    audio.volume = 0.12;

    const setUI = (isPlaying) => {
        btn.textContent = isPlaying ? "Pause audio" : "Play audio";
        btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
        btn.setAttribute("aria-label", isPlaying ? "Pause audio" : "Play audio");
        btn.classList.toggle("is-on", isPlaying);
    };

    const play = async () => {
        try {
        await audio.play();
        setUI(true);
        } catch {
        setUI(false);
        }
    };

    const pause = () => {
        audio.pause();
        setUI(false);
    };

    // Start OFF by default (client request)
    setUI(false);

    btn.addEventListener("click", () => {
        if (audio.paused) play();
        else pause();
    });

    // If user leaves the tab, pause
    document.addEventListener("visibilitychange", () => {
        if (document.hidden && !audio.paused) pause();
    });
    }

    (async function () {
    await initNav();
    initHomeAudioControl();
})();
