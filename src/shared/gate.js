// src/shared/gate.js
// TEMPORARY gate (not secure): prevents misclicks / casual access
const STORAGE_KEY = "unscene_gate_ok_v1";
const PASSWORD = "SEEN";

/**
 * Returns true if the gate is active (page should stop initializing).
 * Returns false if already unlocked.
 */
export function requireGate() {
    if (localStorage.getItem(STORAGE_KEY) === "1") return false;

    // Ensure body exists
    if (!document.body) {
        // If called too early, try again once DOM is ready
        window.addEventListener("DOMContentLoaded", () => requireGate(), { once: true });
        return true;
    }

    const overlay = document.createElement("div");
    overlay.id = "gate-overlay";
    overlay.innerHTML = `
        <div class="gate-card" role="dialog" aria-modal="true" aria-label="Private preview">
        <h1>Private preview</h1>
        <p>Enter the access password to view this site.</p>

        <div class="gate-row">
            <input id="gate-pw" type="password" placeholder="Password" autocomplete="off" />
            <button id="gate-go" type="button">Enter</button>
        </div>

        <div class="gate-err" id="gate-err" aria-live="polite">Wrong password.</div>
        <div class="gate-hint">Temporary gate to prevent misclicks.</div>
        </div>
    `;

    const style = document.createElement("style");
    style.id = "gate-style";
    style.textContent = `
        #gate-overlay{
        position: fixed;
        inset: 0;
        z-index: 999999;
        display: grid;
        place-items: center;
        background:
            radial-gradient(900px 240px at 50% -10%, rgba(255,59,59,.12), transparent 60%),
            #07080a;
        color: #fff;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }
        #gate-overlay .gate-card{
        width: min(520px, 92vw);
        padding: 22px;
        border-radius: 18px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 18px 60px rgba(0,0,0,0.65);
        }
        #gate-overlay h1{
        margin: 0 0 8px;
        font-size: 28px;
        letter-spacing: .02em;
        }
        #gate-overlay p{
        margin: 0 0 14px;
        opacity: .75;
        line-height: 1.4;
        }
        #gate-overlay .gate-row{
        display: flex;
        gap: 10px;
        }
        #gate-overlay input{
        flex: 1;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.14);
        background: rgba(0,0,0,0.35);
        color: #fff;
        outline: none;
        }
        #gate-overlay input:focus{
        border-color: rgba(255,59,59,0.35);
        box-shadow: 0 0 0 3px rgba(255,59,59,0.15);
        }
        #gate-overlay button{
        padding: 12px 16px;
        border-radius: 12px;
        border: 1px solid rgba(255,59,59,0.35);
        background: rgba(255,59,59,0.22);
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        }
        #gate-overlay button:hover{ filter: brightness(1.05); }
        #gate-overlay .gate-err{
        margin-top: 10px;
        color: rgba(255,140,140,0.95);
        display: none;
        }
        #gate-overlay .gate-hint{
        margin-top: 10px;
        opacity: .55;
        font-size: 13px;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    const input = overlay.querySelector("#gate-pw");
    const btn = overlay.querySelector("#gate-go");
    const err = overlay.querySelector("#gate-err");

    function unlock() {
        const val = (input.value || "").trim();
        if (val === PASSWORD) {
        localStorage.setItem(STORAGE_KEY, "1");
        // reload so nav/footer injection runs cleanly after unlock
        location.reload();
        return;
        }
        err.style.display = "block";
        input.focus();
        input.select();
    }

    btn.addEventListener("click", unlock);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") unlock();
    });

    input.focus();
    return true;
}
