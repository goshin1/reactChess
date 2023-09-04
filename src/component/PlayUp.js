import './play.css'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { move_chess } from './movement';
import axios from 'axios';

export default function PlayUp(){
    
    const [chessBoard, setChessBoard] = useState([]);
    const [boardP, setBoardP] = useState();
    const [drag, setDrag] = useState(); // 드래그 이벤트 시 무슨 기물인지
    const [parent, setParent] = useState(); // 드래그 중인 기물의 본인 위치를 기록 
    const [click, setClick] = useState(); // 드래그 영역에 다른 기물을 두는 것을 방지하기 위한 
    const [time, setTime] = useState(0); // 턴 시간 측정

    const imgs_key = {
        'black_phone_1' : 'black-phone.png',
        'black_phone_2' : 'black-phone.png',
        'black_phone_3' : 'black-phone.png',
        'black_phone_4' : 'black-phone.png',
        'black_phone_5' : 'black-phone.png',
        'black_phone_6' : 'black-phone.png',
        'black_phone_7' : 'black-phone.png',
        'black_phone_8' : 'black-phone.png',
        'black_knight_1' : 'black-knight.png',
        'black_knight_2' : 'black-knight.png',
        'black_bishop_1' : 'black-bishop.png',
        'black_bishop_2' : 'black-bishop.png',
        'black_look_1' : 'black-look.png',
        'black_look_2' : 'black-look.png',
        'black_king' : 'black-king.png',
        'black_queen' : 'black-queen.png',
        'white_phone_1' : 'white-phone.png',
        'white_phone_2' : 'white-phone.png',
        'white_phone_3' : 'white-phone.png',
        'white_phone_4' : 'white-phone.png',
        'white_phone_5' : 'white-phone.png',
        'white_phone_6' : 'white-phone.png',
        'white_phone_7' : 'white-phone.png',
        'white_phone_8' : 'white-phone.png',
        'white_knight_1' : 'white-knight.png',
        'white_knight_2' : 'white-knight.png',
        'white_bishop_1' : 'white-bishop.png',
        'white_bishop_2' : 'white-bishop.png',
        'white_look_1' : 'white-look.png',
        'white_look_2' : 'white-look.png',
        'white_king' : 'white-king.png',
        'white_queen' : 'white-queen.png'
    }

    let title = [
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


    const wareCheck = () => {   // 말의 위치가 다른 경우(가끔 이동하고 나서 기존 위치의 남을 때)
        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}test`)
            .then((res) => {
                let wares = res.data;
                setBoardP(wares);
                let wares_keys = Object.keys(wares)
                for(let i = 0; i < wares_keys.length; i++){
                    if(wares_keys[i] === 'board_num')
                        continue
                    if(document.getElementById(wares_keys[i]).parentNode.getAttribute('id').replace('chessCol', '') !== wares[wares_keys[i]]){
                        document.getElementById(wares_keys[i]).parentNode.textContent = '';
                    }
                    
                }
            })
    }

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

    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}test`)
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
                                console.log(drag)
                                if(drag !== click) return;
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소

                                    if(event.currentTarget.children[0] !== undefined){
                                        // console.log("두는 곳에 있는 기물 : " + event.currentTarget.children[0].getAttribute('id'));
                                        // console.log("두려는 기물 " + drag.getAttribute('id'))

                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = drag.getAttribute('id');
                                        if(drag.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender
                                                }
                                            })
                                        }
                                    }
                                    
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : drag.getAttribute('id'),
                                            start  : start,
                                            end : end
                                        }
                                    })
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
                                }
                            }} onDoubleClick={(event) => {
                                
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let parent = click.parentNode;
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소

                                    if(event.currentTarget.children[0] !== undefined){
                                        // console.log("두는 곳에 있는 기물 : " + event.currentTarget.children[0].getAttribute('id'));
                                        // console.log("두려는 기물 " + drag.getAttribute('id'))

                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = click.getAttribute('id');
                                        if(click.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender
                                                }
                                            })
                                        }
                                    }
                                    
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : click.getAttribute('id'),
                                            start  : start,
                                            end : end
                                        }
                                    })
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
                                }
                            }}></div>
                        )
                    }else{
                        temp.push(
                            <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol' id={`chessCol${i + 1}-${j + 1}`}
                            onDrop={(event) => {
                                console.log(drag)
                                if(drag !== click) return;
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let parent = click.parentNode;
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                    if(event.currentTarget.children[0] !== undefined){

                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = drag.getAttribute('id');
                                        
                                        if(drag.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender
                                                }
                                            })
                                        }
                                    }
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : drag.getAttribute('id'),
                                            start  : start,
                                            end : end
                                        }
                                    })
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
                                }
                                
                            }} onDoubleClick={(event) => {
                                
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let parent = click.parentNode;
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소

                                    if(event.currentTarget.children[0] !== undefined){
                                        // console.log("두는 곳에 있는 기물 : " + event.currentTarget.children[0].getAttribute('id'));
                                        // console.log("두려는 기물 " + drag.getAttribute('id'))

                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = click.getAttribute('id');
                                        if(click.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender
                                                }
                                            })
                                        }
                                    }
                                    
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : click.getAttribute('id'),
                                            start  : start,
                                            end : end
                                        }
                                    })
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
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
                                        if(event.currentTarget.children[0] !== undefined){

                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = drag.getAttribute('id');
                                        
                                        if(drag.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender
                                                }
                                            })
                                        }
                                    }
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                            data : {
                                                target : drag.getAttribute('id'),
                                                start  : start,
                                                end : end
                                            }
                                        })
                                        setTimeout(() => {}, 100);
                                        wareCheck();
                                        setDrag(undefined)
                                        setParent(undefined)
                                        chessClear()
                                    }
                                }} onDoubleClick={(event) => {
                                
                                    if(event.currentTarget.style.backgroundColor === 'red'){
                                        let parent = click.parentNode;
                                        let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                        let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
    
                                        if(event.currentTarget.children[0] !== undefined){
                                            // console.log("두는 곳에 있는 기물 : " + event.currentTarget.children[0].getAttribute('id'));
                                            // console.log("두려는 기물 " + drag.getAttribute('id'))
    
                                            const defender = event.currentTarget.children[0].getAttribute('id');
                                            const attacker = click.getAttribute('id');
                                            if(click.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')){
                                                axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                    data : {
                                                        attackerP : end,
                                                        defenderP : '0-0',
                                                        attacker : attacker,
                                                        defender : defender
                                                    }
                                                })
                                            }
                                        }
                                        
                                        axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                            data : {
                                                target : click.getAttribute('id'),
                                                start  : start,
                                                end : end
                                            }
                                        })
                                        setTimeout(() => {}, 100);
                                        wareCheck();
                                        setDrag(undefined)
                                        setParent(undefined)
                                        chessClear()
                                    }
                                }}></div>
                        )
                    }else{
                        temp.push(
                            <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol' id={`chessCol${i + 1}-${j + 1}`}
                            onDrop={(event) => {
                                console.log(drag)
                                if(drag !== click) return;
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                    if(event.currentTarget.children[0] !== undefined){

                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = drag.getAttribute('id');
                                        
                                        if(drag.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender
                                                }
                                            })
                                        }
                                    }
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : drag.getAttribute('id'),
                                            start  : start,
                                            end : end
                                        }
                                    })
                                    // event.currentTarget.insertBefore(parent.firstChild, event.currentTarget.firstChild)
                                    
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
                                }
                            }} onDoubleClick={(event) => {
                                
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let parent = click.parentNode;
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소

                                    if(event.currentTarget.children[0] !== undefined){
                                        // console.log("두는 곳에 있는 기물 : " + event.currentTarget.children[0].getAttribute('id'));
                                        // console.log("두려는 기물 " + drag.getAttribute('id'))

                                        const defender = event.currentTarget.children[0].getAttribute('id');
                                        const attacker = click.getAttribute('id');
                                        if(click.getAttribute('id').includes('black') && event.currentTarget.children[0].getAttribute('id').includes('white')){
                                            axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}attack`, {
                                                data : {
                                                    attackerP : end,
                                                    defenderP : '0-0',
                                                    attacker : attacker,
                                                    defender : defender
                                                }
                                            })
                                        }
                                    }
                                    
                                    axios.post(`${process.env.REACT_APP_ROUTER_CHESS_HOST}moveTest`, {
                                        data : {
                                            target : click.getAttribute('id'),
                                            start  : start,
                                            end : end
                                        }
                                    })
                                    setTimeout(() => {}, 100);
                                    wareCheck();
                                    setDrag(undefined)
                                    setParent(undefined)
                                    chessClear()
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
                if(parent.childElementCount === 0){
                    const obj = document.createElement('div');
                    obj.setAttribute('class', 'chessMen content')
                    obj.setAttribute('id', keys[i]);
                    obj.setAttribute('draggable', true);
                    obj.setAttribute('key', keys[i])
                    for(let j = 0; j < title.length; j++){
                        if(keys[i].includes(title[j])){
                            obj.addEventListener('click', () => {
                                move_chess[title[j]](parent, obj, setClick)
                            })
                            break
                        }
                    }
                    obj.style.backgroundImage = `url(../imgs/${imgs_key[keys[i]]})`;
                    document.getElementById(`chessCol${p[0]}-${p[1]}`).appendChild(obj)
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
            if(parent.childElementCount === 0){
                const obj = document.createElement('div');
                obj.setAttribute('class', 'chessMen content')
                obj.setAttribute('id', keys[i]);
                obj.setAttribute('draggable', true);
                obj.setAttribute('key', keys[i])
                for(let j = 0; j < title.length; j++){
                    if(keys[i].includes(title[j])){
                        obj.addEventListener('click', () => {
                            move_chess[title[j]](parent, obj, setClick)
                        })
                        break
                    }
                }
                obj.style.backgroundImage = `url(../imgs/${imgs_key[keys[i]]})`;
                document.getElementById(`chessCol${p[0]}-${p[1]}`).appendChild(obj)
            }
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
    }


    document.addEventListener('drag', event => {
    })


    document.addEventListener('dragstart', event => {
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
        setTime(time + 1);
    }, 1000)

    if(time > 60){
        setTime(0)
    }

    return <div id='play'>
        <div id='timeBox'> 
            {10} : {time}
        </div>
        <div id='chessBoard'>
            {chessBoard}
        </div>
        <input type='button' id='stopBtn' value='Stop' onClick={()=>{
            
        }}/>
    </div>
}