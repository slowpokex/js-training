/**
 * Created by harle on 17.03.2017.
 */

//Some operations for calculating
var calc = {
    add : function (a,b) {
       return a + b
    },
    sub : function (a,b) {
        return a - b
    },
    multiple : function (a,b) {
        return a * b
    },
    divide : function (a,b) {
        return a / b
    },
    divideByInt : function (a,b) {
        return a % b
    }
}

/*
 Function that performs all input operations
 Parameter calcObj - needed operations, is is a object of function
 Parameters x,y - input arguments
 Return the string line of results
 */
function operations(calcObj,x,y) {
    if (!(calcObj instanceof Object)) {
        throw new Error("The input parameter should be a Object")
    }
    var results = new String("Input parameters: " + x + ", " + y + ": <br>");
    for (var el in calcObj){
        if (!(calcObj[el] instanceof Function)) {
            throw new Error("The elements should be a Function")
        }
        results += (el + " : " + calcObj[el](x, y) + "<br>")
    }
    return results + "<br>"
}

var element = document.getElementById("calculate");
element.addEventListener('click', function () {
    var x = document.getElementById("first").value;
    var y = document.getElementById("second").value;
    document.getElementById("result").innerHTML = operations(calc, x, y)
})
