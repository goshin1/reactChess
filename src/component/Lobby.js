import './lobby.css'
import './popup.css'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';

import axios from 'axios';

export default function Lobby(){
    const location = useLocation();
    const profile = location.state.profile;
    const navigate = useNavigate();
    const [room, setRoom] = useState([]);
    const [chat, setChat] = useState([]);
    const [report, setReport] = useState(0);
    const [board, setBoard] = useState([]);
    // console.log('('+String([1,2,3,4])+')')
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

    useInterval(()=>{
        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}lobbychat`)
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


        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}roomlist`)
            .then((res) => {
                let temp = [];
                let nums = [];
                for(let i = 0; i < res.data.length; i++){
                    const roomInfo = res.data[i];
                    if(roomInfo.player_first ==='none'){
                        continue
                    }
                    nums.push(roomInfo.board_num)
                    temp.push(
                        <div key={`room${i}`} className='chessRoom'>
                            <div className='roomCheck'>
                                <div style={{display : roomInfo.player_second === 'none' && roomInfo.player_first !== profile.id? 'none' : 'block'}} className='checkSign'></div>
                            </div>
                            <div className='roomName'>
                                {roomInfo.roomname}
                            </div>
                            <div className='roomButton' onClick={roomInfo.player_second !== 'none' || roomInfo.player_first === profile.ud ? ()=>{console.log('불가')} : () => {
                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}enterRoom`, {
                                    data : {
                                        roomid : roomInfo.roomid,
                                        player_second : profile.id,
                                        white : profile.id
                                    }
                                })
                                
                                navigate('/room',{
                                    state : {
                                        profile : profile,
                                        roomInfo : {
                                            roomid : roomInfo.roomid,
                                            roomname : roomInfo.roomname,
                                            player_first : roomInfo.player_first,
                                            player_second : profile.id,
                                            black : roomInfo.player_first === roomInfo.black ? roomInfo.player_first : profile.id,
                                            white :  roomInfo.player_first === roomInfo.white ? roomInfo.player_first : profile.id,
                                            ready_first : roomInfo.ready_first,
                                            ready_second : roomInfo.ready_second,
                                            turn : roomInfo.turn,
                                            board_num : roomInfo.board_num,
                                            first_time : roomInfo.first_time,
                                            second_time : roomInfo.second_time
                                        }
                                    }
                                })
                            }}>

                            </div>
                        </div>
                    )
                }
                setRoom(temp);
                setBoard(nums);
            })
    }, 1000)

    // 레벨업 조건 승리수 + (패배수 / 3)가 10, 30, 50, 70, 100으로 완벽히 나눠질때
    // 이때 5레벨까지는 조건이 상승하다가 5레벨 이후는 100으로 고정
    let levels = [];
    for(let i = 0; i < parseInt(profile.levels / 10); i++){
        levels.push(
            <div key={`step${i}`} className='levelStep'></div>
        )
    }


    // {
    //     'id': 'manager',
    //     'nickname': 'manager',
    //     'levels': 1,
    //     'lose': 0,
    //     'wins': 0
    // }

    return <div id='lobbyBack'>
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
        <div id='lobby'>
            <div id='lobbyHead'>
                <div onClick={() => {
                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}logout`, {
                        data : {
                            id : profile.id
                        }
                    })
                    navigate('/')
                }}>Logout</div>
                <div id='matchingBot'>
                        <input type='button' value='연습전' onClick={()=>{
                            let roomName = '연습전';
                            let date = new Date();
                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}createRoom`, {
                                data : {
                                    id : profile.id,
                                    roomName : roomName,
                                    board : "{" + String(board) + "}" === "{}" ? '{0}' : "{" + String(board) + "}",
                                    time : parseInt(date.getTime() / 1000)
                                }
                            }).then((res) => {
                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}insertBot`, {
                                    data : {
                                        roomid : res.data.roomid
                                    }
                                })
                                if(res.data !== 'fail'){
                                    navigate('/room', {
                                        state : {
                                            profile : profile,
                                            roomInfo : res.data
                                        }
                                    });
                                }
                            })
                        }}/>
                    </div>
                <div onClick={() => {
                    navigate('/update', {
                        state : {
                            profile : profile
                        }
                    })
                }}>Update</div>
            </div>

            <div id='profileBox'>
                <div id='profileOver'>
                    <div id='profileDetail'>
                        {profile.levels}Lv {profile.id}
                    </div>
                    
                    <div id='profileRecord'>
                        <div id='levelsBar'>
                            {levels}
                        </div>
                    </div>
                </div>
                <div id='profileUnder'>
                    <input type='button' value='매칭' onClick={() => {
                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}match`)
                            .then((res) => {
                                if(res.data.length === 0){
                                    return
                                }
                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}enterRoom`, {
                                    data : {
                                        roomid : res.data[0].roomid,
                                        player_second : profile.id,
                                        white : profile.id
                                    }
                                })
                                let roomInfo = res.data[0];
                                navigate('/room', {
                                    state : {
                                        profile : profile,
                                        roomInfo : {
                                            roomid : roomInfo.roomid,
                                            roomname : roomInfo.roomname,
                                            player_first : roomInfo.player_first,
                                            player_second : profile.id,
                                            black : roomInfo.player_first === roomInfo.black ? roomInfo.player_first : profile.id,
                                            white :  roomInfo.player_first === roomInfo.white ? roomInfo.player_first : profile.id,
                                            ready_first : roomInfo.ready_first,
                                            ready_second : roomInfo.ready_second,
                                            turn : roomInfo.turn,
                                            board_num : roomInfo.board_num,
                                            first_time : roomInfo.first_time,
                                            second_time : roomInfo.second_time
                                        }
                                    }
                                });
                            })
                    }}/>
                    <input type='button' value='방만들기' onClick={(event) => {
                        if(event.target.parentNode.style.height === '200px'){
                            event.target.parentNode.style.height = '';
                        }else{
                            event.target.parentNode.style.height = '200px';
                        }
                    }}/>
                    <div id='createRoom'>
                        <input type='text' id='roomName' name='roomName' placeholder='방 이름'/>
                        <input type='button' value='생성' onClick={() => {
                            let roomName = document.getElementById('roomName').value;
                            let date = new Date();
                            if(roomName === '') return
                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}createRoom`, {
                                data : {
                                    id : profile.id,
                                    roomName : roomName,
                                    board : "{" + String(board) + "}" === "{}" ? '{0}' : "{" + String(board) + "}",
                                    time : parseInt(date.getTime() / 1000)
                                }
                            }).then((res) => {
                                console.log(res.data)
                                if(res.data !== 'fail'){
                                    navigate('/room', {
                                        state : {
                                            profile : profile,
                                            roomInfo : res.data
                                        }
                                    });
                                }
                            })
                        }}/>
                    </div>
                </div>
            </div>
            <div id='roomList'>
                {room}
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
                                    chatgroup : 0,
                                    commend : event.target.value,
                                    time : time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDay() + ' ' +
                                        time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
                                }
                            })
                            event.target.value = '';
                            return
                        }
                    }}/>
                </div>
            </div>
        </div>
    </div>
}