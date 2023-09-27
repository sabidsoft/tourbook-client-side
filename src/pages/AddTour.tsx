import { ChangeEvent, FormEvent, KeyboardEvent, useState, useEffect } from "react";
import AddTourForm from "../components/AddTourForm";
import { useCreateTourMutation } from "../features/api/tourApiEndpoints";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function PostTour() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [tagInput, setTagInput] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [createTour, { data, isLoading, error }] = useCreateTourMutation();
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

    // tags handlers start
    const addTagInputIntoTags = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();

            const trimmedTag = tagInput.trim().toUpperCase();

            if (trimmedTag !== "") {
                const tagExist = tags.find(tag => tag === trimmedTag);

                if (tagExist)
                    return setErrorMessage(`"${tagExist}" tag name is already exist.`);

                if (trimmedTag.length > 20)
                    return setErrorMessage("Tag name is too long.");

                if (trimmedTag.length < 3)
                    return setErrorMessage("Tag name is too short.");

                if (tags.length > 10)
                    return setErrorMessage("Maximum 10 tags allowed. Remove one tag to add another tag.");

                setTags([...tags, trimmedTag]);
                setTagInput("");
                setErrorMessage("");
            }
        }
    }

    const removeTag = (removalTag: string) => {
        const updatedTags = tags.filter(tag => tag !== removalTag);
        setTags(updatedTags);
        setErrorMessage("");
    }
    // tags handlers end

    // form submit handler
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // form validation
        if (!title || !description || !image)
            return setErrorMessage('Please fill out all fields correctly.');

        if (tags.length < 3)
            return setErrorMessage("Minimum 3 tags required.");

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

        createTour(formData);
    }

    useEffect(() => {
        if (data) {
            navigate("/");
        }
        if (error) {
            setErrorMessage("Something went wrong.");
        }
    }, [data, error, navigate])

    if (isLoading)
        return <Loader />;

    return (
        <AddTourForm
            title={title}
            description={description}
            image={image}
            tags={tags}
            tagInput={tagInput}
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            handleTitleChange={handleTitleChange}
            handleDescriptionChange={handleDescriptionChange}
            handleImageChange={handleImageChange}
            removeTag={removeTag}
            handleTagInputChange={handleTagInputChange}
            addTagInputIntoTags={addTagInputIntoTags}
        />
    )
}