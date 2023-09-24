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


        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}roomlist`)
            .then((res) => {
                let temp = [];
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].player_first ==='none'){
                        continue
                    }
                    temp.push(
                        <div key={`room${i}`} className='chessRoom'>
                            <div className='roomCheck'>
                                <div style={{display : res.data[i].player_second === 'none' || res.data[i].player_first === profile.nickname ? 'none' : 'block'}} className='checkSign'></div>
                            </div>
                            <div className='roomName'>
                                {res.data[i].roomname}
                            </div>
                            <div className='roomButton' onClick={res.data[i].player_second !== 'none' || res.data[i].player_first === profile.nickname ? ()=>{console.log('불가')} : () => {
                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}enterRoom`, {
                                    data : {
                                        roomid : res.data[i].roomid,
                                        player_second : profile.id,
                                        white : profile.id
                                    }
                                })
                                
                                navigate('/room',{
                                    state : {
                                        profile : profile,
                                        roomInfo : res.data[i]
                                    }
                                })
                            }}>

                            </div>
                        </div>
                    )
                }
                setRoom(temp);
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
    //     "id": "manager",
    //     "nickname": "manager",
    //     "levels": 1,
    //     "lose": 0,
    //     "wins": 0
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
                <Link to='/'>Logout</Link>
            </div>

            <div id='profileBox'>
                <div id='profileOver'>
                    <div id='profileDetail'>
                        {profile.levels}Lv {profile.nickname}
                    </div>
                    <div id='profileRecord'>
                        <div id='levelsBar'>
                            {levels}
                        </div>
                    </div>
                </div>
                <div id='profileUnder'>
                    <input type='button' value='매칭' onClick={() => {}}/>
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
                            if(roomName === '') return
                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}createRoom`, {
                                data : {
                                    id : profile.id,
                                    roomName : roomName
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
                                    nickname : profile.nickname,
                                    commend : event.target.value,
                                    time : time.getFullYear() + '/' + (time.getMonth() + 1) + "/" + time.getDay() + " " +
                                        time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
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