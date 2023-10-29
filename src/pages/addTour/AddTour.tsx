import { ChangeEvent, FormEvent, KeyboardEvent, useState, useEffect } from "react";
import AddTourForm from "../../components/forms/addTourForm/AddTourForm";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import { useCreateTourMutation } from "../../redux/features/api/tourApi/tourApi";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import validation from "./validation";

export default function AddTour() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [tagInput, setTagInput] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [createTour, { isSuccess, isLoading, isError, error }] = useCreateTourMutation();
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

    // handle add tag
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
                    return setErrorMessage("Maximum 3 tags allowed. Remove one tag to add another tag.");

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

        // get frontend form validation error message
        const frontendValidationErrorMessage = validation(title, description, image, tags);

        // set frontend form validation error message
        if (frontendValidationErrorMessage)
            return setErrorMessage(frontendValidationErrorMessage);

        // Create a FormData object and append fields to it
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image as File);
        formData.append("tags", JSON.stringify(tags));

        // create new tour
        createTour(formData);
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }

        if (error) {
            if ("status" in error) {
                // get backend form validation error message
                const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);

                // set backend form validation error message
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [isSuccess, error, navigate])

    if (isLoading)
        return <Loader />;

    if (!isLoading && isError)
        return <ErrorMessage message="There is an error occured!" />;

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
            addTag={addTag}
        />
    )
}