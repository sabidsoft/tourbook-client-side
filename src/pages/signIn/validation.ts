const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validation = (email: string, password: string): string => {
    if (!email)
        return "Email is required.";

    if (!emailValidationPattern.test(email))
        return "Invalid email address.";

    if (!password)
        return "Password is required.";

    return "";
}

export default validation;