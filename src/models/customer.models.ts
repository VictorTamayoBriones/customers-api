export interface ICustomer {
    id: string,
    full_name: string,
    nss: string,
    rfc: string,
    phone: number,
    address: string,
    contrac: string
}

export type requestCustomer = Omit<ICustomer, 'id'>