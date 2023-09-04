import './play.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Play(){
    const [test, setTest] = useState(0);
    const [boardP, setBoardP] = useState();
    const [drag, setDrag] = useState();
    const [parent, setParent] = useState();
    const [focus, setFocus] = useState();

    const chessCreate = () => {
        if(boardP !== undefined){
            let temp = []
            const keys = Object.keys(boardP)
            
            for(let i = 0; i < keys.length; i++){
                if(keys[i] === 'board_num')
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
                                move_chess[title[j]](parent, obj)
                            })
                            break
                        }
                    }
                    obj.style.backgroundImage = `url(../imgs/${imgs_key[keys[i]]})`;
                    document.getElementById(`chessCol${p[0]}-${p[1]}`).appendChild(obj)
                }
            }
        }
    }


    // 체스 말 생성
    const initBoard = [];

    for(let i = 0; i < 8; i++){
        let temp = [];
        for(let j = 0; j < 8; j++){
            if((i + 1) % 2 !== 0){
                if((j + 1) % 2 === 0){
                    temp.push(
                        <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol'
                        id={`chessCol${i + 1}-${j + 1}`} style={{background : 'rgb(108, 77, 77)'}}
                        onDrop={(event) => {
                            if(event.currentTarget.style.backgroundColor === 'red'){
                                let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                console.log(parent.children)
                                let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                console.log(start + " : " + end)
                                axios.post(`${process.env.REACT_APP_ROUTER_HOST}moveTest`, {
                                    data : {
                                        target : drag.getAttribute('id'),
                                        start  : start,
                                        end : end
                                    }
                                })
                                // event.currentTarget.insertBefore(parent.firstChild, event.currentTarget.firstChild)
                                setDrag(undefined)
                                setParent(undefined)
                                axios.post(`${process.env.REACT_APP_ROUTER_HOST}test`)
                                    .then((res) => {
                                        setBoardP(res.data);
                                        setTimeout(300);
                                        piecesClear();
                                    })
                            }
                        }}></div>
                    )
                }else{
                    temp.push(
                        <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol' id={`chessCol${i + 1}-${j + 1}`}
                        onDrop={(event) => {
                            if(event.currentTarget.style.backgroundColor === 'red'){
                                let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                console.log(start + " : " + end)
                                axios.post(`${process.env.REACT_APP_ROUTER_HOST}moveTest`, {
                                    data : {
                                        target : drag.getAttribute('id'),
                                        start  : start,
                                        end : end
                                    }
                                })
                                // event.currentTarget.insertBefore(parent.firstChild, event.currentTarget.firstChild)
                                setDrag(undefined)
                                setParent(undefined)
                                axios.post(`${process.env.REACT_APP_ROUTER_HOST}test`)
                                    .then((res) => {
                                        setBoardP(res.data);
                                        setTimeout(300);
                                        piecesClear();
                                    })
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
                                if(event.currentTarget.style.backgroundColor === 'red'){
                                    let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                    let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                    console.log(start + " : " + end)
                                    axios.post(`${process.env.REACT_APP_ROUTER_HOST}moveTest`, {
                                        data : {
                                            target : drag.getAttribute('id'),
                                            start  : start,
                                            end : end
                                        }
                                    })
                                    // event.currentTarget.insertBefore(parent.firstChild, event.currentTarget.firstChild)
                                    setDrag(undefined)
                                    setParent(undefined)
                                    axios.post(`${process.env.REACT_APP_ROUTER_HOST}test`)
                                        .then((res) => {
                                            setBoardP(res.data);
                                            setTimeout(300);
                                            piecesClear();
                                        })
                                }
                            }}></div>
                    )
                }else{
                    temp.push(
                        <div key={`chessCol${i + 1}-${j + 1}`} className='chessCol' id={`chessCol${i + 1}-${j + 1}`}
                        onDrop={(event) => {
                            if(event.currentTarget.style.backgroundColor === 'red'){
                                let start = parent.getAttribute('id').replace('chessCol', '') // 원래 있던 장소
                                let end = event.currentTarget.getAttribute('id').replace('chessCol', '') // 이동하려는 장소
                                console.log(start + " : " + end)
                                axios.post(`${process.env.REACT_APP_ROUTER_HOST}moveTest`, {
                                    data : {
                                        target : drag.getAttribute('id'),
                                        start  : start,
                                        end : end
                                    }
                                })
                                // event.currentTarget.insertBefore(parent.firstChild, event.currentTarget.firstChild)
                                setDrag(undefined)
                                setParent(undefined)
                                axios.post(`${process.env.REACT_APP_ROUTER_HOST}test`)
                                    .then((res) => {
                                        setBoardP(res.data);
                                        setTimeout(300);
                                        piecesClear();
                                    })
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

    const chessClear = () => {  // 체스판 색상

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

    const piecesClear = () => { // 말을 옮기고 나서 전에 있던 장소에 지워지지 않아서 사용
        // 체스 판을 돌면서 boardP의 정보와 일치하지 않는 기물을 제거
        console.log('clear')
        for(let z = 0; z < title.length; z++){
            for(let i = 1; i <= 8; i++){
                for(let j = 1; j < 8; j++){
                    let name = `chessCol${i}-${j}`;
                    let target = document.getElementById(name);
                    if(target.childNodes.length > 0){
                        console.log(boardP[target.firstChild.getAttribute('id')] === `${i}-${j}`)
                        if(boardP[target.firstChild.getAttribute('id')] !== `${i}-${j}`){
                            document.getElementById(name).textContent = '';

                            break
                        }
                    }
                }
            }
        }

    }

    const move_chess = {    // 각 말별로 이동 규칙 : 이동 규칙이나 범위가 각각 다르기 때문에
        'black_phone' : (parent, target) => {
        
            const position = parent.getAttribute('id').replace('chessCol','').split('-')
            const crossRight = document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`);
            const crossLeft = document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`);


            setFocus(position);
            chessClear();
            if(position[0] === '2'){    // 처음 움직이는 폰일 경우
                if(document.getElementById(`chessCol3-${Number(position[1])}`).children.length === 0){
                    document.getElementById(`chessCol3-${Number(position[1])}`).style.background = 'red';
                }
                if(document.getElementById(`chessCol4-${Number(position[1])}`).children.length === 0){
                    document.getElementById(`chessCol4-${Number(position[1])}`).style.background = 'red';
                }
            } else if(position[0] === '8'){ // 마지막 라인에 갔을 때 말 바꾸기

            } else if((crossRight.children.length === 1 && crossRight.children[0].getAttribute('id').includes('white')) || (crossLeft.children.length === 1 && crossLeft.children[0].getAttribute('id').includes('white'))) {
                // 대각선 상의 상대 말이 있을 경우
                

            } else {    // 그외의 경우

            }
            
            
        },
        'black_look' : (target) => {},
        'black_knight' : (target) => {},
        'black_bishop' : (target) => {},
        'black_queen' : (target) => {},
        'black_king' : (target) => {},
        'white_phone' : (target) => {},
        'white_look' : (target) => {},
        'white_knight' : (target) => {},
        'white_bishop' : (target) => {},
        'white_queen' : (target) => {},
        'white_king' : (target) => {},
    }

    
    
    document.addEventListener('drag', event => {
    })

    document.addEventListener('dragstart', event => {
        setDrag(event.target);
        setParent(event.target.parentNode);
        event.target.classList.add('dragging');
    })

    document.addEventListener('dragend', event => {
        setDrag(null)
        event.target.classList.remove('dragging')
    })

    document.addEventListener('dragover', event => {
        event.preventDefault();
    }, false)

    document.addEventListener('dragenter', event=>{
        if (event.target.classList.contains("chessCol")) {
            event.target.classList.add("dragover");
            // console.log('enter')
        }
    })

    document.addEventListener('dragleave', event => {
        if (event.target.classList.contains("chessCol")) {
            event.target.classList.remove("dragover");
            // console.log('leave')
        }
    })
    

    chessCreate();
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_ROUTER_HOST}test`)
        .then((res) => {
            setBoardP(res.data);
        })
    },[drag])


    return <div id='play'>
        <div id='timeBox'> 
            {10} : {10}
        </div>
        <div id='chessBoard'>
            {initBoard}
        </div>
        <input type='button' value='Stop' onClick={()=>{
            piecesClear();
        }}/>
    </div>
}