export interface AddTourFormProps {
    title: string;
    description: string;
    image: File | null;
    tagInput: string;
    tags: string[];
    errorMessage: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeTag: (removalTag: string) => void;
    handleTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}