

interface iCreateUserRequestBody {

    name: string,
    email: string,
    admin: boolean,
    active: boolean,
    password: string
}

interface iCreateUserResponseBodyNoPasswor {

    name: string,
    email: string,
    admin: boolean,
    active: boolean,
}

export {iCreateUserRequestBody}