export interface IVerifyRes {
    message: string;
    user: {
        userId: string;
        email: string;
        role: string;
        iat: number;
        exp: number;
    };
}