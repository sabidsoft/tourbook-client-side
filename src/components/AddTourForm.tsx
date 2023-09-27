import { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { inputStyle } from "../utils/inputStyle";
import ErrorMessage from "./ErrorMessage";
import FormSubmitButton from "./FormSubmitButton";
import TagChip from "./TagChip";

interface AddTourFormProps {
    title: string;
    description: string;
    image: File | null;
    tagInput: string;
    tags: string[];
    errorMessage: string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    removeTag: (removalTag: string) => void;
    handleTagInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    addTagInputIntoTags: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function AddTourForm({
    title,
    description,
    image,
    tags,
    tagInput,
    errorMessage,
    handleSubmit,
    handleTitleChange,
    handleDescriptionChange,
    handleImageChange,
    removeTag,
    handleTagInputChange,
    addTagInputIntoTags,
}: AddTourFormProps) {

    return (
        <div className="mt-36 pb-8">
            <div className="w-[90%] sm:w-[470px] mx-auto py-5 px-6 shadow-md rounded-lg">
                <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="font-medium text-2xl text-[#6B6F70]">
                        Add Tour
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="title"
                        placeholder="Enter Title"
                        required
                        value={title}
                        onChange={handleTitleChange}
                        className={inputStyle}
                    />
                    <textarea
                        placeholder="Enter Description"
                        rows={5}
                        required
                        value={description}
                        onChange={handleDescriptionChange}
                        className={inputStyle}
                    >
                        {description}
                    </textarea>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={handleImageChange}
                            className={inputStyle}
                        />
                    </div>

                    {/* {image && (
                        <img
                            src={image}
                            alt="Selected"
                            className="w-full h-52 object-cover mb-5 rounded-lg"
                        />
                    )} */}

                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <TagChip
                                key={tag}
                                tag={tag}
                                removeTag={removeTag} />
                        ))}
                        <input
                            type="text"
                            placeholder="Add tags..."
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={addTagInputIntoTags}
                            className={inputStyle}
                        />
                    </div>

                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    <FormSubmitButton value="Submit" />
                </form>
            </div>
        </div>
    )
}