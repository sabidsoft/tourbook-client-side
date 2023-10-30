import { inputStyle } from "../../../assets/styles/inputStyle";
import FormErrorMessage from "../ui/formErrorMessage/FormErrorMessage";
import FormSubmitButton from "../ui/formSubmitButton/FormSubmitButton";
import FormTagChip from "../ui/formTagChip/FormTagChip";
import { AddTourFormProps } from "./types";

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
    addTag,
}: AddTourFormProps) {

    return (
        <div className="mt-24 pb-8">
            <div className="w-[90%] sm:w-[570px] mx-auto py-5 px-6 shadow-md rounded-lg">
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

                    <label
                        htmlFor="image"
                        className="border inline-block mb-5 py-2 px-3 rounded-lg"
                    >
                        Select Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*" // Use this attribute to specify that only image files can be selected
                        onChange={handleImageChange}
                        className={`${inputStyle} hidden`}
                    />

                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Selected"
                            className="w-full h-52 object-cover mb-5 rounded-lg"
                        />
                    )}

                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <FormTagChip
                                key={tag}
                                tag={tag}
                                removeTag={removeTag} />
                        ))}

                        <input
                            type="text"
                            placeholder="Add tags..."
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={addTag}
                            className={inputStyle}
                        />
                    </div>

                    {errorMessage && <FormErrorMessage message={errorMessage} />}
                    <FormSubmitButton value="Submit" />
                </form>
            </div>
        </div>
    );
};