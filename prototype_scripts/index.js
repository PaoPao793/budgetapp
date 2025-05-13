// Currency Converter
const currencySelector = document.getElementById('currency-dropdown');
const moneyElements = document.querySelectorAll('.money');
var formattedAmount;

// Currency conversion rates
const conversionRates = {
    USD: 1,      // Base currency
    CAD: 1.41,   // Example: 1 USD = 1.41 CAD
    EUR: 0.85,   // Example: 1 USD = 0.85 EUR
    JPY: 146.61  // Example: 1USD = 146.61 JPY
};

currencySelector.addEventListener('change', () => {
    const selectedCurrency = currencySelector.value;
    const rate = conversionRates[selectedCurrency];

    moneyElements.forEach(el => {
        // console.log(el.textContent);
        
        const rawAmountText = el.textContent.trim(); // Extract the raw numeric value, handle signs

        // Extract the sign (+ or -) and numeric part
        const sign = rawAmountText.charAt(0) === '+' || rawAmountText.charAt(0) === '-' ? rawAmountText.charAt(0) : null;
        const numericPart = parseFloat(rawAmountText.replace(/[^0-9.-]+/g, '')); // Remove non-numeric characters

       
        const amountInUSD = sign === '-' ? -numericPart : numericPart;  // Apply sign
        const convertedAmount = (amountInUSD * rate); // Convert it to the selected currency

        // Format currency value
        if (selectedCurrency == "USD" || selectedCurrency == "CAD") {
            formattedAmount = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(convertedAmount);
        } else if (selectedCurrency == "EUR") {
            formattedAmount = new Intl.NumberFormat('en-DE', {
                style: 'currency',
                currency: 'EUR'
            }).format(convertedAmount);
        } else {
            formattedAmount = new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY'
            }).format(convertedAmount);
        }

        if (sign != null) {
            el.textContent = sign + formattedAmount; // Display the converted and formatted value
        } else {
            el.textContent = formattedAmount;
        }
        
    });
});

