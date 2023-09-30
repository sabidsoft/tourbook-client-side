export interface FormCardProps {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    formName: string;
    errorMessage: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}