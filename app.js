let buffer = "0";
let finalSum = 0;
let previusOperation;
const screen = document.querySelector('.screen');
document.querySelector(".calc-buttons").addEventListener("click", function(event){
    buttonClick(event.target.innerText);
});

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if (buffer === "0"){
        buffer = value;
    } else{
        buffer += value;
    }
}

function handleSymbol(value){
    switch(value){
        case "C":
            buffer = "0";
            previusOperation = 0;
            finalSum = 0;
            break;
        case "←":
            if(buffer.length === 1){
                buffer = 0;
            } else{
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case "=":
            if(previusOperation === null){
                return;
            } else{
                flushOperation(parseInt(buffer))
                previusOperation = value;
                buffer = "" + finalSum;
                finalSum = 0;
                break;
            }
        default:
            handleMath(value);
            break;
    }
}

function flushOperation(intBuffer){
    if(previusOperation === "+"){
        finalSum += intBuffer;
    } else if (previusOperation === "-"){
        finalSum -= intBuffer;
    } else if (previusOperation === "÷"){
        finalSum /= intBuffer;
    } else{
        finalSum *= intBuffer;
    }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if(finalSum === 0){
        finalSum = intBuffer;
    } else{
        flushOperation(intBuffer);
    }
    previusOperation = value;
    buffer = "0";
}

function rerender(){
    screen.innerText = buffer;
}