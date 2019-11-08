export const compareArrays = (arr1, arr2)=>{
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

