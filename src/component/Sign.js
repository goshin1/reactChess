import axios from 'axios';
import './sign.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Sign(){
    const navigate = useNavigate();
    const [popup, setPopup] = useState(0);
    const [duplic, setDuplic] = useState('');
    const popupMessage = {
        1 : '아이디를 입력해주세요.',
        2 : '비밀번호를 입력해주세요.',
        3 : '비밀번호 확인란을 입력해주세요',
        4 : '이메일을 입력해주세요.',
        5 : '비밀번호가 일치하지 않습니다',
        6 : '이메일양식이 맞지 않습니다',
        7 : '이미있는 아이디입니다'
    }

    return <div id="insertBack">
    <div id="insertForm">
        <div id='popupback' style={{display : popup === 0 ? 'none' : 'block'}}>
            <div id='popup'>
                <p id='popupP'>{popupMessage[popup]}</p>
                <input type='button' value='닫기' onClick={()=>{setPopup(0)}}/>
            </div>
        </div>

        <div id="moveLogo">
            <div id="moveCircle"></div>
        </div>        
        <div id="headLogo">
            ReactChs
        </div>
        <input className="inputBlock" type="text" name="id" placeholder='Id'/>
        <input className="inputBlock" type="password" name="password" placeholder='Pwd'/>
        <input className="inputBlock" type="password" name="passwordCh" placeholder='Pwd Ch'/>
        <input className="inputBlock" type="text" name="email" placeholder='E-mail'/>
        <input className="inputBlock" type='button' value='Sign' onClick={()=>{
            let id = document.getElementsByName('id')[0].value;
            let pwd = document.getElementsByName('password')[0].value;
            let pwdch = document.getElementsByName('passwordCh')[0].value;
            let email = document.getElementsByName('email')[0].value;
            if(id === ''){
                setPopup(1)
                return
            }
            if(pwd === ''){
                setPopup(2)
                return
            }
            if(pwdch === ''){
                setPopup(3)
                return
            }
            if(email === ''){
                setPopup(4)
                return
            }
            if(pwd !== pwdch){
                setPopup(5)
                return
            }
            if(email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.indexOf('@') + 3 > email.indexOf('.')){
                setPopup(6)
                return
            }

            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}duplic`, {
                data : {
                    id
                }
            }).then((res) => {
                setDuplic(res.data);
            })
            console.log(duplic)
            if(duplic === 'fail'){
                setPopup(7)
                return
            }

            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}sign`, {
                data : {
                    id : id,
                    pwd : pwd,
                    email : email
                }
            })

            navigate('/');
        }}/>
    </div>


</div>
}