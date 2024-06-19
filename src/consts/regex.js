const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    phone: /^\d{9}$/,
    url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    courseAcronym: /^[A-Z]{2}_[A-Z]{2}[0-9]$/,
    regularName: /^[a-zA-Z\s]+$/,
    address: /^[a-zA-Z0-9\s\.,#-]+$/,
    username: /^[a-zA-Z0-9_]{4,24}$/,
    description: /^[a-zA-Z0-9\s\.,#-]{1,200}$/,
    dni: /^[0-9]{8}[A-Z]$/
};

export default regex;