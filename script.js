let passwordLength = 16
const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const renewButtonEl = document.querySelector("#renew")

const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

function generatePassword(){

    let chars = "abcdefghjklmnpqrstuvwxyz"
    const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "0123456789"
    const symbolChars = "?!@$#%&*()[]"

    if(upperCaseCheckEl.checked){
        chars += uppercaseChars
    }
    
    if(numberCheckEl.checked){
        chars += numberChars
    }

    if(symbolCheckEl.checked){
        chars += symbolChars 
    }

    let password = ""

    for(let i = 0; i<passwordLength ; i++){
        const randomNumber = Math.floor(Math.random() * chars.length)

        password += chars.substring(randomNumber, randomNumber+1)
    }
   
    inputEl.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality(){
    // adicionando peso ao calculo da porcentagem
    // inicialmente a senha tem peso 25, se você adicionar maiusculas
    // a senha ganha 15 de peso, se adicionar número ganha 25 e se 
    // adicionar simbolos a senha ganha 35 de peso, totalizando 100%
    const percent = Math.round((passwordLength/64) *100*0.25 +
    (upperCaseCheckEl.checked ? 15 : 0) + (numberCheckEl.checked ? 25 : 0)
    + (symbolCheckEl.checked ? 35: 0))
    // percent define o tamanho da barra de segurança do indicador
    securityIndicatorBarEl.style.width = `${percent}%`

    if(percent > 69){
        //safe
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    } else if (percent > 50){
        // warning
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
    } else {
        // critical
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('critical')
    }

    if(percent >= 100){
        securityIndicatorBarEl.classList.add('completed')
    }else{
        securityIndicatorBarEl.classList.remove('completed')
    }
}
// calcular tamanho da fonte
function calculateFontSize(){
    if(passwordLength > 45) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-xxs')
    } else if(passwordLength > 32){
        inputEl.classList.remove('font-xxs')
        inputEl.classList.remove('font-sm')
        inputEl.classList.add('font-xs')
    } else if(passwordLength > 22){
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
        inputEl.classList.add('font-sm')
    } else{
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
    }
}
// função para copiar a senha
function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

// ligando o range ao gerador de senha
const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function(){
    passwordLength = passwordLengthEl.value
    // linkando minha range com o tamanho de passwordlength
    document.querySelector("#password-length-text").innerText = 
    passwordLength
    generatePassword()
})
// adicionando um evento de click que gera uma senha 
upperCaseCheckEl.addEventListener('click', generatePassword)
numberCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)
renewButtonEl.addEventListener('click', generatePassword)

// linkando o botão copiar ao button
copyButtonEl = document.querySelector('#copy-1').addEventListener("click", copy)
copyButtonEl = document.querySelector('#copy-2').addEventListener("click", copy)

generatePassword()