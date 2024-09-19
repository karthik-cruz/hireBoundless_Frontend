import { END_POINTS } from "./urls";
import { readByIdApi } from "./action";

const getUser = async (data) => {
    return await readByIdApi(END_POINTS.getUser,data)
}

export { getUser }