export const formatPhoneNumber = (phoneNumber?: string | null): string => {
    if (!phoneNumber) return ""

    const cleaned = phoneNumber.replace(/[^\d]/g, '')

    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
    }

    return cleaned
}
