const validation = (password: string, confirmPassword: string): string => {
    if (!password)
        return "Password is required.";

    if (password.length < 6)
        return "Password should be at least 6 characters long.";

    if (password.length > 40)
        return "Password is too long.";

    if (!confirmPassword)
        return "Confirm password is required.";

    if (password !== confirmPassword)
        return "Password and confirm password didn't match.";

    return "";
}

export default validation;