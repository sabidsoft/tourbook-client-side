const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validation = (email: string): string => {
    if (!email)
        return "Email is required.";

    if (!emailValidationPattern.test(email))
        return "Invalid email address.";

    return "";
}

export default validation;