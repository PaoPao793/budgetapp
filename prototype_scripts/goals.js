// scripts/goals.js

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("goalModal");
    const openBtn = document.getElementById("addGoalBtn");
    const closeBtn = document.getElementById("closeModalBtn");

    openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    document.getElementById("goalForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Goal added!"); // replace with dynamic functionality if needed
        modal.classList.add("hidden");
        this.reset();
    });
});
