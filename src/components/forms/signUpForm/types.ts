export interface SignUpFormProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    errorMessage: string;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}