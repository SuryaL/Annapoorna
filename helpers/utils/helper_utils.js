function hasArrayMatching(arr1,arr2){
    for(let item of arr2){
        if(arr1.indexOf(item) != -1){
            return true;
        }
    }
    return false;
}

module.exports={
    hasArrayMatching
}