export interface ICustomer {
    id: string,
    full_name: string,
    nss: string,
    rfc: string,
    phone: number
}

export type IVersions = {
    id: string,
    id_customer: string
    full_name: string,
    nss: string,
    rfc: string,
    phone: number,
    contrac: string
}

export type requestCustomer = Omit<ICustomer, 'id'>