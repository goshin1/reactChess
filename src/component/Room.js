import './room.css';
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Room(){
    const navigate = useNavigate();
    const location = useLocation();
    const profile = location.state.profile;
    const [roomInfo, setRoomInfo] = useState(location.state.roomInfo);
    const [chat, setChat] = useState([]);
    const [report, setReport] = useState(0);
    const [ready, setReady] = useState([false, false]);
    const [color, setColor] = useState([false, true]);
    const [room, setRoom] = useState();

    // {   profile
    //     "id": "manager",
    //     "nickname": "manager",
    //     "levels": 1,
    //     "lose": 0,
    //     "wins": 0
    // }

    // {   roomInfo
    //     "roomid": 1,
    //     "roomname": "sad",
    //     "player_first": "manager",
    //     "player_second": "none",
    //     "black": "manager",
    //     "white": "none",
    //     "board_num": 1
    // }

    const useInterval = (callback, delay) => {
        const savedCallback = useRef(); 

        useEffect(() => {
            savedCallback.current = callback; 
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current(); 
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id); 
            }
        }, [delay]);
    }

    useInterval(() => {
        if (color[0] !== color[1]){

        }

        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}checkRoom`, {
            data : {
                roomid : roomInfo.roomid
            }
        }).then((res) => {
            setRoomInfo(res.data);
        })

        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}roomchat`, {
            data : {
                chatgroup : roomInfo.roomid
            }
        })
            .then((res) => {
                let temp = [];
                let reTemp = [];
                for(let i = 0; i < res.data.length; i++){
                    reTemp.push(0)
                    temp.push(
                        <div key={`chat${i}`} id={`${res.data[i].chatid}`} className='chatBlock'>
                            <div className='chatName' onClick={(event)=>{
                                // 신고하기
                                let reportNum = event.target.parentNode.getAttribute('id');
                                setReport(Number(reportNum))
                            }}>
                                {res.data[i].nickname}
                            </div>
                            <div className='chatCommend'>
                                {res.data[i].commend}
                            </div>
                            <div className='chatTime'>
                                {res.data[i].time.split(' ')[1]}
                            </div>
                            <div className='chatReport' onClick={()=>{

                            }}>

                            </div>
                        </div>
                    )
                }
                setChat(temp);
            })

        if(ready[0] === true && ready[1] === true){
            if(color[0] !== color[1]){
                if(roomInfo.player_first === roomInfo.black && color[0] === false &&
                    roomInfo.player_second === roomInfo.white && color[1] === true){ 
                        navigate('play', {
                            state : {
                                profile : profile,
                                roomInfo : roomInfo
                            }
                        });
                }else if(roomInfo.player_first === roomInfo.white && color[0] === true &&
                    roomInfo.player_second === roomInfo.black && color[1] === false){
                        navigate('play', {
                            state : {
                                profile : profile,
                                roomInfo : roomInfo
                            }
                        });
                }else if(roomInfo.player_first !== roomInfo.black && color[0] === false &&
                    roomInfo.player_second !== roomInfo.white && color[1] === true){  
                        // 첫번째 플레이어가 검정, 두번째 플레이어가 하양인데 서버에 업데이트가 안 된 경우
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}updateRoom`, {
                            data : {
                                black : roomInfo.player_first,
                                white : roomInfo.player_second
                            }
                        })

                        navigate('play', {
                            state : {
                                profile : profile,
                                roomInfo : roomInfo
                            }
                        });
                }else if(roomInfo.player_first !== roomInfo.white && color[0] === true &&
                    roomInfo.player_second !== roomInfo.black && color[1] === false){
                        // 첫번째 플레이어가 하양, 두번째 플레이어가 검정인데 서버에 업데이트가 안 된 경우
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}updateRoom`, {
                            data : {
                                black : roomInfo.player_second,
                                white : roomInfo.player_first
                            }
                        })

                        navigate('play', {
                            state : {
                                profile : profile,
                                roomInfo : roomInfo
                            }
                        });
                }



            }
        }
    }, [1000]);

    const black = {
        backgroundColor : 'rgb(57, 57, 57)',
        color : 'rgb(206, 206, 206)',
        border : '1px solid rgb(206, 206, 206)'
    };
    
    const white = {
        backgroundColor : 'rgb(206, 206, 206)',
        color : 'rgb(57, 57, 57)',
        border : '1px solid rgb(57, 57, 57)'
    };

    return <div id='roomBack'>
        <div id='popupback' style={{display : report === 0 ? 'none' : 'block'}}>
            <div id='popup'>
                <p id='reportP'>
                    사유 <input id='chatReportChoice' list={`chatReport${report}`}/>  
                    <datalist id={`chatReport${report}`}>
                        <option>욕설</option>
                        <option>광고</option>
                        <option>기타</option>
                    </datalist>
                </p>
                <input type='text' id='reportReason' name='reportReason'/>
                <p id='reportP'>
                    <input type='button' value='접수' onClick={()=>{
                        let choice = document.getElementById('chatReportChoice').value;
                        let reason = document.getElementById('reportReason').value;
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}reportchat`, {
                            data : {
                                report : report, 
                                choice : choice,
                                reason : reason
                            }
                        })

                        setReport(0)
                    }}/>
                    <input type='button' value='닫기' onClick={()=>{setReport(0)}}/>
                </p>
            </div>
        </div>
        <div id='room'>
            <div id='roomHead'>
                <div id='roomTitle'>초보환영</div>
                <input id='exitRoom' type='button' onClick={() => {
                    console.log(roomInfo)
                    
                }}/>
            </div>
            <div id='selectSetting'>
                <div id='selectBoard'>
                    <div id='selBoard' style={{backgroundImage : `url('../imgs/board/chessBack.png')`}}></div>
                </div>
                <div id='selectPiece'>
                    <div id='selPiece' style={{backgroundImage : `url('../imgs/piece/knight_piece.png')`}}></div>
                </div>
            </div>


            <div className='players' id='playerFirst'>
                <div className='playerName'>12Lv 닉네임</div>
                <input type='button' className='chessColor' style={color[0] === false ? black : white}
                    onClick={(event)=>{setColor([!color[0], color[1]])}} value={color[0] === false ? '흑' : '백'}
                    disabled={roomInfo.player_first !== profile.id}/>
                <input className='chessReady' type='button' style={ready[0] === false ? black : white}
                    onClick={(event)=>{ 
                        setReady([!ready[0], ready[1]])
                    }} value={ready[0] === false ? '준비' : '준비완료'}
                    disabled={roomInfo.player_first !== profile.id}/>
            </div>

            <div className='players' id='playerSecond'>
                <div className='playerName'>12Lv 닉네임</div>
                <input type='button' className='chessColor' style={color[1] === false ? black : white} 
                    onClick={(event)=>{setColor([color[0], !color[1]])}} value={color[1] === false ? '흑' : '백'}
                    disabled={roomInfo.player_second !== profile.id}/>
                <input className='chessReady' type='button' style={ready[1] === false ? black : white}
                    onClick={(event)=>{ 
                        setReady([ready[0], !ready[1]]) 
                    }} value={ready[1] === false ? '준비' : '준비완료'}
                    disabled={roomInfo.player_second !== profile.id}/>
            </div>


            <div id='chessChat'> 
                <div id='sizeSwitch' onClick={() => {
                    if(document.getElementById('chessChat').style.height === '280px'){
                        document.getElementById('chessChat').style.height = '180px';
                        document.getElementById('chatList').style.height = '100px';
                    }else{
                        document.getElementById('chessChat').style.height = '280px';
                        document.getElementById('chatList').style.height = '200px';
                    }
                    

                }}></div>
                <div id='chatList'>
                    {chat}
                </div>
                <div id='chatInsert'>
                    <input type='text' name='chat' onKeyUp={(event) => {
                        if(event.currentTarget.value === '')
                            return
                        if(event.code === 'Enter'){
                            let time = new Date();
                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}chat`, {
                                data : {
                                    id : profile.id,
                                    chatgroup : roomInfo.roomid,
                                    nickname : profile.nickname,
                                    commend : event.target.value,
                                    time : time.getFullYear() + '/' + (time.getMonth() + 1) + "/" + time.getDay() + " " +
                                        time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
                                }
                            })
                            event.target.value='';
                            return
                        }
                    }}/>
                </div>
            </div>
        </div>
    </div>
}