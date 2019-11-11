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

//2 elevado N >= C ========> C = cantidad de subredes a crear, N es lo que determina la funcion.
const resolveFormula = function(amountOfNetworksNeeded){
    for(let i = 0;i<equivalenceTable.length;i++){
        if(amountOfNetworksNeeded <= equivalenceTable[i]){
            return i;
        }
    }
    return null;
};

const getBinaryIpFromShortDecimalNetMaskRepresentation = function(shortNetMaskRepresentation){ //netMaskShortRepresentation = 24 -> 11111111.11111111.11111111.00000000
    let cont = 0;
    let onesCounter = 0;
    let octectsArray = [];
    while(cont < 4){
        let binaryOctect = "";
        let cont2 = 0;
        while(cont2 < 8){
            if(onesCounter < shortNetMaskRepresentation){
                binaryOctect += "1";
                onesCounter += 1;
            }else{
                binaryOctect += "0";
            }
            cont2++;
        }
        octectsArray.push(binaryOctect);
        cont++;
    }
    return octectsArray.join(".");
};

const getSubnets = function(decimalNetworkAddresIp,shortNetMaskRepresentation,amountOfSubnetsNeeded){

    let N = resolveFormula(amountOfSubnetsNeeded);
    let amountOfSubnets = Math.pow(2,N); //cantidad de subredes que se crearán.

    let subnetIfo = {
        networkAddress:"",
        netMask:""
    };


};