// Quick Actions Modal
document.addEventListener("DOMContentLoaded", () => {
    // expense and depost modal
    const expenseModal = document.getElementById("expenseModal");
    const depositModal = document.getElementById("depositModal");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const addDepositBtn = document.getElementById("addDepositBtn");
    const closeExpenseBtn = document.getElementById("closeExpenseModal");
    const closeDepositBtn = document.getElementById("closeDepositModal");

    initializeCategories();

    // goal modal
    const modal = document.getElementById("goalModal");
    const openBtn = document.getElementById("addGoalBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const goalForm = document.getElementById("goalForm");
    const goalsSection = document.getElementById("goalsList");

    // reminder modal
    const reminderModal = document.getElementById("reminderModal");
    const addReminderBtn = document.getElementById("addReminderBtn");
    const closeReminderBtn = document.getElementById("closeReminderModal");

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

    addReminderBtn.addEventListener("click", () => {
        reminderModal.classList.remove("hidden");
    });

    closeReminderBtn.addEventListener("click", () => {
        reminderModal.classList.add("hidden");
    });

    function initializeCategories() {
        // adds each to dropdown list of categories
        const option1 = document.createElement('option');
        option1.value = "🍔 Food";
        option1.textContent = "🍔 Food";

        const option2 = document.createElement('option');
        option2.value = "🏠 House";
        option2.textContent = "🏠 House";

        const option3 = document.createElement('option');
        option3.value = "🎉 Fun";
        option3.textContent = "🎉 Fun";
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

    window.addEventListener("click", (e) => {
        if (e.target === expenseModal) expenseModal.classList.add("hidden");
        if (e.target === depositModal) depositModal.classList.add("hidden");
        if (e.target === reminderModal) reminderModal.classList.add("hidden");
    });

    // Optional: handle form submissions (incomplete)
    document.getElementById("expenseForm").addEventListener("submit", (e) => {
        e.preventDefault();
    
        const name = e.target.querySelector('input[type="text"]').value;
        const amount = parseFloat(e.target.querySelector('input[type="number"]').value).toFixed(2);

        const expenseCard = document.createElement("div");
        expenseCard.className = "transaction-card expense";
        expenseCard.innerHTML = `🧾 ${name} <span id="date">5/13/25</span> <span class="money">-$${amount}</span>`;

        document.getElementById("today-transactions").appendChild(expenseCard);

        showMessage("Expense added!");
        expenseModal.classList.add("hidden");
        e.target.reset();
    });

    document.getElementById("depositForm").addEventListener("submit", (e) => {
        e.preventDefault();
    
        const name = e.target.querySelector('input[type="text"]').value;
        const amount = parseFloat(e.target.querySelector('input[type="number"]').value).toFixed(2);
    
        const depositCard = document.createElement("div");
        depositCard.className = "transaction-card income";
        depositCard.innerHTML = `💵 ${name} <span id="date">5/13/25</span> <span class="money">+$${amount}</span>`;
    
        document.getElementById("today-transactions").appendChild(depositCard);
    
        showMessage("Deposit added!");
        depositModal.classList.add("hidden");
        e.target.reset();
    });
    

    document.getElementById("reminderForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const reminderCategory = document.getElementById("categorySelect").value; // gets the selected category

        showMessage("Reminder added!");
        //alert("Reminder added!");
        reminderModal.classList.add("hidden");
        e.target.reset();
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
        const dueDate = goalForm.goalDate.value.trim();
        const type = goalForm.goalType.value;
        const plan = goalForm.savingPlan.value.trim();

        if (!goalName || !amount || !dueDate) {
            alert("Please fill in all required fields."); // still needs to be changed!! 
            return;
        }

        // Create expandable goal card
        const goalCard = document.createElement("div");
        goalCard.className = "goal-card collapsible";
        goalCard.innerHTML = `
            <div class="goal-summary">
                <strong>${goalName}</strong> - $0 / $${amount}
            </div>
            <div class="goal-details hidden">
                <p><strong>Target:</strong> $${amount}</p>
                <p><strong>Due:</strong> ${dueDate}</p>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Plan:</strong><br>${plan.replace(/\n/g, "<br>")}</p>
            </div>
        `;

        goalCard.addEventListener("click", () => {
            const details = goalCard.querySelector(".goal-details");
            details.classList.toggle("hidden");
        });

        goalsSection.appendChild(goalCard);

        modal.classList.add("hidden");
        this.reset();
    });

    // Attach expand/collapse logic to any pre-existing goal cards -> rm if we get rid of default vals 
    document.querySelectorAll('.goal-card.collapsible').forEach(card => {
        card.addEventListener('click', () => {
            const details = card.querySelector('.goal-details');
            if (details) {
                details.classList.toggle('hidden');
            }
        });
    });
});

// Handle recent transaction filtering 
const allBtn = document.getElementById('overview-all');
const incomeBtn = document.getElementById('overview-income');
const expenseBtn = document.getElementById('overview-expense');
const transactions = document.querySelectorAll('.transaction-card');
const buttons = document.querySelectorAll('.overview-btn');

function setActive(btn) {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

setActive(allBtn); // Default active button is the All button

allBtn.addEventListener('click', () => {
    transactions.forEach(tx => tx.style.display = 'flex');
    setActive(allBtn);
});

incomeBtn.addEventListener('click', () => {
    transactions.forEach(tx => {
        if (tx.classList.contains('income')) {
            tx.style.display = 'flex';
        } else {
            tx.style.display = 'none';
        }
    });
    setActive(incomeBtn);
});

expenseBtn.addEventListener('click', () => {
    transactions.forEach(tx => {
        if (tx.classList.contains('expense')) {
            tx.style.display = 'flex';
        } else {
            tx.style.display = 'none';
        }
    });
    setActive(expenseBtn);
});

// Handle Show more button
document.getElementById('more-transaction').addEventListener('click', () => {
    window.location.href = 'analytics.html'; 
});

// Handle notif modal
const notifBtn = document.getElementById('notif_button');
const modal = document.getElementById('notifModal');
const closeBtn = document.querySelector('.modal .close');
const reminderList = document.getElementById('reminderList');
const expenseForm = document.getElementById('expenseForm');

// Load reminders from localStorage
function loadReminders() {
    // if no remidners
    //reminderList.innerHTML = '<li>No upcoming reminders</li>';

    // The reminders for now are hardcoded in html
}

// Open modal
notifBtn.addEventListener('click', () => {
  loadReminders();
  modal.style.display = 'flex';
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
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

document.querySelectorAll('#goalForm [required]').forEach(input => {
    const label = input.previousElementSibling;
    if (label && !label.querySelector('.required')) {
        const star = document.createElement('span');
        star.className = 'required';
        star.textContent = '*';
        label.appendChild(star);
    }
});

document.querySelectorAll('#reminderForm [required]').forEach(input => {
    const label = input.previousElementSibling;
    if (label && !label.querySelector('.required')) {
        const star = document.createElement('span');
        star.className = 'required';
        star.textContent = '*';
        label.appendChild(star);
    }
});

// handles keyboard
const goalModal = document.querySelector("#goalModal");
const expenseModal = document.querySelector("#expenseModal"); 
const depositModal = document.querySelector("#depositModal");
const reminderModal = document.querySelector("#reminderModal");
const inputs = document.querySelectorAll("input, textarea");
const keyboard = document.getElementById("keyboard");

inputs.forEach(input => {
    input.addEventListener("focus", () => {
      keyboard.style.display = "block";
      goalModal.style.paddingBottom = "270px";
      expenseModal.style.paddingBottom = "270px"; // make room for keyboard height + spacing
      depositModal.style.paddingBottom = "270px";
      reminderModal.style.paddingBottom = "270px";
    });
  
    input.addEventListener("blur", () => {
      setTimeout(() => {
        const activeElement = document.activeElement;
        const stillFocused = Array.from(inputs).includes(activeElement);
  
        if (!stillFocused) {
          keyboard.style.display = "none";
          goalModal.style.paddingBottom = "0";
          expenseModal.style.paddingBottom = "0";
          depositModal.style.paddingBottom = "0";
          reminderModal.style.paddingBottom = "0";
        }
      }, 100);
    });
  });