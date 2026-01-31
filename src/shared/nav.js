import { requireGate } from "./gate.js";

export async function initNav() {
    if (requireGate()) return;

    const navMount = document.getElementById("site-nav");
    const footerMount = document.getElementById("site-footer");

    // Make BASE_URL absolute by attaching it to the current origin
    const base = new URL(import.meta.env.BASE_URL, window.location.origin);

    if (navMount) {
        const navUrl = new URL("partials/nav.html", base);
        const res = await fetch(navUrl);
        navMount.innerHTML = await res.text();
    }

    if (footerMount) {
        const footerUrl = new URL("partials/footer.html", base);
        const res = await fetch(footerUrl);
        footerMount.innerHTML = await res.text();
    }

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach((a) => {
        const href = a.getAttribute("href")?.split("/").pop();
        if (href === path) a.classList.add("active");
    });
}
