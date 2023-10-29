const validation = (currentPassword: string, newPassword: string): string => {
    if (!currentPassword)
        return "Current password is required.";

    if (!newPassword)
        return "New password is required.";

    if (newPassword.length < 6)
        return "New password should be at least 6 characters long.";

    if (newPassword.length > 40)
        return "New password is too long.";

    if (currentPassword === newPassword)
        return "New password must be different.";

    return "";
}

export default validation;