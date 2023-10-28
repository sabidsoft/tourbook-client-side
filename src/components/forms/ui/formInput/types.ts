export interface FormInputProps {
    id?: string;
    type: string;
    name: string;
    value: string;
    className: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}