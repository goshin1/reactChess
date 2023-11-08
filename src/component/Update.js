import './update.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

export default function Update(){
    const location = useLocation();
    const navigate = useNavigate();

    const profile = location.state.profile;

    const [popup, setPopup] = useState(0);
    const popupMessage = {
        1 : '아이디를 입력해주세요.',
        2 : '비밀번호를 입력해주세요.',
        3 : '비밀번호 확인란을 입력해주세요',
        4 : '이메일을 입력해주세요.',
        5 : '이메일양식이 맞지 않습니다',
        6 : '이미있는 아이디입니다',
        7 : '비밀번호가 맞지 않습니다.'
    }

    console.log(profile)

    return <div id='insertBack'>
        <div id='popupback' style={{display : popup === 0 ? 'none' : 'block'}}>
            <div id='popup'>
                <p id='popupP'>{popupMessage[popup]}</p>
                <input type='button' value='닫기' onClick={()=>{setPopup(0)}}/>
            </div>
        </div>
        <div id='insertForm'>
            <div id="moveLogo">
                <div id="moveCircle"></div>
            </div>        
            <div id="headLogo">
                Update
            </div>
            <input className="inputBlock" type="text" name="id" placeholder='Id' defaultValue={profile.id} disabled/>
            <input className="inputBlock" type="password" name="password" placeholder='Original Pwd'/>
            <input className="inputBlock" type="password" name="passwordCh" placeholder='Change Pwd'/>
            <input className="inputBlock" type="text" name="email" placeholder='E-mail' defaultValue={profile.email}/>
            <input className="inputBlock" type='button' value='Update' onClick={()=>{
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
                if(email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.indexOf('@') + 3 > email.indexOf('.')){
                    setPopup(5)
                    return
                }


                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}pwdcheck`, {
                    data : {
                        id : id,
                        pwd : pwd
                    }
                }).then((res) => {
                    console.log(res.data)
                    if(res.data.chk === 0){
                        setPopup(7);
                        return
                    }
                })

                if(popup !== 0){
                    return
                }

                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}update`, {
                    data : {
                        id : id,
                        pwdch : pwdch,
                        email : email
                    }
                })

                navigate('/lobby', {
                    state : {
                        profile : profile
                    }
                });
        }}/>
        </div>
    </div>
}