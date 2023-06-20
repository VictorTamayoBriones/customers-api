export const cleanBodyRequest = (bodyExpected: any, bodyRequest: any) => {

    const bodyRequestAsArr = Object.keys(bodyRequest);

    bodyRequestAsArr.forEach(key => {
        if(!bodyExpected.hasOwnProperty(key)){
            delete bodyRequest[key]
        }
    })

    const arrOfEntries = Object.entries(bodyRequest)
        .map(entry => entry[1] != '' && {[entry[0]]:entry[1]})
        .filter(data => data);
    
    let newObject = {}
    
    arrOfEntries.forEach((entry:any) => {
        console.log(`ENTRY: ${entry}`)
        newObject = {...newObject, ...entry}
    })

    return newObject;
}