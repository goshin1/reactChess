import { createSlice } from "@reduxjs/toolkit";

/*
chess 게임에서만 사용할 슬라이스
- 게임마다 초기화한다.

*/

export const chessSlice = createSlice({
    name : 'chess',
    initialState : {
        chessBoardState : {
            'black-phone-1' : {
                x : 1,
                y : 0,
                img : 'black-phone.png'
            },
            'black-phone-2' : {
                x : 1,
                y : 1,
                img : 'black-phone.png'
            },
            'black-phone-3' : {
                x : 1,
                y : 2,
                img : 'black-phone.png'
            },
            'black-phone-4' : {
                x : 1,
                y : 3,
                img : 'black-phone.png'
            },
            'black-phone-5' : {
                x : 1,
                y : 4,
                img : 'black-phone.png'
            },
            'black-phone-6' : {
                x : 1,
                y : 5,
                img : 'black-phone.png'
            },
            'black-phone-7' : {
                x : 1,
                y : 6,
                img : 'black-phone.png'
            },
            'black-phone-8' : {
                x : 1,
                y : 7,
                img : 'black-phone.png'
            }
        }
    },
    reducers : {

    }
})

export default chessSlice.reducer;