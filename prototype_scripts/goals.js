let currentCardBeingEdited = null;
let currentProgressSpan = null;

document.addEventListener("DOMContentLoaded", () => {
    // goal modal
    const modal = document.getElementById("goalModal");
    const openBtn = document.getElementById("addGoalBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const goalForm = document.getElementById("goalForm");
    const goalsSection = document.getElementById("goalsList");

    // overview editing 
    const editBtn = document.getElementById("editOverviewBtn");
    const saveBtn = document.getElementById("saveOverviewBtn");
    const budgetValues = document.getElementById("budgetValues");
    const editFields = document.getElementById("editFields");

    // adding new category to the overview 
    const categoryModal = document.getElementById("addCategoryModal");
    const openCategoryBtn = document.getElementById("addCategoryBtn");
    const closeCategoryBtn = document.getElementById("closeCategoryModalBtn");
    const categoryForm = document.getElementById("categoryForm");

    openCategoryBtn.addEventListener("click", () => {
        categoryModal.classList.remove("hidden");
    });

    closeCategoryBtn.addEventListener("click", () => {
        categoryModal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === categoryModal) {
            categoryModal.classList.add("hidden");
        }
    });

    // adding new goal 
    categoryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const categoryName = document.getElementById("categoryNameInput").value.trim();
        const amount = document.getElementById("categoryAmountInput").value.trim();

        if (categoryName && amount) {
            // Add to visible overview
            const viewItem = document.createElement("p");
            viewItem.innerHTML = `${categoryName}: $<span class="category-amount">${amount}</span>`;
            document.getElementById("budgetValues").appendChild(viewItem);

            // Add to editFields
            const label = document.createElement("label");
            label.textContent = `${categoryName}:`;

            const amountInput = document.createElement("input");
            amountInput.type = "number";
            amountInput.className = "custom-amount";
            amountInput.setAttribute("data-name", categoryName);
            amountInput.value = amount;

            const fieldsDiv = document.getElementById("editFields");
            const saveButton = document.getElementById("saveOverviewBtn");

            fieldsDiv.insertBefore(label, saveButton);
            fieldsDiv.insertBefore(amountInput, saveButton);
        }

        categoryForm.reset();
        categoryModal.classList.add("hidden");
    });


    // logic for clicking the edit button and changing amounts 
    saveBtn.addEventListener("click", () => {
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
        const newBudget = document.getElementById("weeklyBudgetInput").value;
        const newSaving = document.getElementById("weeklySavingInput").value;

        document.getElementById("weeklyBudget").textContent = newBudget;
        document.getElementById("weeklySaving").textContent = newSaving;

        // Toggle weekly fields back
        budgetValues.classList.remove("hidden");
        editFields.classList.add("hidden");

        // Save updated values for all custom categories added to editFields
        // Clear all custom entries in budgetValues except the first 2 default lines
        const baseChildren = Array.from(budgetValues.children).slice(0, 2);
        budgetValues.innerHTML = '';
        baseChildren.forEach(child => budgetValues.appendChild(child));

        // Get all custom-amount inputs inside #editFields (use data-name for label)
        const customInputs = document.querySelectorAll('#editFields .custom-amount');

        customInputs.forEach(input => {
            const categoryName = input.getAttribute('data-name');
            const amount = input.value;

            const viewItem = document.createElement('p');
            viewItem.innerHTML = `${categoryName}: $<span class="category-amount">${amount}</span>`;
            budgetValues.appendChild(viewItem);
        });
    });

    editBtn.addEventListener("click", () => {
        budgetValues.classList.add("hidden");
        editFields.classList.remove("hidden");
        editBtn.classList.add("hidden");
        saveBtn.classList.remove("hidden");
    });


    // the collapsible things for the goals 
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

    // adding goal 
    goalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const goalName = goalForm.goalName.value.trim();
        const amount = goalForm.goalAmount.value.trim();
        const progress = goalForm.goalProgress.value.trim() || "0";
        const dueDate = goalForm.goalDate.value.trim();
        const type = goalForm.goalType.value;
        const plan = goalForm.savingPlan.value.trim();

        if (!goalName || !amount || !dueDate) {
            alert("Please fill in all required fields.");
            return;
        }

        // Create expandable goal card
        const goalCard = document.createElement("div");
        goalCard.className = "goal-card collapsible";
        goalCard.innerHTML = `
            <div class="goal-summary">
                <span class="goal-name"><strong>${goalName}</strong></span>
                <span class="goal-progress">$${progress} / $${amount}</span>
                <span class="chevron toggle-collapse">▼</span>
                <button class="quick-edit-btn">✎</button>
            </div>
            <div class="goal-details hidden">
                <p><strong>Target:</strong> $${amount}</p>
                <p><strong>Progress:</strong> $${progress}</p>
                <p><strong>Due:</strong> ${dueDate}</p>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Plan:</strong><br>${plan.replace(/\n/g, "<br>")}</p>
                <button class="edit-goal-btn">Edit</button>
            </div>
        `;

        goalCard.addEventListener("click", () => {
            const details = goalCard.querySelector(".goal-details");
            const summary = goalCard.querySelector(".goal-summary");
            details.classList.toggle("hidden");
            summary.classList.toggle("expanded");
        });

        goalsSection.appendChild(goalCard);

        modal.classList.add("hidden");
        this.reset();
    });

    // Attach expand/collapse logic to any pre-existing goal cards -> rm if we get rid of default vals 
    document.querySelectorAll('.goal-card .toggle-collapse').forEach(chevron => {
        chevron.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = chevron.closest('.goal-card');
            const details = card.querySelector('.goal-details');
            const summary = card.querySelector('.goal-summary');
    
            details.classList.toggle('hidden');
            summary.classList.toggle('expanded');
        });
    });
    

    goalsSection.addEventListener("click", (e) => {
        const target = e.target;

        // Quick progress
        if (target.classList.contains("quick-edit-btn")) {
            e.stopPropagation();
            currentProgressSpan = target.closest(".goal-card").querySelector(".goal-progress");
            const current = parseInt(currentProgressSpan.textContent.split("/")[0].replace(/[$\s]/g, ""));
            document.getElementById("newProgressInput").value = current;
            document.getElementById("progressModal").classList.remove("hidden");
            return;
        }
    
        // Full edit
        if (target.classList.contains("edit-goal-btn")) {
            e.stopPropagation();
            const card = target.closest(".goal-card");
            currentCardBeingEdited = card;
    
            // pre-fill inputs from card content
            const name = card.querySelector(".goal-name").textContent.trim();
            const [progress, amount] = card.querySelector(".goal-progress").textContent.replace(/\$/g, "").split("/").map(x => x.trim());
            const due = card.querySelector(".goal-details").innerHTML.match(/<strong>Due:<\/strong>\s*(.*?)<\/p>/)?.[1] ?? "";
            const type = card.querySelector(".goal-details").innerHTML.match(/<strong>Type:<\/strong>\s*(.*?)<\/p>/)?.[1] ?? "";
            const plan = card.querySelector(".goal-details").innerHTML.match(/<strong>Plan:<\/strong><br>([\s\S]*?)<\/p>/)?.[1]?.replace(/<br>/g, "\n") ?? "";
    
            const editForm = document.getElementById("editGoalForm");
            editForm.editGoalName.value = name;
            editForm.editGoalAmount.value = amount;
            editForm.editGoalProgress.value = progress;
            editForm.editGoalDate.value = due;
            editForm.editGoalType.value = type;
            editForm.editGoalPlan.value = plan;
    
            document.getElementById("editGoalModal").classList.remove("hidden");
            return;
        }

        // Toggle only when clicking on chevron
        if (target.classList.contains("toggle-collapse")) {
            e.stopPropagation(); 
            const card = target.closest(".goal-card");
            const details = card.querySelector(".goal-details");
            const summary = card.querySelector(".goal-summary");

            details.classList.toggle("hidden");
            summary.classList.toggle("expanded");
        }
    });
    

});

