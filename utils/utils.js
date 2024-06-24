import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 15).then((hash) => {
        console.log("Password: " + password)
        console.log("Hash: " + hash)
        return hash
    }).catch((error) => {
        return undefined
    })
}

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash).then(res => {
        console.log(res)
        return true
    })
    .catch(err => {
        console.error(err)
        return false
    }) 
}