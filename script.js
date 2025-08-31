let input = document.querySelector("input");
let nodeOfButtons = document.querySelectorAll('button');
let value = '';
let op;
let functionalOperator = ["DEL","C","="];
let mathamaticalOperator = ["+","-","*","/","^",]
let buttons = Array.from(nodeOfButtons);

buttons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        if(e.target.textContent == "C"){
            value = ''
            input.value = value;

        }else if(e.target.textContent == "DEL"){
            value = value.substring(0,value.length-1);
            input.value = value;

        }else if(mathamaticalOperator.includes(e.target.id) && value == ""){
              value = '';
              input.value = value;

        }else if(e.target.id == "." ){
            if(value == ""){
                value = '';
                input.value = value;
            }else if(value.charAt(value.length-1) == "."){
               value = value.substring(0,value.length-1);
               value += e.target.id;
               input.value = value;
            }else if (value !== ""){
                 value += e.target.id;
              input.value = value;
            }
                

        }else if(mathamaticalOperator.includes(e.target.id) && mathamaticalOperator.includes(value.charAt(value.length-1))){
               value = value.substring(0,value.length-1);
               value += e.target.id;
               input.value = value;
               op = e.target.id;

        }else if(mathamaticalOperator.includes(e.target.id) && value !== ""){
              value += e.target.id;
              input.value = value;
              op = e.target.id;

        }else if(e.target.id == "="){

               if(value == ""){
                input.value = value;
               }else if(value.charAt(value.length-1) == op){
                input.value = value;
               }else{
                value = `${calculator.calculate(value).toFixed(1)}`
                input.value = value;
               }

        }else if(!functionalOperator.includes(e.target.textContent)){
            value +=  e.target.id
              input.value = value;
        }
    })
})


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
}

let calculator = new Calculator;

