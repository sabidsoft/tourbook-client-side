import { inputStyle } from "../../../assets/styles/inputStyle";
import FormErrorMessage from "../ui/formErrorMessage/FormErrorMessage";
import FormSubmitButton from "../ui/formSubmitButton/FormSubmitButton";
import TagChip from "../ui/formTagChip/FormTagChip";
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
                            onKeyDown={addTag}
                            className={inputStyle}
                        />
                    </div>

                    {errorMessage && <FormErrorMessage message={errorMessage} />}
                    <FormSubmitButton value="Submit" />
                </form>
            </div>
        </div>
    )
}