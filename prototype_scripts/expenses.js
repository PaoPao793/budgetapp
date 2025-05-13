// scripts/expenses.js
document.addEventListener("DOMContentLoaded", () => {
    const expenseModal = document.getElementById("expenseModal");
    const depositModal = document.getElementById("depositModal");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const addDepositBtn = document.getElementById("addDepositBtn");
    const closeExpenseBtn = document.getElementById("closeExpenseModal");
    const closeDepositBtn = document.getElementById("closeDepositModal");

    // Amber addition for phase 2.1
    const categoriesModal = document.getElementById("editCategoriesModal");
    const closeCategoriesBtn = document.getElementById("closeCategoriesModel");
    const categoryAmounts = {}; // for tracking $$ within each category

    initializeCategories();
    //

    let isEditing = false;

    const editBtn = document.getElementById("editCategoriesBtn");
    const addCategoryBtn = document.getElementById("addCategoryBtn");
    const categoryControls = document.getElementById("category-controls");
    const categoryList = document.getElementById("goal-categories-list");
    const categorySelect = document.getElementById("categorySelect");


    addExpenseBtn.addEventListener("click", () => {
        expenseModal.classList.remove("hidden");
    });

    closeExpenseBtn.addEventListener("click", () => {
        expenseModal.classList.add("hidden");
    });

    addDepositBtn.addEventListener("click", () => {
        depositModal.classList.remove("hidden");
    });

    closeDepositBtn.addEventListener("click", () => {
        depositModal.classList.add("hidden");
    });

    // Amber addition for phase 2.1
    /*editCategoriesBtn.addEventListener("click", () => {
        categoriesModal.classList.remove("hidden");
    });*/

    addCategoryBtn.addEventListener("click", () => {
        categoriesModal.classList.remove("hidden");
    });
    
    

    document.getElementById("categoryForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById('newCategoryInput');
        addCategory(input.value.trim());
        categoriesModal.classList.add("hidden"); // instead of expenseModal
        e.target.reset();
    });
    

    closeCategoriesBtn.addEventListener("click", () => {
        categoriesModal.classList.add("hidden");
    });

    function updateCategoryDisplay() {
        const listItems = document.querySelectorAll('#goal-categories-list li');
        const toggleBtn = document.getElementById('toggleCategoriesBtn');
    
        if (listItems.length <= 3) {
            toggleBtn.style.display = "none"; // No need for expand/collapse
            listItems.forEach(li => li.style.display = "block");
        } else {
            toggleBtn.style.display = "block"; // Show the expand button
    
            listItems.forEach((li, index) => {
                if (index < 3) {
                    li.style.display = "block";
                } else {
                    li.style.display = "none";
                }
            });
        }
    }
    
    let categoriesExpanded = false;
    
    document.getElementById('toggleCategoriesBtn').addEventListener('click', () => {
        const listItems = document.querySelectorAll('#goal-categories-list li');
        categoriesExpanded = !categoriesExpanded;
    
        if (categoriesExpanded) {
            listItems.forEach(li => li.style.display = "block");
            document.getElementById('toggleCategoriesBtn').innerText = "Show Less";
        } else {
            listItems.forEach((li, index) => {
                if (index < 3) {
                    li.style.display = "block";
                } else {
                    li.style.display = "none";
                }
            });
            document.getElementById('toggleCategoriesBtn').innerText = "Show More";
        }
    });

    /*function addCategory(value) {
        const list = document.getElementById("goal-categories-list");
        const categorySelect = document.getElementById("categorySelect");

        if (value) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="goal-card">
                    <span class="goal-card-text">${value}</span>
                    - $<span class="category-amount" data-category="${value}">0</span>
                </div>
            `;

            list.appendChild(li);
            // initializes the $$ for this category
            categoryAmounts[value] = 0;

            // adds to dropdown list of categories
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            categorySelect.appendChild(option);

            updateCategoryDisplay();
        }
    }*/

    function addCategory(value) {
        if (!value) return;
    
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="goal-card">
                <span class="goal-card-text">${value}</span>
                - $<span class="category-amount" data-category="${value}">0</span>
            </div>
        `;
        categoryList.appendChild(li);
    
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        categorySelect.appendChild(option);
    }

    function initializeCategories() {
        const list = document.getElementById("goal-categories-list");
        const categorySelect = document.getElementById("categorySelect");

        // creates the food category; defaults to $200 in expenses
        const li1 = document.createElement('li');
        li1.innerHTML = `
            <div class="goal-card">
                <span class="goal-card-text">🍔 Food</span>
                - $<span class="category-amount" data-category="🍔 Food">200</span>
            </div>
        `;

        list.appendChild(li1);
        // initializes the $$ for this category
        categoryAmounts['🍔 Food'] = 200;

        // creates the house category; defaults to $150 in expenses
        const li2 = document.createElement('li');
        li2.innerHTML = `
            <div class="goal-card">
                <span class="goal-card-text">🏠 House</span>
                - $<span class="category-amount" data-category="🏠 House">150</span>
            </div>
        `;

        list.appendChild(li2);
        // initializes the $$ for this category
        categoryAmounts['🏠 House'] = 150;

        // creates the fun category; defaults to $150 in expenses
        const li3 = document.createElement('li');
        li3.innerHTML = `
            <div class="goal-card">
                <span class="goal-card-text">🎉 Fun</span>
                - $<span class="category-amount" data-category="🎉 Fun">150</span>
            </div>
        `;

        list.appendChild(li3);
        // initializes the $$ for this category
        categoryAmounts['🎉 Fun'] = 150;

        // adds each to dropdown list of categories
        const option1 = document.createElement('option');
        option1.value = "🍔 Food";
        option1.textContent = "🍔 Food";
        categorySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = "🏠 House";
        option2.textContent = "🏠 House";
        categorySelect.appendChild(option2);

        const option3 = document.createElement('option');
        option3.value = "🎉 Fun";
        option3.textContent = "🎉 Fun";
        categorySelect.appendChild(option3);
    }
    
    function showMessage(messageText, duration = 5000) {
        const messageBox = document.getElementById("messageBox");
        messageBox.innerText = messageText;
        messageBox.classList.remove("hidden");
    
        // Auto-hide after the given duration
        setTimeout(() => {
            messageBox.classList.add("hidden");
        }, duration);
    }

    editBtn.addEventListener("click", () => {
        isEditing = !isEditing;
    
        // Update button text
        editBtn.textContent = isEditing ? "Save" : "Edit";
    
        // Toggle the "Add Category" button visibility
        categoryControls.style.display = isEditing ? "flex" : "none";
    
        // Toggle delete buttons
        document.querySelectorAll('#goal-categories-list li').forEach(li => {
            let btn = li.querySelector(".delete-category-btn");
    
            if (isEditing) {
                if (!btn) {
                    btn = document.createElement("button");
                    btn.textContent = "❌";
                    btn.className = "delete-category-btn";
                    btn.style.marginLeft = "1rem";
                    btn.style.border = "none";
                    btn.style.background = "transparent";
                    btn.style.cursor = "pointer";
                    btn.addEventListener("click", () => {
                        const categoryText = li.querySelector(".goal-card-text")?.textContent;
                        li.remove();
                        // Also remove from dropdown
                        Array.from(categorySelect.options).forEach(option => {
                            if (option.textContent === categoryText) {
                                option.remove();
                            }
                        });
                    });
                    li.querySelector(".goal-card")?.appendChild(btn);
                }
            } else if (btn) {
                btn.remove();
            }
        });
    });
    
    
    
    
    

    window.addEventListener("click", (e) => {
        if (e.target === expenseModal) expenseModal.classList.add("hidden");
        if (e.target === depositModal) depositModal.classList.add("hidden");
        // Amber addition for phase 2.1
        if (e.target === categoriesModal) categoriesModal.classList.add("hidden");
    });

    // Optional: handle form submissions (incomplete)
    document.getElementById("expenseForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const category = document.getElementById("categorySelect").value; // gets the selected category
        //alert("Expense added!");
        showMessage("Expense added! Go to Home to see it");
        expenseModal.classList.add("hidden");
        e.target.reset();
    });

    document.getElementById("depositForm").addEventListener("submit", (e) => {
        e.preventDefault();
        showMessage("Deposit added! Go to home to see it");
        depositModal.classList.add("hidden");
        e.target.reset();
    });

    

    // edit this to add functionality for toggle bw week and month in expenses
    document.getElementById("toggleViewBtn").addEventListener("click", () => {
        //alert("Switched between week and month view!");
        showMessage("Switched between week and month view!");
    });
    
});


document.querySelectorAll('#categoryForm [required]').forEach(input => {
    const label = input.previousElementSibling;
    if (label && !label.querySelector('.required')) {
        const star = document.createElement('span');
        star.className = 'required';
        star.textContent = '*';
        label.appendChild(star);
    }
});

document.querySelectorAll('#expenseForm [required]').forEach(input => {
    const label = input.previousElementSibling;
    if (label && !label.querySelector('.required')) {
        const star = document.createElement('span');
        star.className = 'required';
        star.textContent = '*';
        label.appendChild(star);
    }
});

document.querySelectorAll('#depositForm [required]').forEach(input => {
    const label = input.previousElementSibling;
    if (label && !label.querySelector('.required')) {
        const star = document.createElement('span');
        star.className = 'required';
        star.textContent = '*';
        label.appendChild(star);
    }
});

