import './login.css';
import './popup.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Login(){
    const [popup, setPopup] = useState(0)
    const navigate = useNavigate();

    const popupMessage = {
        1 : '아이디를 입력해주세요.',
        2 : '비밀번호를 입력해주세요.',
        3 : '잘못된 로그인 정보입니다.\n 다시 입력해주세요.'
    }

    return <div id="insertBack">
        <div id='popupback' style={{display : popup === 0 ? 'none' : 'block'}}>
            <div id='popup'>
                <p>{popupMessage[popup]}</p>
                <input type='button' value='닫기' onClick={()=>{setPopup(0)}}/>
            </div>
        </div>

        <div id="insertForm">
            <div id="moveLogo">
                <div id="moveCircle"></div>
            </div>        
            <div id="headLogo">
                ReactCh
            </div>
            <input className="inputBlock" type="text" name="id" placeholder='Id'/>
            <input className="inputBlock" type="password" name="password" placeholder='Pwd'/>
            <input className='inputBlock' type='button' value='Login' onClick={() => {
                let id = document.getElementsByName('id')[0].value;
                let pwd = document.getElementsByName('password')[0].value;
                if(id === ''){
                    setPopup(1);
                    return
                }
                if(pwd === ''){
                    setPopup(2)
                    return
                }
                
                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}login`, {
                    data : {
                        id : id,
                        pwd : pwd
                    }
                }).then((res) => {
                    if(res.data !== 'fail'){
                        navigate('/lobby', {
                            state : {
                                profile : res.data
                            }
                        })
                        return
                    }
                    setPopup(3)
                    return
                })
            }}/>
            <Link to='/sign' className="inputBlock">Sign</Link>
        </div>


    </div>
}