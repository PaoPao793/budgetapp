function displayChoices() {
    const radioChoice = document.querySelector('input[name="radioOption"]:checked').value;
    const dropdownChoice = document.getElementById('dropdownOption').value;
    const displayText = `You selected: ${radioChoice} and ${dropdownChoice}`;
    document.getElementById('output').textContent = displayText;
}