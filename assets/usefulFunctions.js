const equivalenceTable = [1,2,4,8,16,32,64,128];

const maskClasses = [8,16,24];//contiene las máscaras de red válidas.

const reverseString = function(string){
    let newString = "";
    for (let i = string.length - 1; i >= 0; i--) { 
        newString += string[i];
    }
    return newString;
}

const transformBinaryOctectToDecimal = function(octect){
    let reversedString = reverseString(octect);//Se invierte la secuencia para efectos de calculo.

    let decimalEquivalent = 0;
    for(let i= 0;i<reversedString.length;i++){
        if(reversedString[i] === "1"){
            decimalEquivalent += equivalenceTable[i];
        }
    }
    return decimalEquivalent;
};


const transformBinaryIpToDecimalIp = function(binaryIp){//decimalIp is something like this "255.255.224.0"
    let octectsArray = binaryIp.split(".");

    let arrayOfDecimalOctets = [];
    for(let i = 0;i<octectsArray.length;i++){
        try{
            arrayOfDecimalOctets.push(transformBinaryOctectToDecimal(octectsArray[i]));
        }catch(error){
            return new Error(error.message);
        }
    }

    return arrayOfDecimalOctets.join(".");
};

const transformDecimalOctectToBinary = function(decimalNumber){
    if(0 <= decimalNumber <= 255){
        stringResult = "";
        let currentDecimal = decimalNumber;
        for(let i = 0;i<equivalenceTable.length;i++){
            if(currentDecimal >= equivalenceTable[(equivalenceTable.length-1)-i]){
                stringResult += "1";
                currentDecimal -= equivalenceTable[(equivalenceTable.length-1)-i];
            }else{
                stringResult += "0";
            }
        }
        return stringResult;
    }else{
        throw new Error("El numero no puede ser menor a 0 ni mayor a 255");
    }
}

const transformDecimalIpToBinaryIp = function(decimalIp){//decimalIp is something like this "255.255.224.0"
    let octectsArray = decimalIp.split(".");

    let arrayOfInts = octectsArray.map(function(decimal){
        return parseInt(decimal);
    });

    let arrayOfBinaryOctets = [];
    for(let i = 0;i<arrayOfInts.length;i++){
        try{
            arrayOfBinaryOctets.push(transformDecimalOctectToBinary(arrayOfInts[i]));
        }catch(error){
            return new Error(error.message);
        }
    }

    return arrayOfBinaryOctets.join(".");
};

const getSubnets = function(ipAddres,netmask,amountOfSubnetsNeeded){
    
};