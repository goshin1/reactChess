import './play.css'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { move_chess } from './movement';
import axios from 'axios';

export default function PlayUp(){
    const navigate = useNavigate();
    const location = useLocation();
    const boardNum = location.state.boardNum;
    const profile = location.state.profile;
    
    const [roomInfo, setRoomInfo] = useState(location.state.roomInfo);
    const [chessBoard, setChessBoard] = useState([]);
    const [boardP, setBoardP] = useState();
    const [drag, setDrag] = useState(); // 드래그 이벤트 시 무슨 기물인지
    const [parent, setParent] = useState(); // 드래그 중인 기물의 본인 위치를 기록 
    const [click, setClick] = useState(); // 드래그 영역에 다른 기물을 두는 것을 방지하기 위한 
    const [time, setTime] = useState(0); // 턴 시간 측정
    const [ban, setBan] = useState(roomInfo.player_first === profile.id ? roomInfo.ready_second : roomInfo.ready_first); // 상대방의 탈주를 확인
    const [promotion, setPromotion] = useState('none');
    const [selection, setSelection] = useState(0);
    const [objCount, setObjCount] = useState([0,0,0,0]);
    // 체스판 정보를 불러올 때 자신의 색상의 맞는 나이트,비숍,룩,퀸에 숫자를 세서 배열에 값을 저장한다.
    // 그리고 나서 promotion을 진행할 때 objCount를 참고해서 이름을 정한다. 예를 들어 첫번쨰(나이트)가 2이면
    // 더하기 1을 한 뒤 이름을 black_knight_3으로 만들어서 승급을 진행한다.


    const imgs_key = {
        'black_phone' : 'black-phone.png',
        'black_knight' : 'black-knight.png',
        'black_bishop' : 'black-bishop.png',
        'black_look' : 'black-look.png',
        'black_king' : 'black-king.png',
        'black_queen' : 'black-queen.png',
        'white_phone' : 'white-phone.png',
        'white_knight' : 'white-knight.png',
        'white_bishop' : 'white-bishop.png',
        'white_look' : 'white-look.png',
        'white_king' : 'white-king.png',
        'white_queen' : 'white-queen.png'
    }

    const title = [
        'black_phone',
        'black_look',
        'black_knight',
        'black_bishop',
        'black_queen',
        'black_king',
        'white_phone',
        'white_look',
        'white_knight',
        'white_bishop',
        'white_queen',
        'white_king'
    ];

    const promotion_title = {
        0 : roomInfo.black === profile.id ? 'black_knight' : 'white_knight',
        1 : roomInfo.black === profile.id ? 'black_bishop' : 'white_bishop',
        2 : roomInfo.black === profile.id ? 'black_look' : 'white_look',
        3 : roomInfo.black === profile.id ? 'black_queen' : 'white_queen'
    }


    if(boardP !== undefined){   
        if(boardP.white_king === '0-0'){
            if(roomInfo.white === profile.id){   // 패배
                if(roomInfo.player_first === profile.id){
                    navigate('/exit', {
                        state : {
                            res : 1,
                            profile : profile,
                            roomInfo : roomInfo,
                            who : 1,
                            ban : false
                        }
                    })
                }else{
                    navigate('/exit', {
                        state : {
                            res : 1,
                            profile : profile,
                            roomInfo : roomInfo,
                            who : 2,
                            ban : false
                        }
                    })
                }
            }else if(roomInfo.white !== profile.id){ // 승리
                if(roomInfo.player_first === profile.id){
                    navigate('/exit', {
                        state : {
                            res : 2,
                            profile : profile,
                            roomInfo : roomInfo,
                            who : 1,
                            ban : false
                        }
                    })
                }else{
                    navigate('/exit', {
                        state : {
                            res : 2,
                            profile : profile,
                            roomInfo : roomInfo,
                            who : 2,
                            ban : false
                        }
                    })
                }
            }
            
        }else if(boardP.black_king === '0-0'){
            if(roomInfo.black === profile.id){   // 패배
                if(roomInfo.player_first === profile.id){
                    navigate('/exit', {
                        state : {
                            res : 1,
                            profile : profile,
                            roomInfo : roomInfo,
                            who : 1,
                            ban : false
                        }
                    })
                }else{
                    navigate('/exit', {
                        state : {
                            res : 1,
                            profile : profile,
                            roomInfo : roomInfo,
                            who : 2,
                            ban : false
                        }
                    })
                }
            }else if(roomInfo.black !== profile.id){ // 승리
                if(roomInfo.player_first === profile.id){
                    navigate('/exit', {
                        state : {
                            res : 2,
                            profile : profile,
                            roomInfo : roomInfo,
                            who : 1,
                            ban : false
                        }
                    })
                }else{
                    navigate('/exit', {
                        state : {
                            res : 2,
                            profile : profile,
                            roomInfo : roomInfo,
                            who : 2,
                            ban : false
                        }
                    })
                }
            }
            
        }
    }
    const wareCheck = () => {   // 말의 위치가 다른 경우(가끔 이동하고 나서 기존 위치의 남을 때)
        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}test`, {
            data : {
                board_num : roomInfo.board_num,
                viewname : roomInfo.viewname
            }
        })
            .then((res) => {
                let wares = res.data;
                setBoardP(wares);
                let wares_keys = Object.keys(wares)
                for(let i = 0; i < wares_keys.length; i++){
                    if(wares_keys[i] === 'board_num' || document.getElementById(wares_keys[i]) === null)
                        continue
                    if(document.getElementById(wares_keys[i]).parentNode.getAttribute('id').replace('chessCol', '') !== wares[wares_keys[i]]){
                        document.getElementById(wares_keys[i]).parentNode.textContent = '';
                    }
                    
                }
            })
    }
    // if(boardP !== undefined){
    //     console.log(Object.keys(boardP))
    // }
    

    const chessClear = () => {  // 드래그 범위 변경 시 체스판 색상 초기화

        for(let i = 1; i <= 8; i++){
            for(let j = 1; j <= 8; j++){
                if(i % 2 !== 0){
                    if(j % 2 === 0){
                        document.getElementById(`chessCol${i}-${j}`).style.background = 'rgb(108, 77, 77)'
                    }else{
                        document.getElementById(`chessCol${i}-${j}`).style.background = 'none'
                    }
                
                }else if(i % 2 === 0){
                    if(j % 2 !== 0){
                        document.getElementById(`chessCol${i}-${j}`).style.background = 'rgb(108, 77, 77)'
                    }else{
                        document.getElementById(`chessCol${i}-${j}`).style.background = 'none'
                    }
                }
            }
        }
    }

    const promotionCheck = () => {  // 폰의 승급 시 원하는 기물이 현재 몇개인지 알아본 뒤 그에 맞는 컬럼명을 제작해서 넘기기
        if(boardP === undefined) return 'fail';
        const pName = {
            0 : 'knight_',
            1 : 'bishop_',
            2 : 'look_',
            3 : 'queen_'
        }
        let name = roomInfo.black === profile.id ? 'black_' + pName[selection] : 'white_' + pName[selection];
        let start = roomInfo.black === profile.id ? 1 : 17;
        let end = roomInfo.black === profile.id ? 17 : 33;
        let cnt = 0;
        let names = Object.keys(boardP)
        for(let i = start; i < end; i++){
            if(names[i].includes(name)){
                cnt += 1
            }
        }
        cnt += 1
        return name + String(cnt)

    };


    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}test`, {
            data : {
                board_num : roomInfo.board_num,
                viewname : roomInfo.viewname
            }
        })
        .then((res) => {
            setBoardP(res.data);
        })

        // 체스 판 생성
        let initBoard = [];

        for(let i = 0; i < 8; i++){
            let temp = [];
            for(let j = 0; j < 8; j++){
                if((i + 1) % 2 !== 0){
                    if((j + 1) % 2 === 0){
                        temp.push(
                            <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol'
                            id={`chessCol${i + 1}-${j + 1}`} style={{background : 'rgb(108, 77, 77)'}}
                            onDrop={(event) => {
                                if(drag !== click) return;
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                    const moveTime = parseInt(new Date().getTime() / 1000);
                                    console.log(event.currentTarget.children)
                                    if(event.currentTarget.children[0] !== undefined){
                                        
                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = drag.getAttribute('id');
                                        if((drag.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')) ||
                                            (drag.getAttribute('id').includes('white') && event.currentTarget.children[0].getAttribute('id').includes('black'))){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender,
                                                    viewname : roomInfo.viewname,
                                                    first_time : moveTime,
                                                    second_time : moveTime
                                                }
                                            })
                                        }
                                    }
                                    
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : drag.getAttribute('id'),
                                            start  : start,
                                            end : end,
                                            viewname : roomInfo.viewname,
                                            first_time : moveTime,
                                            second_time : moveTime
                                        }
                                    })
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                                        data : {
                                            turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                                            roomid : roomInfo.roomid,
                                            first_time : moveTime,
                                            second_time : moveTime
                                        }
                                    })
                                    setTime(0)
                                }
                            }} onDoubleClick={(event) => {
                                
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let parentClick = click.parentNode;
                                    console.log(parentClick)
                                    let start = parentClick.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                    const moveTime = parseInt(new Date().getTime() / 1000);
                                    console.log(event.currentTarget.children)
                                    if(event.currentTarget.children[0] !== undefined){
                                        
                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = click.getAttribute('id');
                                        if((click.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')) ||
                                            (click.getAttribute('id').includes('white') && event.currentTarget.children[0].getAttribute('id').includes('black'))){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender,
                                                    viewname : roomInfo.viewname,
                                                    first_time : moveTime,
                                                    second_time : moveTime
                                                }
                                            })
                                        }
                                    }
                                    
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : click.getAttribute('id'),
                                            start  : start,
                                            end : end,
                                            viewname : roomInfo.viewname,
                                            first_time : moveTime,
                                            second_time : moveTime
                                        }
                                    })
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                                        data : {
                                            turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                                            roomid : roomInfo.roomid,
                                            first_time : moveTime,
                                            second_time : moveTime
                                        }
                                    })
                                    setTime(0)
                                }
                            }}></div>
                        )
                    }else{
                        temp.push(
                            <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol' id={`chessCol${i + 1}-${j + 1}`}
                            onDrop={(event) => {
                                if(drag !== click) return;
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                    const moveTime = parseInt(new Date().getTime() / 1000);
                                    console.log(event.currentTarget.children)
                                    if(event.currentTarget.children[0] !== undefined){
                                        
                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = drag.getAttribute('id');
                                        
                                        if((drag.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')) ||
                                            (drag.getAttribute('id').includes('white') && event.currentTarget.children[0].getAttribute('id').includes('black'))){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender,
                                                    viewname : roomInfo.viewname,
                                                    first_time : moveTime,
                                                    second_time : moveTime
                                                }
                                            })
                                        }
                                    }
                                    
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : drag.getAttribute('id'),
                                            start  : start,
                                            end : end,
                                            viewname : roomInfo.viewname,
                                            first_time : moveTime,
                                            second_time : moveTime
                                        }
                                    })
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                                        data : {
                                            turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                                            roomid : roomInfo.roomid,
                                            first_time : moveTime,
                                            second_time : moveTime
                                        }
                                    })
                                    setTime(0)
                                }
                                
                            }} onDoubleClick={(event) => {
                                
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                        let parentClick = click.parentNode;
                                        console.log(parentClick)
                                        let start = parentClick.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                        let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                        const moveTime = parseInt(new Date().getTime() / 1000);
                                        console.log(event.currentTarget.children)
                                        
                                        if(event.currentTarget.children[0] !== undefined){
                                            const defender = event.currentTarget.children[0].getAttribute('id');
                                            const attacker = click.getAttribute('id');
                                            if((click.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')) ||
                                                (click.getAttribute('id').includes('white') && event.currentTarget.children[0].getAttribute('id').includes('black'))){
                                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                    data : {
                                                        attackerP : end,
                                                        defenderP : '0-0',
                                                        attacker : attacker,
                                                        defender : defender,
                                                        viewname : roomInfo.viewname,
                                                        first_time : moveTime,
                                                        second_time : moveTime
                                                    }
                                                })
                                            }
                                        }
                                        
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                            data : {
                                                target : click.getAttribute('id'),
                                                start  : start,
                                                end : end,
                                                viewname : roomInfo.viewname,
                                                first_time : moveTime,
                                                second_time : moveTime
                                            }
                                        })
                                        setTimeout(() => {}, 100);
                                        wareCheck();
                                        setDrag(undefined)
                                        setParent(undefined)
                                        chessClear()
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                                            data : {
                                                turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                                                roomid : roomInfo.roomid,
                                                first_time : moveTime,
                                                second_time : moveTime
                                            }
                                        })
                                        setTime(0)
                                }
                            }}></div>
                        )
                    }
                
                }else if((i + 1) % 2 === 0){
                    if((j + 1) % 2 !== 0){
                        temp.push(
                            <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol'
                                id={`chessCol${i + 1}-${j + 1}`} style={{background : 'rgb(108, 77, 77)'}}
                                onDrop={(event) => {
                                    console.log(drag)
                                    if(drag !== click) return;
                                    if(event.currentTarget.style.backgroundColor === 'red'){
                                        let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                        let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                        const moveTime = parseInt(new Date().getTime() / 1000);
                                        console.log(event.currentTarget.children)
                                        if(event.currentTarget.children[0] !== undefined){
                                            const defender = event.currentTarget.children[0].getAttribute('id');
                                            const attacker = drag.getAttribute('id');
                                            
                                            if((drag.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')) || 
                                                (drag.getAttribute('id').includes('white') && event.currentTarget.children[0].getAttribute('id').includes('black'))){
                                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                    data : {
                                                        attackerP : end,
                                                        defenderP : '0-0',
                                                        attacker : attacker,
                                                        defender : defender,
                                                        viewname : roomInfo.viewname,
                                                        first_time : moveTime,
                                                        second_time : moveTime
                                                    }
                                                })
                                            }
                                    }
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                            data : {
                                                target : drag.getAttribute('id'),
                                                start  : start,
                                                end : end,
                                                viewname : roomInfo.viewname,
                                                first_time : moveTime,
                                                second_time : moveTime
                                            }
                                        })
                                        setTimeout(() => {}, 100);
                                        wareCheck();
                                        setDrag(undefined)
                                        setParent(undefined)
                                        chessClear()
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                                            data : {
                                                turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                                                roomid : roomInfo.roomid,
                                                first_time : moveTime,
                                                second_time : moveTime
                                            }
                                        })
                                        setTime(0)
                                    }
                                }} onDoubleClick={(event) => {
                                    
                                    if(event.currentTarget.style.backgroundColor === 'red'){
                                        let parentClick = click.parentNode;
                                        console.log(parentClick)
                                        let start = parentClick.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                        let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                        const moveTime = parseInt(new Date().getTime() / 1000);
                                        console.log(event.currentTarget.children)
                                        if(event.currentTarget.children[0] !== undefined){
                                            const defender = event.currentTarget.children[0].getAttribute('id');
                                            const attacker = click.getAttribute('id');
                                            if((click.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')) ||
                                                (click.getAttribute('id').includes('white') && event.currentTarget.children[0].getAttribute('id').includes('black'))){
                                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                    data : {
                                                        attackerP : end,
                                                        defenderP : '0-0',
                                                        attacker : attacker,
                                                        defender : defender,
                                                        viewname : roomInfo.viewname,
                                                        first_time : moveTime,
                                                        second_time : moveTime
                                                    }
                                                })
                                            }
                                        }
                                        
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                            data : {
                                                target : click.getAttribute('id'),
                                                start  : start,
                                                end : end,
                                                viewname : roomInfo.viewname,
                                                first_time : moveTime,
                                                second_time : moveTime
                                            }
                                        })
                                        setTimeout(() => {}, 100);
                                        wareCheck();
                                        setDrag(undefined)
                                        setParent(undefined)
                                        chessClear()
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                                            data : {
                                                turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                                                roomid : roomInfo.roomid,
                                                first_time : moveTime,
                                                second_time : moveTime
                                            }
                                        })
                                        setTime(0)
                                    }
                                }}></div>
                        )
                    }else{
                        temp.push(
                            <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol' id={`chessCol${i + 1}-${j + 1}`}
                            onDrop={(event) => {
                                if(drag !== click) return;
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소]]
                                    const moveTime = parseInt(new Date().getTime() / 1000);
                                    console.log(event.currentTarget.children)
                                    if(event.currentTarget.children[0] !== undefined){
                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = drag.getAttribute('id');
                                        
                                        if((drag.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')) ||
                                            (drag.getAttribute('id').includes('white') && event.currentTarget.children[0].getAttribute('id').includes('black'))){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender,
                                                    viewname : roomInfo.viewname,
                                                    first_time : moveTime,
                                                    second_time : moveTime
                                                }
                                            })
                                        }
                                    }
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : drag.getAttribute('id'),
                                            start  : start,
                                            end : end,
                                            viewname : roomInfo.viewname,
                                            first_time : moveTime,
                                            second_time : moveTime
                                        }
                                    })
                                    
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                                        data : {
                                            turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                                            roomid : roomInfo.roomid,
                                            first_time : moveTime,
                                            second_time : moveTime
                                        }
                                    })
                                    setTime(0)
                                }
                            }} onDoubleClick={(event) => {
                                
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                        let parentClick = click.parentNode;
                                        console.log(parentClick)
                                        let start = parentClick.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                        let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                        const moveTime = parseInt(new Date().getTime() / 1000);
                                        console.log(event.currentTarget.children)
                                        if(event.currentTarget.children[0] !== undefined){
                                            
                                            const defender = event.currentTarget.children[0].getAttribute('id');
                                            const attacker = click.getAttribute('id');
                                            if((click.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')) ||
                                                (click.getAttribute('id').includes('white') && event.currentTarget.children[0].getAttribute('id').includes('black'))){
                                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                    data : {
                                                        attackerP : end,
                                                        defenderP : '0-0',
                                                        attacker : attacker,
                                                        defender : defender,
                                                        viewname : roomInfo.viewname,
                                                        first_time : moveTime,
                                                        second_time : moveTime
                                                    }
                                                })
                                            }
                                        }
                                        
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                            data : {
                                                target : click.getAttribute('id'),
                                                start  : start,
                                                end : end,
                                                viewname : roomInfo.viewname,
                                                first_time : moveTime,
                                                second_time : moveTime
                                            }
                                        })
                                        setTimeout(() => {}, 100);
                                        wareCheck();
                                        setDrag(undefined)
                                        setParent(undefined)
                                        chessClear()
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                                            data : {
                                                turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                                                roomid : roomInfo.roomid,
                                                first_time : moveTime,
                                                second_time : moveTime
                                            }
                                        })
                                        setTime(0)
                                }
                            }}></div>
                        )
                    }
                }
            }
            initBoard.push(
                <div key={`chessRow${i + 1}`} className='chessRow'>
                    {temp}
                </div>
            )
            
        }

        // 체스 말 생성
        if(boardP !== undefined){
            let temp = []
            const keys = Object.keys(boardP)
            
            for(let i = 0; i < keys.length; i++){
                if(keys[i] === 'board_num')
                    continue
                if(boardP[keys[i]] === '0-0')
                    continue
                const p = boardP[keys[i]].split('-');
                const parent = document.getElementById(`chessCol${p[0]}-${p[1]}`);
                try{
                    if(parent.childElementCount === 0){
                        const obj = document.createElement('div');
                        obj.setAttribute('class', 'chessMen content')
                        obj.setAttribute('id', keys[i]);
                        obj.setAttribute('draggable', true);
                        obj.setAttribute('key', keys[i])
                        for(let j = 0; j < title.length; j++){
                            if(keys[i].includes(title[j])){

                                

                                obj.addEventListener('click', (event) => {
                                    const position = parent.getAttribute('id').replace('chessCol','').split('-');
                                    console.log(event.target.id.includes('black_phone') && position[0] === '8' && roomInfo.black === profile.id)
                                    console.log(event.target.id.includes('white_phone') && position[0] === '1' && roomInfo.white === profile.id)
                                    if(event.target.id.includes('black_phone') && position[0] === '8' && roomInfo.black === profile.id){
                                        setPromotion('black')
                                        setClick(obj);
                                        return
                                    }
                                    if(event.target.id.includes('white_phone') && position[0] === '1' && roomInfo.white === profile.id){
                                        setPromotion('white')
                                        setClick(obj);
                                        return
                                    }
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}updateGame`, {
                                        data : {
                                            roomid : roomInfo.roomid
                                        }
                                    }).then((res) => {
                                        if(res.data.turn !== profile.id){
                                            return
                                        }
                                        if((event.target.id.includes('white') && res.data.white === profile.id) ||
                                            (event.target.id.includes('black') && res.data.black === profile.id)){
                                                move_chess[title[j]](parent, obj, setClick)
                                                
                                        }
                                    })
                                    // if(roomInfo.turn !== profile.id){
                                    //     return
                                    // }
                                    // if((event.target.id.includes('white') && roomInfo.white === profile.id) ||
                                    //     (event.target.id.includes('black') && roomInfo.black === profile.id)){
                                    //         move_chess[title[j]](parent, obj, setClick)
                                            
                                    // }
                                    
                                    return
                                })
                                break
                            }
                        }
                        let name = keys[i].split('_');
                        obj.style.backgroundImage = `url(../imgs/${imgs_key[name[0] + "_" + name[1]]})`;
                        document.getElementById(`chessCol${p[0]}-${p[1]}`).appendChild(obj)
                    }
                }catch(err){
                    navigate('/play', {
                        state : {
                            profile : profile,
                            roomInfo : roomInfo
                        }
                    })
                }
                
            }
        }
        setChessBoard(initBoard);

    },[, time])

    if(boardP !== undefined){
        let temp = []
        const keys = Object.keys(boardP)
        for(let i = 0; i < keys.length; i++){
            if(keys[i] === 'board_num')
                continue
            if(boardP[keys[i]] === '0-0')
                continue
            const p = boardP[keys[i]].split('-');
            const parent = document.getElementById(`chessCol${p[0]}-${p[1]}`);
            try{
                if(parent.childElementCount === 0){
                    const obj = document.createElement('div');
                    obj.setAttribute('class', 'chessMen content')
                    obj.setAttribute('id', keys[i]);
                    obj.setAttribute('draggable', true);
                    obj.setAttribute('key', keys[i])
                    for(let j = 0; j < title.length; j++){
                        if(keys[i].includes(title[j])){
                            obj.addEventListener('click', (event) => {
                                const position = parent.getAttribute('id').replace('chessCol','').split('-');
                                if(event.target.id.includes('black_phone') && position[0] === '8' && roomInfo.black === profile.id){
                                    setPromotion('black')
                                    setClick(obj);
                                    return;
                                }
                                if(event.target.id.includes('white_phone') && position[0] === '1' && roomInfo.white === profile.id){
                                    setPromotion('white')
                                    setClick(obj);
                                    return;
                                }
                                
                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}updateGame`, {
                                    data : {
                                        roomid : roomInfo.roomid
                                    }
                                }).then((res) => {
                                    if(res.data.turn !== profile.id){
                                        return
                                    }
                                    if((event.target.id.includes('white') && res.data.white === profile.id) ||
                                        (event.target.id.includes('black') && res.data.black === profile.id)){
                                            move_chess[title[j]](parent, obj, setClick)
                                            
                                    }
                                })
                                // if(roomInfo.turn !== profile.id){
                                //     return
                                // }
                                // if((event.target.id.includes('white') && roomInfo.white === profile.id) ||
                                //     (event.target.id.includes('black') && roomInfo.black === profile.id)){
                                //         move_chess[title[j]](parent, obj, setClick)
                                        
                                // }
                                
                                return
                            })
                            break
                        }
                    }
                    let name = keys[i].split('_');
                    obj.style.backgroundImage = `url(../imgs/${imgs_key[name[0]+'_'+name[1]]})`;
                    document.getElementById(`chessCol${p[0]}-${p[1]}`).appendChild(obj)
                }
                for(let z = 0; z < title.length; z++){
                    for(let i = 1; i <= 8; i++){
                        for(let j = 1; j < 8; j++){
                            let name = `chessCol${i}-${j}`;
                            let target = document.getElementById(name);
                            if(target.childNodes.length > 0){
                                if(boardP[target.firstChild.getAttribute('id')] !== `${i}-${j}`){
                                    document.getElementById(name).textContent = '';
                                    break
                                }
                            }
                        }
                    }
                }
            }catch(err){
                navigate('/play', {
                    state : {
                        profile : profile,
                        roomInfo : roomInfo
                    }
                })
            }
        }
    }


    document.addEventListener('drag', event => {
    })


    document.addEventListener('dragstart', event => {
        if(event.target.id.includes('black') && roomInfo.black !== profile.id){
            console.log('block')
            return
        }
        if(event.target.id.includes('white') && roomInfo.white !== profile.id){
            console.log('block')
            return
        }
        setDrag(event.target);
        setParent(event.target.parentNode)
        event.target.classList.add('dragging');
    })

    document.addEventListener('dragend', event => {
        event.target.classList.remove('dragging')
    })

    document.addEventListener('dragover', event => {
        event.preventDefault();
    }, false)

    document.addEventListener('dragenter', event=>{
        if (event.target.classList.contains("chessCol")) {
            event.target.classList.add("dragover");
        }
    })

    document.addEventListener('dragleave', event => {
        if (event.target.classList.contains("chessCol")) {
            event.target.classList.remove("dragover");
        }
    })

    document.onkeydown = (event) => {
        console.log(event)
        if (event.keyCode === 116) {
            event.keyCode= 2;
            return false;
        }
        else if(event.ctrlKey && (event.keyCode === 78 || event.keyCode === 82))
        {
            return false;
        }
    }

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
        
        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}updateGame`, {
            data : {
                roomid : roomInfo.roomid
            }
        }).then((res) => {
            setRoomInfo(res.data);
            setBan(roomInfo.player_first === profile.id ? roomInfo.ready_second : roomInfo.ready_first);
        })
        let waitTime = new Date().getTime() / 1000;
        setTime(roomInfo.turn === roomInfo.player_first ? parseInt(waitTime) - parseInt(roomInfo.first_time) : parseInt(waitTime) - parseInt(roomInfo.second_time))
    }, 1000)

    
    
    if(time > 60 && roomInfo.turn === profile.id){
        let endTime = parseInt(new Date().getTime() / 1000);
        if(roomInfo.player_first === profile.id){
            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                data : {
                    who : 1,
                    turn : roomInfo.player_second,
                    roomid : roomInfo.roomid,
                    first_time : endTime,
                    second_time : endTime
                }
            })
        }else if(roomInfo.player_second === profile.id){
            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                data : {
                    who : 2,
                    turn : roomInfo.player_first,
                    roomid : roomInfo.roomid,
                    first_time : endTime,
                    second_time : endTime
                }
            })
        }
        setTime(0);
    }



    if(time > 80 && roomInfo.turn !== profile.id){
        if(time / 80 > ban){
            if(roomInfo.player_first === profile.id){
                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}banCheck`, {
                    data : {
                        who : 2,
                        ready : roomInfo.ready_second + 1, 
                        roomid : roomInfo.roomid
                    }
                }).then((res) => {
                    setBan(parseInt(res.data))
                })
            }else if(roomInfo.player_second === profile.id){
                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}banCheck`, {
                    data : {
                        who : 1,
                        ready : roomInfo.ready_first + 1,
                        roomid : roomInfo.roomid
                    }
                }).then((res) => {
                    setBan(parseInt(res.data))
                })
            }
        }
    }
    if(ban >= 5){
        if(roomInfo.player_first === profile.id){
            navigate('/exit', {
                state : {
                    res : 2,
                    profile : profile,
                    roomInfo : roomInfo,
                    who : 1,
                    ban : true
                }
            })
        }else if(roomInfo.player_second === profile.id){
            navigate('/exit', {
                state : {
                    res : 2,
                    profile : profile,
                    roomInfo : roomInfo,
                    who : 1,
                    ban : true
                }
            })
        }
    }

    return <div id='play'>
        <div id='promotion' style={{display : roomInfo.turn === profile.id && promotion !== 'none' ? 'block' : 'none' }}>
            <div id='promotionList'>
                <div className='promotionSel'
                    style={{backgroundImage : roomInfo.black === profile.id ? 'url(../imgs/black-knight.png)' : 'url(../imgs/white-knight.png)',
                            backgroundColor : selection === 0 ? 'rgb(246, 238, 227)' : 'rgba(0, 0, 0, 0)'}}
                    onClick={() => setSelection(0)}></div>
                <div className='promotionSel' 
                    style={{backgroundImage : roomInfo.black === profile.id ? 'url(../imgs/black-bishop.png)' : 'url(../imgs/white-bishop.png)',
                    backgroundColor : selection === 1 ? 'rgb(246, 238, 227)' : 'rgba(0, 0, 0, 0)'}}
                    onClick={() => setSelection(1)}></div>
                <div className='promotionSel' 
                    style={{backgroundImage : roomInfo.black === profile.id ? 'url(../imgs/black-look.png)' : 'url(../imgs/white-look.png)',
                    backgroundColor : selection === 2 ? 'rgb(246, 238, 227)' : 'rgba(0, 0, 0, 0)'}}
                    onClick={() => setSelection(2)}></div>
                <div className='promotionSel' 
                    style={{backgroundImage : roomInfo.black === profile.id ? 'url(../imgs/black-queen.png)' : 'url(../imgs/white-queen.png)',
                    backgroundColor : selection === 3 ? 'rgb(246, 238, 227)' : 'rgba(0, 0, 0, 0)'}}
                    onClick={() => setSelection(3)}></div>
            </div>
            <input type='button' value='change' onClick={() => {
                console.log(click.getAttribute('id'))
                let pName = promotionCheck();
                console.log("promotion : " + pName)
                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}promotion`, {
                    data : {
                        viewname : roomInfo.viewname,
                        selection : pName,
                        target : click.getAttribute('id')
                    }
                })
                setTimeout(() => {}, 100);
                const moveTime = parseInt(new Date().getTime() / 1000);
                wareCheck();
                setDrag(undefined)
                setParent(undefined)
                chessClear()
                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}turnChange`, {
                    data : {
                        turn : roomInfo.turn === roomInfo.black ? roomInfo.white : roomInfo.black,
                        roomid : roomInfo.roomid,
                        first_time : moveTime,
                        second_time : moveTime
                    }
                })
                setTime(0)
                setPromotion('none')
                setClick(undefined)
            }}/>
            <input type='button' value='cancel' onClick={() => {setPromotion('none')}}/>
        </div>
        <div id='timeBox'> 
            {roomInfo.turn === profile.id ? time : '상대방의 턴입니다'}
        </div>
        <div id='chessBoard'>
            {chessBoard}
        </div>
        <input type='button' id='stopBtn' value='기권' onClick={()=>{
            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}surrender`, {
                data : {
                    color : roomInfo.black === profile.id ? 'black' : 'white',
                    board_num : roomInfo.board_num
                }
            }) // 기권 처리를 상대방에게 알리기 위해 본인의 킹을 0-0으로 수정
            
            navigate('/exit', {
                state : {
                    res : 1,
                    profile : profile,
                    roomInfo : roomInfo,
                    who : roomInfo.player_first === profile.id ? 1 : 2,
                    ban : false
                }
            })
        }}/>
        
    </div>
}