window.onload = function () {
    document.getElementById("sort-upcoming").click(); // Default sort
};

document.getElementById("sort-upcoming").addEventListener("click", function () {
    sortGoals("upcoming");
    markActiveFilter("sort-upcoming");
});

document.getElementById("sort-amount-asc").addEventListener("click", function () {
    sortGoals("amount-asc");
    markActiveFilter("sort-amount-asc");
});

document.getElementById("sort-amount-desc").addEventListener("click", function () {
    sortGoals("amount-desc");
    markActiveFilter("sort-amount-desc");
});

function markActiveFilter(activeId) {
    const filterIds = ["sort-upcoming", "sort-amount-asc", "sort-amount-desc"];
    filterIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.style.backgroundColor = (id === activeId) ? "rgba(17, 55, 138)" : "#2196F3";
            //btn.style.color = (id === activeId) ? "white" : "black";
        }
    });
}

function sortGoals(method) {
    const container = document.getElementById("goalsList");
    const cards = Array.from(container.querySelectorAll(".goal-card"));

    const sorted = cards.sort((a, b) => {
        const amountA = parseInt(a.querySelector(".goal-summary").textContent.match(/\$[\d,]+/g)?.[1].replace(/[$,]/g, "") || "0");
        const amountB = parseInt(b.querySelector(".goal-summary").textContent.match(/\$[\d,]+/g)?.[1].replace(/[$,]/g, "") || "0");

        const dueDateA = new Date(a.querySelector(".goal-details").innerHTML.match(/<strong>Due:<\/strong>\s*(\d{4}-\d{2}-\d{2})/)[1]);
        const dueDateB = new Date(b.querySelector(".goal-details").innerHTML.match(/<strong>Due:<\/strong>\s*(\d{4}-\d{2}-\d{2})/)[1]);

        if (method === "upcoming") {
            return dueDateA - dueDateB;
        } else if (method === "amount-asc") {
            return amountB - amountA;
        } else if (method === "amount-desc") {
            return amountA - amountB;
        }

        return 0;
    });

    container.innerHTML = "";
    sorted.forEach(card => container.appendChild(card));
}

