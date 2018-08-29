const validateEmail = (address) => {
    //email validation
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,5})$/
    if (reg.test(address) == false)
        return false

    return true
}

const validateLogin = (login) => {
    let reg = /^[a-z]{4,}(?:[._-][a-z\d]+)*$/i
    if (reg.test(login) == false)
        return false

    return true
}
const validateName = (name) => {
    let reg = /^[а-яА-ЯёЁa-zA-Z]+$/
    if (reg.test(name) == false)
        return false

    return true
}

export {validateEmail,validateLogin,validateName}
