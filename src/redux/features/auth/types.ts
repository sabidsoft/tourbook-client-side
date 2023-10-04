export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InitialState {
    token: string | null;
    user: User | null;
}