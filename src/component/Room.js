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
    const [ready, setReady] = useState([roomInfo.ready_first === 1 ? true : false, roomInfo.ready_second === 1 ? true : false]);
    const [color, setColor] = useState([roomInfo.player_first === roomInfo.black ? false : true, roomInfo.player_second === roomInfo.black ? false : true]); // false는 흑, true는 백
    const [room, setRoom] = useState();
    const [ban, setBan] = useState(0);
    
    // console.log(roomInfo);

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
                                {res.data[i].id}
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
        
        
        

        setReady([roomInfo.ready_first === 1 ? true : false, roomInfo.ready_second === 1 ? true : false]);
        setColor([roomInfo.player_first === roomInfo.black ? false : true, roomInfo.player_second === roomInfo.black ? false : true])
        
        if(ready[0] === true && ready[1] === true){
            let endTime = parseInt(new Date().getTime() / 1000);
            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}timeUpdate`, {
                data : {
                    who : profile.id === roomInfo.player_first ? 1 : 2,
                    roomid : roomInfo.roomid,
                    endTime : endTime
                }
            })
            navigate('/play', {
                state : {
                    profile : profile,
                    roomInfo : roomInfo
                }
            })
        }
    }, [500]);
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
                    if(roomInfo.player_second === profile.id){ // 두번째 플레이어로서 나갈 경우
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}exitRoom`, {
                            data : {
                                player_first : roomInfo.player_first,
                                player_second : 'none',
                                roomid : roomInfo.roomid,
                                board_num : roomInfo.board_num
                            }
                        })
                    }else if(roomInfo.player_first === profile.id && roomInfo.player_second !== 'none'){ // 첫 번째 플레이어고 
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}exitRoom`, {
                            data : {
                                player_first : 'none',
                                player_second : roomInfo.player_second,
                                roomid : roomInfo.roomid,
                                board_num : roomInfo.board_num
                            }
                        })
                    }else if(roomInfo.player_first === profile.id && roomInfo.player_second === 'none'){
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}exitRoom`, {
                            data : {
                                player_first : 'none',
                                player_second : 'none',
                                roomid : roomInfo.roomid,
                                board_num : roomInfo.board_num
                            }
                        })
                    }
                    navigate('/lobby', {
                        state : {
                            profile : profile
                        }
                    })
                    return                    
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
                <div className='playerName'>
                    {roomInfo.player_first === profile.id ? profile.id : roomInfo.player_first}
                </div>

                <input type='button' className='chessColor' style={color[0] === false ? black : white}
                    onClick={(event)=>{
                        let black = roomInfo.black;
                        let white = roomInfo.white;
                        if(white === 'none' && black !== 'none'){
                            if(black === roomInfo.player_first){
                                white = roomInfo.player_second;
                            }else if(black === roomInfo.player_second){
                                white = roomInfo.player_first
                            }
                        }else if(black === 'none' && white !== 'none'){
                            if(white === roomInfo.player_first){
                                black = roomInfo.player_second
                            }else if(white === roomInfo.player_second){
                                black = roomInfo.player_first
                            }
                        }
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}colorChange`, {
                            data : {
                                black : white,
                                white : black,
                                roomid : roomInfo.roomid
                            }
                        })
                    }} value={
                        color[0] === false ? '흑' : '백'}
                    disabled={roomInfo.player_first !== profile.id}/>
                
                <input className='chessReady' type='button' style={ready[0] === false ? black : white}
                    onClick={(event)=>{ 
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}ready`, {
                            data : {
                                who : 1,
                                ready : ready[0] === true ? 0 : 1,
                                roomid : roomInfo.roomid
                            }
                        })
                    }} value={ready[0] === false ? '준비' : '준비완료'}
                    disabled={roomInfo.player_first !== profile.id}/>
            </div>



            <div className='players' id='playerSecond'>
                <div className='playerName' onClick={profile.id !== roomInfo.player_first ? () => {} : () => {
                    if(roomInfo.player_second === 'none')
                        return
                    if(ban === 1)
                        return
                    setBan(1)
                }}>
                    {roomInfo.player_second === profile.id ? profile.id : roomInfo.player_second}
                    <div id='banPopup' style={ban === 1 ? {
                        marginLeft : '0px',
                        opacity : 100
                    } : {
                        marginLeft : '-1300px',
                        opacity : 0
                    }}>
                        강퇴하시겠습니까?
                        <input type='button' value='닫기' onClick={() => {
                            setBan(0)
                        }}/>
                        <input type='button' value='강퇴' onClick={() => {
                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}ban`, {
                                data : {
                                    roomid : roomInfo.roomid
                                }
                            })
                            setBan(0)
                        }}/>
                    </div>
                </div>
                <input type='button' className='chessColor' style={color[1] === false ? black : white} 
                    value={color[1] === false ? '흑' : '백'}
                    disabled={true}/>
                <input className='chessReady' type='button' style={ready[1] === false ? black : white}
                    onClick={(event)=>{ 
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}ready`, {
                            data : {
                                who : 2,
                                ready : ready[1] === true ? 0 : 1,
                                roomid : roomInfo.roomid
                            }
                        })
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