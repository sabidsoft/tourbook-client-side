export interface User {
    name: string,
    email: string
}

export interface InitialState {
    token: string | null,
    user: User | null,
}