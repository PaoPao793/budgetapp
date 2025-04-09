// scripts/expenses.js
document.addEventListener("DOMContentLoaded", () => {
    const expenseModal = document.getElementById("expenseModal");
    const depositModal = document.getElementById("depositModal");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const addDepositBtn = document.getElementById("addDepositBtn");
    const closeExpenseBtn = document.getElementById("closeExpenseModal");
    const closeDepositBtn = document.getElementById("closeDepositModal");

    // Amber addition for phase 2.1
    const editCategoriesBtn = document.getElementById("editCategoriesBtn"); // button to open modal for adding / removing categories
    const categoriesModal = document.getElementById("editCategoriesModal");
    const closeCategoriesBtn = document.getElementById("closeCategoriesModel");
    const categoryAmounts = {}; // for tracking $$ within each category

    initializeCategories();
    //

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
    editCategoriesBtn.addEventListener("click", () => {
        categoriesModal.classList.remove("hidden");
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

    function addCategory(value) {
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
    //

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


        alert("Expense added!");
        expenseModal.classList.add("hidden");
        e.target.reset();
    });

    document.getElementById("depositForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Deposit added!");
        depositModal.classList.add("hidden");
        e.target.reset();
    });

    document.getElementById("categoryForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById('newCategoryInput');
        addCategory(input.value.trim());
        expenseModal.classList.add("hidden");
        e.target.reset();
    });

    // edit this to add functionality for toggle bw week and month in expenses
    document.getElementById("toggleViewBtn").addEventListener("click", () => {
        alert("Switched between week and month view!");
    });
    
});
