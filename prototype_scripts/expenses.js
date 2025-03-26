// scripts/expenses.js
document.addEventListener("DOMContentLoaded", () => {
    const expenseModal = document.getElementById("expenseModal");
    const depositModal = document.getElementById("depositModal");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const addDepositBtn = document.getElementById("addDepositBtn");
    const closeExpenseBtn = document.getElementById("closeExpenseModal");
    const closeDepositBtn = document.getElementById("closeDepositModal");

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

    window.addEventListener("click", (e) => {
        if (e.target === expenseModal) expenseModal.classList.add("hidden");
        if (e.target === depositModal) depositModal.classList.add("hidden");
    });

    // Optional: handle form submissions
    document.getElementById("expenseForm").addEventListener("submit", (e) => {
        e.preventDefault();
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

    // edit this to add functionality for toggle bw week and month in expenses
    document.getElementById("toggleViewBtn").addEventListener("click", () => {
        alert("Switched between week and month view!");
    });
    
});
