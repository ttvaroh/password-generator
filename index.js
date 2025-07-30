const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
const upperCase = characters.filter(c => /[A-Z]/.test(c));
const lowerCase = characters.filter(c => /[a-z]/.test(c));
const numbers = characters.filter(c => /[0-9]/.test(c));
const symbols = characters.filter(c => /[^a-zA-Z0-9]/.test(c));

const genButton = document.getElementById('gen-btn');
const toggleBtn = document.getElementById('toggle-options');
const optionsPanel = document.getElementById('options-panel');
const lengthInput = document.getElementById('password-length');
const lengthDisplay = document.getElementById('length-display');


genButton.addEventListener('click', function() {
    password1.innerText = getRandomPassword()
    password2.innerText = getRandomPassword()
})

document.querySelectorAll('.res-btn').forEach(button => {
    button.addEventListener('click', () => {
        let text = button.innerText;
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Copied:", text);
                button.classList.add("copied");
                setTimeout(() => button.classList.remove("copied"), 1500);
            })
            .catch(err => {
                console.error("Failed to copy:", err);
            });
    });
});

toggleBtn.addEventListener('click', () => {
    const isHidden = optionsPanel.classList.toggle('hidden');
    toggleBtn.textContent = isHidden ? 'Show Options ▼' : 'Hide Options ▲';
});

lengthInput.addEventListener('input', () => {
  lengthDisplay.textContent = lengthInput.value;
});

function copyButtonText(button) {
    let text = button.innerText
    navigator.clipboard.writeText(text)
        .then(() => {
          console.log("Copied:", text);
          button.classList.add("copied");
          setTimeout(() => button.classList.remove("copied"), 1500);
        })
        .catch(err => {
          console.error("Failed to copy:", err);
        });
}

function getRandomPassword() {
    let includeUppercase = document.getElementById('include-uppercase').checked;
    let includeNumbers = document.getElementById('include-numbers').checked;
    let includeSymbols = document.getElementById('include-symbols').checked;
    let passLen = parseInt(document.getElementById('password-length').value, 10);
    let pass = ''
    
    
    let allowedChars = [...lowerCase];
    if (includeUppercase) allowedChars = allowedChars.concat(upperCase);
    if (includeNumbers) allowedChars = allowedChars.concat(numbers);
    if (includeSymbols) allowedChars = allowedChars.concat(symbols);
    
    for (let i = 0; i < passLen; i++) {
        let randomIndex = Math.floor(Math.random()* allowedChars.length)
        pass += allowedChars[randomIndex]
    }
    return pass
}