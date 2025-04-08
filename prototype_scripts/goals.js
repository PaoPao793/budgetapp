document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("goalModal");
    const openBtn = document.getElementById("addGoalBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const goalForm = document.getElementById("goalForm");
    const goalsSection = document.getElementById("goalsList"); // target this container

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

    goalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const goalName = goalForm.goalName.value.trim();
        const amount = goalForm.goalAmount.value.trim();
        const dueDate = goalForm.goalDate.value.trim();
        const type = goalForm.goalType.value;
        const plan = goalForm.savingPlan.value.trim();

        if (!goalName || !amount || !dueDate) {
            alert("Please fill in all required fields.");
            return;
        }

        // Create new goal card
        const goalCard = document.createElement("div");
        goalCard.className = "goal-card";
        goalCard.innerHTML = `
            <strong>${goalName}</strong><br>
            Target: $${amount} | Due: ${dueDate}<br>
            <em>Type:</em> ${type}<br>
            <em>Plan:</em> ${plan}
        `;

        goalsSection.appendChild(goalCard);

        modal.classList.add("hidden");
        this.reset();
    });
});
