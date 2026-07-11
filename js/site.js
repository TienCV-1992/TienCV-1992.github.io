(() => {
    const header = document.querySelector("[data-site-header]");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".primary-nav");

    const closeMenu = () => {
        if (!toggle || !nav) return;
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
    };

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const willOpen = toggle.getAttribute("aria-expanded") !== "true";
            toggle.setAttribute("aria-expanded", String(willOpen));
            nav.classList.toggle("is-open", willOpen);
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
                toggle.focus();
            }
        });

        document.addEventListener("click", (event) => {
            if (!nav.classList.contains("is-open")) return;
            if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) closeMenu();
        });
    }

    const updateHeader = () => {
        if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach((element) => {
        element.textContent = year;
    });
})();
