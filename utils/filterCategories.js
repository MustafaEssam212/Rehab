


export default function filterCategories (arr, category){

    if(category === 'الكل'){
        return arr
    }else{
        const filtered = arr.filter((e) => e.category === category);
        return filtered;
    }


}