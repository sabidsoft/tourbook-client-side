export interface User {
    _id: string;
    email: string;
    avatar: string;
    lastName: string;
    firstName: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
    }
}

export interface SignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}