document.getElementById("progressForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newVal = document.getElementById("newProgressInput").value;
    if (currentProgressSpan) {
        const total = currentProgressSpan.textContent.split("/")[1];
        currentProgressSpan.textContent = `$${newVal} / ${total}`;
    }
    document.getElementById("progressModal").classList.add("hidden");
});

document.getElementById("editGoalForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.editGoalName.value.trim();
    const amount = form.editGoalAmount.value.trim();
    const progress = form.editGoalProgress.value.trim();
    const date = form.editGoalDate.value;
    const type = form.editGoalType.value;
    const plan = form.editGoalPlan.value;

    if (currentCardBeingEdited) {
        currentCardBeingEdited.querySelector(".goal-name strong").textContent = name;
        currentCardBeingEdited.querySelector(".goal-progress").textContent = `$${progress} / $${amount}`;
        const details = currentCardBeingEdited.querySelector(".goal-details");
        details.innerHTML = `
            <p><strong>Target:</strong> $${amount}</p>
            <p><strong>Progress:</strong> $${progress}</p>
            <p><strong>Due:</strong> ${date}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Plan:</strong><br>${plan.replace(/\n/g, "<br>")}</p>
            <button class="edit-goal-btn">Edit Goal</button>
        `;
    }

    document.getElementById("editGoalModal").classList.add("hidden");
});


document.querySelectorAll('#goalForm [required]').forEach(input => {
    const label = input.previousElementSibling;
    if (label && !label.querySelector('.required')) {
        const star = document.createElement('span');
        star.className = 'required';
        star.textContent = '*';
        label.appendChild(star);
    }
});

// Close the edit goal modal when 'X' is clicked
document.getElementById("closeEditGoalModal").addEventListener("click", () => {
    document.getElementById("editGoalModal").classList.add("hidden");
});

// Close the progress modal when 'X' is clicked
document.getElementById("closeProgressModal").addEventListener("click", () => {
    document.getElementById("progressModal").classList.add("hidden");
});

window.addEventListener("click", (e) => {
    if (e.target.id === "editGoalModal") {
        e.target.classList.add("hidden");
    }
    if (e.target.id === "progressModal") {
        e.target.classList.add("hidden");
    }
});

// handles keyboard
const goalModal = document.querySelector("#goalModal"); 
const editGoalModal = document.querySelector("#editGoalModal");
const inputs = document.querySelectorAll("input, textarea");
const keyboard = document.getElementById("keyboard");

inputs.forEach(input => {
    input.addEventListener("focus", () => {
      keyboard.style.display = "block";
      goalModal.style.paddingBottom = "270px"; // make room for keyboard height + spacing
      editGoalModal.style.paddingBottom = "270px";
    });
  
    input.addEventListener("blur", () => {
      setTimeout(() => {
        const activeElement = document.activeElement;
        const stillFocused = Array.from(inputs).includes(activeElement);
  
        if (!stillFocused) {
          keyboard.style.display = "none";
          goalModal.style.paddingBottom = "0";
          editGoalModal.style.paddingBottom = "0";
        }
      }, 100);
    });
  });


