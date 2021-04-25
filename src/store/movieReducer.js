import { object } from "prop-types";

    const MOVIE_INIT = 'MOVIE_INIT';


    // ACTİON CREATOR
    export function movieInit(movie = {}){
        // ACTİON
        return {
            type : MOVIE_INIT,
            payload : movie
        }
    }

    // REDUCER : reducerin görevi bir önceki state i alıp yeni state e çevirir.

    export default function movieReducer(state = {}, action){
        switch(action.type){
            case MOVIE_INIT:
                return Object.assign({}, action.payload);
            default :
                return state;
        }
    }

    