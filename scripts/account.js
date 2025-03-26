document.getElementById("addAcctBtn").addEventListener("click", function() {
    let accountName = prompt("Enter the account name:");

    if (accountName) {
        let accountItem = document.createElement("div");
        accountItem.classList.add("account-item");

        let accountText = document.createElement("span");
        accountText.textContent = accountName;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "x";
        removeBtn.style = "background-color: lightgray; border: none; margin-left: 5px; border-radius: 50%; margin-top: 7px; "
        removeBtn.classList.add("remove-btn");

        removeBtn.addEventListener("click", function() {
            accountItem.remove();
        });

        accountItem.appendChild(accountText);
        accountItem.appendChild(removeBtn);

        document.getElementById("accounts_list").appendChild(accountItem);
    }
});

console.log('hello world')