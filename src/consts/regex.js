const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    phone: /^\d{10}$/,
    url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    courseAcronym: /^[A-Z]{2}_[A-Z]{2}[0-9]$/,
    regularName: /^[a-zA-Z\s]+$/,
    address: /^[a-zA-Z0-9\s\.,#-]+$/,
    username: /^[a-zA-Z0-9_]{4,16}$/
};

export default regex;