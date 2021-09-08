const TOKEN_PREFIX = "QpwL5tke4Pnpja7X"
export async function getUserId(token) {
    const arr = token.split(TOKEN_PREFIX)
    if(arr.length != 2){
        throw new Error('Invalid Token')
    }
    return arr[1]

}

