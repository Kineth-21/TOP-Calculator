document.addEventListener('DOMContentLoaded', function() {  
    const display = document.querySelector("#display");

    const numbers = document.querySelectorAll(".number");
    let operator = "";
    let operatorInUse = false;
    let activeButton = null;
    let prevNumber = "";
    let currentValue = 0;
    let lastOperator = "";
    let lastOperand = 0;

    // Function to handle number button clicks
    numbers.forEach(number => {
        number.addEventListener('click', (event) => {
            const value = event.target.value; // gets value of the corresponding number
            
            if(operator === ""){
                display.value += value; // if no operator is used, just append the number on the display
            }
            else{
                if(operatorInUse){                  //if operator used
                    prevNumber = display.value;
                    display.value = "";
                    operatorInUse = false;
                }
                display.value += value;
            }
        });
    });

    // Operand buttons functionality
    const operands = document.querySelectorAll(".operand");
    operands.forEach(operand => {
        operand.addEventListener("click", (event) => {
            if(activeButton === event.target){
                activeButton.classList.toggle('active');
                operator = "";
                activeButton = null;
                operatorInUse =false;
            }
            else{
                if(activeButton){
                    activeButton.classList.remove("active");
                }
                event.target.classList.add('active'); // Add the active class to the currently clicked button
                
                activeButton = event.target; // Update the activeButton variable to the currently clicked button
                operator = activeButton.value;
                operatorInUse = true;
            }
        });
    });

    // Clear button functionality
    const clear = document.querySelector("#clear");
    clear.addEventListener("click", () => {
        display.value = "";
        prevNumber = "";
        operator = "";
        operatorInUse = false;
        activeButton = null;
        lastOperator = "";
        lastOperand = 0;

        operands.forEach(operand => {
            operand.classList.remove('active');
        });
    });

    // Decimal point button functionality
    const decimalPoint = document.querySelector("#decimalPt");
    decimalPoint.addEventListener("click", (event) => {
        let isDecimalUsed = display.value.includes('.');
        if(!isDecimalUsed){
            display.value += event.target.value;
        }
    });

    // Equals button functionality
    const equals = document.querySelector("#equals");
    equals.addEventListener("click", () => {
        if(prevNumber === ""){
            prevNumber = "0";
        }

        currentValue = Number(display.value);

        if (operator !== "") {
            switch(operator){
                case "+":
                    display.value = Number(prevNumber) + currentValue;
                    break;
                case "-":
                    display.value = Number(prevNumber) - currentValue;
                    break;
                case "*":
                    display.value = Number(prevNumber) * currentValue;
                    break;
                case "/":
                    display.value = Number(prevNumber) / currentValue;
                    break;
            }
            lastOperator = operator;
            lastOperand = currentValue;
            operator = "";
            operatorInUse = false;
            operands.forEach(operand => {
                operand.classList.remove('active');
            });
            activeButton = null;
        } else if (lastOperator !== "") {
            switch(lastOperator){
                case "+":
                    display.value = Number(display.value) + lastOperand;
                    break;
                case "-":
                    display.value = Number(display.value) - lastOperand;
                    break;
                case "*":
                    display.value = Number(display.value) * lastOperand;
                    break;
                case "/":
                    display.value = Number(display.value) / lastOperand;
                    break;
            }
        }

        prevNumber = display.value;
    });

    // Sign button functionality
    const sign = document.querySelector("#sign");
    sign.addEventListener("click", () => {
        display.value *= -1;
    });

    // Percent functionality
    const percent = document.querySelector("#percent");
    percent.addEventListener("click", () => {
        if(prevNumber === ""){
            prevNumber = "0";
        }

        currentValue = Number(display.value);

        if (operator !== "") {
            switch(operator){
                case "+":
                    display.value = Number(prevNumber) + ((Number(prevNumber) * currentValue) / 100);
                    break;
                case "-":
                    display.value = Number(prevNumber) - ((Number(prevNumber) * currentValue) / 100);
                    break;
                case "*":
                    display.value = ((Number(prevNumber) / 100) * currentValue);
                    break;
                default:
                    display.value = Number(prevNumber) * ((Number(prevNumber) * currentValue) / 100);
                    break;
            }
            operator = "";
            operatorInUse = false;
            operands.forEach(operand => {
                operand.classList.remove('active');
            });
            activeButton = null;
        prevNumber = display.value;
        }
    });
});
