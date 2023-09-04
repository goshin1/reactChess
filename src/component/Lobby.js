import './lobby.css'
import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Lobby(){
    const location = useLocation();
    const profile = location.state.profile;
    const [room, setRoom] = useState([]);
    const [chat, setChat] = useState([]);

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
                for(let i = 0; i < res.data.length; i++){
                    temp.push(
                        <div key={`chat${i}`} className='chatBlock'>
                            {res.data[i].nickname} | {res.data[i].commend}
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
                                <div style={{display : res.data[i].player_second === 'none' ? 'none' : 'block'}} className='checkSign'></div>
                            </div>
                            <div className='roomName'>
                                {res.data[i].roomname}
                            </div>
                            <div className='roomButton'>

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


    return <div id='lobbyBack'>
        <div id='lobby'>
            <div id='lobbyHead'>
                <Link to='/'>Logout</Link>
            </div>

            <div id='profileBox'>
                <div id='profileDetail'>
                    {profile.levels}Lv {profile.nickname}
                </div>
                <div id='profileRecord'>
                    <div id='levelsBar'>
                        {levels}
                    </div>
                </div>
            </div>
            <div id='roomList'>
                {room}
            </div>

            <div id='chessChat' onClick={(event) => {

            }}> 
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
                        if(event.code === 'Enter'){
                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}chat`, {
                                data : {
                                    
                                }
                            })
                        }
                    }}/>
                </div>
            </div>
        </div>
    </div>
}