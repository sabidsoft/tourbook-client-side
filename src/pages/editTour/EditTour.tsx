import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { inputStyle } from "../../assets/styles/inputStyle";
import { useLocation, useNavigate } from "react-router-dom";
import FormTagChip from "../../components/forms/ui/formTagChip/FormTagChip";
import FormErrorMessage from "../../components/forms/ui/formErrorMessage/FormErrorMessage";
import FormSubmitButton from "../../components/forms/ui/formSubmitButton/FormSubmitButton";
import { useUpdateTourMutation } from "../../redux/features/api/tourApi/tourApi";
import Loader from "../../components/common/loader/Loader";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";

export default function EditTour() {
    const location = useLocation();
    const {
        _id: tourId,
        title: initialTitle,
        description: initialDescription,
        imageUrl: initialImageUrl,
        tags: initialTags,
    } = location.state

    const [title, setTitle] = useState<string>(initialTitle);
    const [description, setDescription] = useState<string>(initialDescription);
    const [image, setImage] = useState<File | string>(initialImageUrl);
    const [tagInput, setTagInput] = useState<string>("");
    const [tags, setTags] = useState<string[]>(initialTags);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [updateTour, { data, isLoading, isError, error }] = useUpdateTourMutation();
    const navigate = useNavigate();

    // title handler
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    // description handler
    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    // image handler
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }

    // tagInput handler
    const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    }

    // handle addTag
    const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "," || e.key === " ") {
            e.preventDefault();

            const trimmedTag = tagInput.trim().toLowerCase();

            if (trimmedTag !== "") {
                const tagExist = tags.find(tag => tag === trimmedTag);

                if (tagExist)
                    return setErrorMessage(`"${tagExist}" tag name is already exist.`);

                if (trimmedTag.length > 20)
                    return setErrorMessage("Tag name is too long.");

                if (trimmedTag.length < 3)
                    return setErrorMessage("Tag name is too short.");

                if (tags.length >= 5)
                    return setErrorMessage("Maximum 5 tags allowed. Remove one tag to add another tag.");

                setTags([...tags, trimmedTag]);
                setTagInput("");
                setErrorMessage("");
            }
        }
    }

    // handle remove tag
    const removeTag = (removalTag: string) => {
        const updatedTags = tags.filter(tag => tag !== removalTag);
        setTags(updatedTags);
        setErrorMessage("");
    }

    // form submit handler
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // form validation
        if (!title)
            return setErrorMessage('Please enter title.');

        if (!description)
            return setErrorMessage('Please enter description.');

        if (!image)
            return setErrorMessage('Please select an image.');

        if (tags.length < 1)
            return setErrorMessage("Minimum a tag required.");

        if (title.length < 3)
            return setErrorMessage("Title is too short.");

        if (description.length < 3)
            return setErrorMessage("Description is too short.");

        // Create a FormData object and append fields to it
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image as File);
        formData.append("tags", JSON.stringify(tags));

        updateTour({ tourId, formData });
    }

    useEffect(() => {
        if (data) {
            navigate("/dashboard");
        }
        if (error) {
            setErrorMessage("Something went wrong.");
        }
    }, [data, error, navigate])

    if (isLoading)
        return <Loader />;

    if (isError)
        return <ErrorMessage message="There is an error occured!" />;

    return (
        <div className="mt-24 pb-8">
            <div className="w-[90%] sm:w-[570px] mx-auto py-5 px-6 shadow-md rounded-lg">
                <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="font-medium text-2xl text-[#6B6F70]">
                        Edit Tour
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title" className="text-lg mb-1 inline-block">Title</label>
                    <input
                        type="title"
                        id="title"
                        placeholder="Enter Title"
                        required
                        value={title}
                        onChange={handleTitleChange}
                        className={inputStyle}
                    />

                    <label htmlFor="description" className="text-lg mb-1 inline-block">Decription</label>
                    <textarea
                        id="description"
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

                    {
                        typeof(image) === "object" ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Selected"
                                className="w-full h-52 object-cover mb-5 rounded-lg"
                            />
                        ) : (
                            <img
                                src={image}
                                alt="Selected"
                                className="w-full h-52 object-cover mb-5 rounded-lg"
                            />
                        )
                    }

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
    )
}