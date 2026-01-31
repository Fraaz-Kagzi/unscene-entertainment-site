import { requireGate } from "./gate.js";

export async function initNav() {
    if (requireGate()) return;

    const navMount = document.getElementById("site-nav");
    const footerMount = document.getElementById("site-footer");

    const base = new URL(import.meta.env.BASE_URL, window.location.origin);

    if (navMount) {
    const navUrl = new URL("partials/nav.html", base);
    const res = await fetch(navUrl);
    navMount.innerHTML = await res.text();

    // --- Fix relative nav links for GitHub Pages ---
    const basePath = import.meta.env.BASE_URL;

    document
        .querySelectorAll("#site-nav a[data-nav], #site-nav a.brand")
        .forEach((a) => {
        const raw = a.getAttribute("href") || "";
        if (
            !raw ||
            raw.startsWith("http") ||
            raw.startsWith("mailto:") ||
            raw.startsWith("#")
        )
            return;

        const clean = raw.replace(/^\.\//, "").replace(/^\//, "");
        a.setAttribute("href", `${basePath}${clean}`);
        });

    // ✅ FIX LOGO PATH FOR GITHUB PAGES
    const logoImg = document.querySelector("#site-nav img[data-logo]");
    if (logoImg) {
        logoImg.src = `${basePath}UE_Logo.png`;
    }
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
