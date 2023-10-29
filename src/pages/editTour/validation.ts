const validation = (title: string, description: string, image: File | string, tags: string[]): string => {
    if (!title)
        return 'Please enter title.';

    if (!description)
        return 'Please enter description.';

    if (!image)
        return 'Please select an image.';

    if (tags.length < 1)
        return "Minimum a tag is required.";

    if (title.length < 3)
        return "Title is too short.";

    if (title.length > 55)
        return "Title is too long.";

    if (description.length < 100)
        return "Description is too short. Minimum 100 characters required.";

    if (description.length > 10000)
        return "Description is too long. Maximum 10000 characters allowed.";

    return "";
}

export default validation;