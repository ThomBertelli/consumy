import { storage } from './storage'


function success(response: Response, onSuccess:()=> void) {
    response.json().then((json) => {
        storage.store('token', json.token)
        storage.store('email', json.email)
        onSuccess()
    })
}
function failure(response:Response, onFailure:()=>void) {
    onFailure()
}



function isLoggedIn() {
    return Boolean(storage.get('token'))
}
function signOut(andThen = () =>{}) {
    storage.remove('token')
    storage.remove('email')
    if (typeof (andThen) == 'function') {
        andThen()
    }
}
function currentUser() {
    if (!isLoggedIn()) {
        return null
    }
    return {
        email: storage.get('email')
    }
}

async function signIn(email:String, password:String, onSuccess:()=> void, onFailure:()=> void) {
    console.log("will sing in..")

    const body = {
        login: {
            email: email,
            password: password
        }
    }

    const response = await fetch(
        "http://localhost:3000/sign_in", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) {
            success(response,onSuccess)
        }else{
            failure(response,onFailure)
        }
    })
}


export const auth = {
    signIn,
    isLoggedIn,
    currentUser,
    signOut
}