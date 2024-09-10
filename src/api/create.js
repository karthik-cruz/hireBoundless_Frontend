import { END_POINTS } from "./urls";
import { createByApi } from "./action";

const loginUser = async (data) => {
    return await createByApi(END_POINTS.login, data)
}

const signupUser = async (data) => {
    return await createByApi(END_POINTS.signup, data)
}



export {
    loginUser,
    signupUser
}