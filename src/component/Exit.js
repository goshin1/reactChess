import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import './exit.css';

export default function Exit(){
    const location = useLocation();
    const navigate = useNavigate();

    const profile = location.state.profile;
    const roomInfo = location.state.roomInfo;
    const who = location.state.who;

    console.log(location.state)
    const exitMsg = {
        1 : '패배하셨습니다',
        2 : '승리하셨습니다'
    }


    return <div id='exitBack'>
                <div id='resPopup'>
                    <p>{exitMsg[location.state.res]}</p>
                    <input type='button' value='나가기' onClick={() => {
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}gameSet`, {
                            data : {
                                res : location.state.res,
                                id : profile.id
                            }
                        })

                        if(location.state.ban){
                            if(roomInfo.player_first === profile.id){
                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}gameSet`, {
                                    data : {
                                        res : 1,
                                        id : roomInfo.player_second
                                    }
                                })
                            }else{
                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}gameSet`, {
                                    data : {
                                        res : 1,
                                        id : roomInfo.player_first
                                    }
                                })
                            }
                        }

                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}clearRoom`, {
                            data : {
                                roomid : roomInfo.roomid,
                                board_num : roomInfo.board_num,
                                viewname : roomInfo.viewname
                            }
                        })
                        navigate('/lobby', {
                            state : {
                                profile : profile
                            }
                        })
                    }}/>
                </div>
            </div>
}

