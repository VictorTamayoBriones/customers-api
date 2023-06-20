
export const unionVersions = (customers:any, versions:any) =>{
    const arrOfVersions:any = {};

    versions.forEach((version:any)=>{
        if(arrOfVersions[version.id_customer]){
            arrOfVersions[version.id_customer] = [
                ...arrOfVersions[version.id_customer],
                version
            ]
        }else{
            arrOfVersions[version.id_customer] = [
                version
            ]
        }
        
    })

    const newCustomers = customers.map((customer:any) =>{
        const versions = arrOfVersions[customer.id];
        return{
            ...customer,
            versions: versions || []
        }
    })

    return newCustomers
}