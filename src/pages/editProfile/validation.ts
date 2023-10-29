const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validation = (firstName: string, lastName: string, email: string): string => {
    if (!firstName)
        return "Firstname is required.";

    if (firstName.length < 3)
        return "Firstname is too short.";

    if (firstName.length > 16)
        return "Firstname is too big.";

    if (!lastName)
        return "Lastname is required.";

    if (lastName.length < 3)
        return "Lastname is too short.";

    if (lastName.length > 16)
        return "Lastname is too big.";

    if (!email)
        return "Email is required.";

    if (!emailValidationPattern.test(email))
        return "Invalid email address.";

    return "";
}

export default validation;