window.onload = function() { // want to sort by newest by default
    document.getElementById("sort-newest").click();
};

document.getElementById("sort-newest").addEventListener("click", function() {
    sortHistory("newest");
    document.getElementById("sort-newest").style.backgroundColor = "rgba(17, 55, 138)";
    document.getElementById("sort-oldest").style.backgroundColor = "#2196F3";
    document.getElementById("sort-amount").style.backgroundColor = "#2196F3";
})

document.getElementById("sort-oldest").addEventListener("click", function() {
    sortHistory("oldest");
    document.getElementById("sort-newest").style.backgroundColor = "#2196F3";
    document.getElementById("sort-oldest").style.backgroundColor = "rgba(17, 55, 138)";
    document.getElementById("sort-amount").style.backgroundColor = "#2196F3";
})

document.getElementById("sort-amount").addEventListener("click", function() {
    sortHistory("amount");
    document.getElementById("sort-newest").style.backgroundColor = "#2196F3";
    document.getElementById("sort-oldest").style.backgroundColor = "#2196F3";
    document.getElementById("sort-amount").style.backgroundColor = "rgba(17, 55, 138)";
})

function sortHistory(how) {
    console.log('function called');
    const cards = document.querySelectorAll(".history-card");
    const sortedCards = Array.from(cards).sort((a, b) => {
        if (how === "newest" || how === "oldest") {
            const dateA = new Date(a.querySelector("strong").textContent);
            const dateB = new Date(b.querySelector("strong").textContent);

            if (how === "newest") {
                return dateB - dateA;
            } else if (how === "oldest") {
                return dateA - dateB;
            }
        } else if (how === "amount") {
            const amountA = parseInt(a.querySelector(".amount").textContent.replace("$", ""));
            const amountB = parseInt(b.querySelector(".amount").textContent.replace("$", ""));

            return amountB - amountA;
        }
        return 0;
    });
    let cont = document.getElementById("history-card-container");
    cont.innerHTML = "";
    sortedCards.forEach(card => cont.appendChild(card));
}

