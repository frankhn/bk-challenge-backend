export const verificationCode = () => {
    return `${Math.floor(Math.random() * 100000) + 1000
        }${Math.random().toString(36).substr(2, 3).toLocaleUpperCase()}`
}


export const slugify = (name = '') => {
    return `${name.replace(/ /g, "_")}${Math.floor(Math.random() * 10000)}`
}