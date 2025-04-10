export interface DecodedToken {
    roles: string[];
    sub: string;
    iat: number;
    exp: number;
}
