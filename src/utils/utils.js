export const compareArrays = (arr1, arr2) => {
    //check that arrays are the same length
    if(arr1.length === arr2.length){
        for(let i=0; i<arr1.length; i++){
            if(arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }else{
        return false;
    }
}

export const formatNumber = num => {
    const DENOMS = [
        {
            value:1000,
            symbol:'K'
        },
        {
            value:1000000,
            symbol: 'Mil'
        },   
        {
            value:1000000000,
            symbol: 'Bil'
        },   
        {
            value:1000000000000,
            symbol: 'Tri'
        },   
        {
            value:1000000000000000,
            symbol: 'Qua'
        },   
        {
            value:1000000000000000000,
            symbol: 'Qui'
        },   
        {
            value:1000000000000000000000,
            symbol: 'Sex'
        },   
        {
            value:1000000000000000000000000,
            symbol: 'Sep'
        },   
        {
            value:1000000000000000000000000000,
            symbol: 'Oct'
        },   
        {
            value:1000000000000000000000000000000,
            symbol: 'Non'
        },   
        {
            value:1000000000000000000000000000000000,
            symbol: 'Dec'
        },

    ]

    //take number, divide by largest value which does not result in a value less than 1
    //if remaining value is less that 1000 and greater than or equal to 1, 
    //take that value, trun to X and append the denominator
    
    //if the number provided is less than the minimum value we are formatting
    //return the number without formatting
    if(num<DENOMS[0].value){
        return num;
    } else{
        for(let denom in DENOMS){
            const { value, symbol } = DENOMS[denom];
            let remainder = num / value;
            if(remainder >= 1000 ){
                continue;
            }else if(remainder >= 1 && remainder < 1000){
                let formattedValue = `${Math.floor(remainder)} ${symbol}`;
                return formattedValue;
            } else{
                console.log('Cannot format: ', num);
            }
        }
    }
}