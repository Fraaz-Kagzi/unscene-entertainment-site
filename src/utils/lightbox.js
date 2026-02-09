export function initLightbox() {
    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const lbCap = document.getElementById("lightbox-caption");
    if (!lb || !lbImg || !lbCap) return;

    const open = (src, caption = "") => {
        lbImg.src = src;
        lbImg.alt = caption || "Preview image";
        lbCap.textContent = caption || "";
        lb.classList.add("is-open");
        lb.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const close = () => {
        lb.classList.remove("is-open");
        lb.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        lbImg.src = "";
        lbImg.alt = "";
        lbCap.textContent = "";
    };

    // Click any WIP tile
    document.querySelectorAll("[data-full]").forEach((btn) => {
        btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-full");
        const img = btn.querySelector("img");
        const caption = img?.alt || "";
        if (src) open(src, caption);
        });
    });

    // Close handlers
    lb.querySelectorAll("[data-close]").forEach((el) => {
        el.addEventListener("click", close);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lb.classList.contains("is-open")) close();
    });
}
