function Calculator(){
    this.methods = {
        "-" : (a,b)=>a-b,
        "+" : (a,b)=>a+b,
        "/" : (a,b)=>a/b,
        "*" : (a,b)=>a*b,
        "^" : (a,b)=>Math.pow(a,b)
    };

    this.calculate = function(str){
        let split =  str.split(op),
        a = +split[0],
        b = +split[1]
        
     if(isNaN(a) || isNaN(b)){
        return NaN;
     }
     return this.methods[op](a,b)
    };

    this.addMethods = function(name,func){
        this.methods[name] = func;
    }
};

let op,
    input = document.querySelector("input"),
    nodeOfButtons = document.querySelectorAll('button'),
    value = '',
    functionalOperator = ["DEL","C","="],
    mathamaticalOperator = ["+","-","*","/","^"],
    buttons = Array.from(nodeOfButtons),
    calculator = new Calculator;

buttons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        if(e.target.textContent == "C"){
             value = ''
             input.value = value;
        }else if(e.target.textContent == "DEL"){
             value = value.substring(0,value.length-1);
             input.value = value;
             op = null;
        }else if(mathamaticalOperator.includes(e.target.id)){
            if(value == ""){
             value = '';
             input.value = value;
            }else if(mathamaticalOperator.includes(value.charAt(value.length-1))){
             value = value.substring(0,value.length-1);
             value += e.target.id;
             input.value = value;
             op = e.target.id;
            }else if(op && !mathamaticalOperator.includes(value.charAt(value.length-1))){
             value = `${calculator.calculate(value)}`;
            if(value.includes(".")){
             value = (+value).toFixed(1) 
            }
             value += e.target.id;
             input.value = value;
             op = null
            }else if(!mathamaticalOperator.includes(value.charAt(value.length-1))){
             value += e.target.id;
             input.value = value;
             op = e.target.id;
            }
        }else if(e.target.id == "." ){
            if(value.includes(".")){
            if(op){
             let splitedValue = value.split(op);
             if(splitedValue[1] == "" || !splitedValue[1].includes(".")){
             value += e.target.id;
             input.value = value;
             }
            }else{
             input.value = value;    
            }
            }else if(value == ""){
             value = e.target.id
             input.value = value;
            }else if(value.charAt(value.length-1) == "."){
             value = value.substring(0,value.length-1);
             value += e.target.id;
             input.value = value;
            }else if (value !== ""){
             value += e.target.id;
             input.value = value;
            }
        }else if(e.target.id == "="){
            if(value == ""){
             input.value = value;
            }else if(value.charAt(value.length-1) == op){
             input.value = value;
            }else if(!op){
             input.value = value;
            }else{
             value = `${calculator.calculate(value)}`
             if(value.includes(".")){
             value = (+value).toFixed(1)    
            }
             input.value = value;
             op = null;
            }
        }else if(!functionalOperator.includes(e.target.textContent)){
             value +=  e.target.id
             input.value = value;
        }
    })});