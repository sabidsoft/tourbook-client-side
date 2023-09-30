export interface SignInFormProps {
    email: string;
    password: string;
    errorMessage: string;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}