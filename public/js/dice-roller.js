/*
Name: Alec Schopler
Instructor: Prof. Pogue
Class: Software Engineering
Date: 20 September 2020
Description: This is the javascript code for the dice-roller webapp.
*/

// Functions uniqueArraySort and countArraySort are borrowed from Šime Vidas (edited by jpaugh) 
// response to the following question: Counting the occurrences / frequency of array elements
// https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements

function uniqueArraySort(arr) {
    var a = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
        }
        prev = arr[i];
    }
    return a;
}

function countArraySort(arr) {
    var b = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return b;
}

// Dice rolling functionality is modular based on the number of sides and the number of dice rolled
function RollSixSidedDice() {
    // Getting how many dice are to be rolled from the user
    diceSides = document.getElementById("diceSides").value;
    diceSides = Math.trunc(diceSides);
    if (diceSides <= 1) {
        diceSides =+ 1;
    }
    console.log("diceSides="+diceSides);
  
    // Getting how many dice are to be rolled from the user
    diceNum = document.getElementById("diceNum").value;
    diceNum = Math.trunc(diceNum);
    console.log("diceNum="+diceNum);

    // Declaring variables
    diceNum = Number(diceNum);
    diceSides = Number(diceSides);
    var i, j, k, x, diceArr = [], diceVal, diceResults;
    
    // Rolling the dice based on the number of dice and sides chosen
    for (i = 0; i < diceNum; i++) {
        diceVal = Math.floor(Math.random()*diceSides) + 1;
        diceArr.push(diceVal);
    }

    // Running functions to clean up diceArr
    var diceUniqueArr = uniqueArraySort(diceArr);
    var diceCountArr = countArraySort(diceArr);
    
    for(j = 0; j < diceSides; j++) {
        k = j + 1

        // Easter Egg: If the user isn't playing nice, don't play nice back
        if (diceSides <= 1 && diceArr.length == 0) {
            diceResults="Can you work with me here? Stop being so hard on me. >:)<br>";
            break;
        // If the number of sides is 1 (or <= to 1), throw an error to the user and break
        } else if (diceSides <= 1) {
            diceResults="You need a whole number larger than 1 to roll the dice. (Ex. 6 sides)<br>";
            break;
        // If the diceArr is empty or undefined, throw an error to the user and break
        } else if (diceArr.length == 0) {
            diceResults="Please enter a positive, whole number for how many dice you want to roll. (Ex. 1 dice)<br>";
            break;
        } 
        
        // If the value of the dice side does not exist, replace it with 0
        if(diceUniqueArr.indexOf(k) == -1) {
            if(k==1){
                diceResults="Number "+k+": 0<br>";
            } else{
                diceResults+="Number "+k+": 0<br>";
            }   
        // If the dice side value exists, print out the number   
        } else {
            if(k==1){
                diceResults="Number "+k+": <strong>"+diceCountArr[j]+"*</strong><br>";
            } else {
                // Finding the position of the value in the array
                x = diceUniqueArr.indexOf(k);
                diceResults+="Number "+k+": <strong>"+(diceCountArr[x])+"*</strong><br>";
            } 
        }
    }
    // Printing out the values to the web page
    document.getElementById("diceResultsID").innerHTML = diceResults;
}
