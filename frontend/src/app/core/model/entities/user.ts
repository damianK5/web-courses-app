
export enum AccountType
{
    ADMIN = 'ADMIN', TEACHER = "TEACHER", STUDENT = "STUDENT"
}

export type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType: AccountType
}