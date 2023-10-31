const validation = (title: string, description: string, image: File | string, tags: string[]): string => {
    if (!title)
        return 'Please enter title.';

    if (title.length < 3)
        return "Title is too short.";

    if (title.length > 55)
        return "Title is too long.";

    if (!description)
        return 'Please enter description.';

    if (description.length < 30)
        return "Description is too short. Minimum 30 characters required.";

    if (description.length > 3000)
        return "Description is too long. Maximum 3000 characters allowed.";

    if (!image)
        return 'Please select an image.';

    if (tags.length < 1)
        return "Minimum a tag is required.";

    return "";
}

export default validation;