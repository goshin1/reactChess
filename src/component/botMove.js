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
};


const obj_score = {
    'king' : 100,
    'queen' : 5,
    'look' : 4,
    'bishop' : 3,
    'knight' : 2,
    'phone' : 1,
    '' : 0
}

const obj_names = Object.keys(obj_score)

const bot_move = {
    'black_phone' : (parent, target, setClick) => {
        let pointArr = [];
        setClick(target)
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        let crossRight = undefined;
        let crossLeft = undefined;
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 1 <= 8){
            crossRight = document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`);
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 1 >= 1){
            crossLeft = document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`);
        }
        chessClear();
        if(position[0] === '2'){    // 처음 움직이는 폰일 경우
            if(document.getElementById(`chessCol3-${Number(position[1])}`).children.length === 0){
                pointArr.push([0, `chessCol3-${Number(position[1])}`])
            }
            if(document.getElementById(`chessCol4-${Number(position[1])}`).children.length === 0){
                pointArr.push([0, `chessCol4-${Number(position[1])}`])
            }
        } else if(position[0] === '8' || position[0] === '1'){ // 마지막 라인에 갔을 때 말 바꾸기
            console.log('sucess')
        } else if((crossRight?.children.length === 1 && crossRight?.children[0].getAttribute('id').includes('white')) || (crossLeft?.children.length === 1 && crossLeft?.children[0].getAttribute('id').includes('white'))){
            // 대각선 상의 상대 말이 있을 경우
            if(crossRight !== undefined){
                if(crossRight.children.length === 1 && crossRight.children[0].getAttribute('id').includes('white') && crossRight.getAttribute('id') !== `chessCol${Number(position[0]) + 1}-${Number(position[1])}`){
                    if(crossRight.children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(crossRight.children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`])
                                break;
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`])
                    }
                }
            }
            if(crossLeft !== undefined){
                if(crossLeft.children.length === 1 && crossLeft.children[0].getAttribute('id').includes('white') && crossLeft.getAttribute('id') !== `chessCol${Number(position[0]) + 1}-${Number(position[1])}`){
                    if(crossLeft.children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(crossLeft.children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`])
                    }
                } 
            }
        } else {    // 그외의 경우
            pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1])}`])
        }
        return pointArr;
    },
    'black_look' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        let pointArr = [];
        chessClear();
        for(let i = Number(position[0]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                break
            }
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${i}-${position[1]}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${i}-${position[1]}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[0]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                break
            }
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${i}-${position[1]}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${i}-${position[1]}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[1]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                break
            }
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${position[0]}-${i}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${position[0]}-${i}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[1]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                break
            }
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${position[0]}-${i}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${position[0]}-${i}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }
        return pointArr
    },
    'black_knight' : (parent, target, setClick) => {
        
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        let pointArr = [];
        chessClear();

        // 앞으로 3칸
        if(Number(position[0]) + 3 <= 8 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`])
                    }
                }
        }
        if(Number(position[0]) + 3 <= 8 && Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`])
                    }
                }
        }

        // 뒤로 3칸
        if(Number(position[0]) - 3 >= 1 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`])
                    }
                }
                
        }
        if(Number(position[0]) - 3 >= 1 && Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`])
                    }
                }
                
        }
        

        // 왼쪽으로 3칸
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 3 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`])
                    }
                }
                
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 3 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`])
                    }
                }
                
        }

        // 오른쪽으로 3칸
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 3 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`])
                    }
                }
                
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 3 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`])
                    }
                }
                
        }
        return pointArr
    },
    'black_bishop' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();
        let pointArr = [];
        // 오른쪽 대각선 \방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]],`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`])
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`])
                                break
                            }
                        }
                        break
                } 
                pointArr.push([0, `chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`]);
            }
        }

        // 왼쪽 대각선 /방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`])
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`])
            }
        }
        return pointArr
    },
    'black_queen' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        let pointArr = [];
        chessClear();
        for(let i = Number(position[0]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                break
            }
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${i}-${position[1]}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${i}-${position[1]}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[0]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                break
            }
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${i}-${position[1]}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${i}-${position[1]}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[1]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                break
            }
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${position[0]}-${i}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${position[0]}-${i}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[1]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                break
            }
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${position[0]}-${i}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${position[0]}-${i}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        // 오른쪽 대각선 \방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]],`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`])
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`])
                                break
                            }
                        }
                        break
                } 
                pointArr.push([0, `chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`]);
            }
        }

        // 왼쪽 대각선 /방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`])
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`])
            }
        }
        return pointArr
    },
    'black_king' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();
        let pointArr = [];
        // 위
        if(Number(position[0]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) - 1}-${position[1]}`])
            else if(document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes[0]?.getAttribute('id').includes('white')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${position[1]}`])
                        break
                    }
                }
            }
        }
        // 아래
        if(Number(position[0]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) + 1}-${position[1]}`])
            else if(document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes[0]?.getAttribute('id').includes('white')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${position[1]}`])
                        break
                    }
                }
            }
        }
        // 오른쪽
        if(Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${position[0]}-${Number(position[1]) + 1}`])
            else if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${position[0]}-${Number(position[1]) + 1}`])
                        break
                    }
                }
            }
        }
        // 왼쪽
        if(Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${position[0]}-${Number(position[1]) - 1}`])
            else if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${position[0]}-${Number(position[1]) - 1}`])
                        break
                    }
                }
            }
        }

        // 오른쪽 대각선 위
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`])
            else if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`])
                        break
                    }
                }
            }
        }
        // 오른쪽 대각선 아래
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`])
            else if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`])
                        break
                    }
                }
            }
        }
        // 왼쪽 대각선 위
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`])
            else if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`])
                        break
                    }
                }
            }
        }
        // 왼쪽 대각선 아래
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`])
            else if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`])
                        break
                    }
                }
            }
        }
        return pointArr
    },
    // 흰색 기물
    'white_phone' : (parent, target, setClick) => {
        let pointArr = [];
        setClick(target)
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        let crossRight = undefined;
        let crossLeft = undefined;
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 1 <= 8){
            crossRight = document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`);
        }
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 1 >= 1){
            crossLeft = document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`);
        }
        chessClear();
        if(position[0] === '7'){    // 처음 움직이는 폰일 경우
            if(document.getElementById(`chessCol6-${Number(position[1])}`)?.children === undefined){
                pointArr.push([0, `chessCol6-${Number(position[1])}`])
                
            }
            if(document.getElementById(`chessCol5-${Number(position[1])}`)?.children === undefined){
                pointArr.push([0, `chessCol5-${Number(position[1])}`])
                
            }
        } else if(position[0] === '8' || position[0] === '1'){ // 마지막 라인에 갔을 때 말 바꾸기
            console.log('sucess')
        } else if((crossRight?.children.length === 1 && crossRight?.children[0].getAttribute('id').includes('black')) || (crossLeft?.children.length === 1 && crossLeft?.children[0].getAttribute('id').includes('black'))){
            // 대각선 상의 상대 말이 있을 경우
            if(crossRight !== undefined){
                if(crossRight.children.length === 1 && crossRight.children[0].getAttribute('id').includes('black') && crossRight.getAttribute('id') !== `chessCol${Number(position[0]) + 1}-${Number(position[1])}`){
                    if(crossRight.children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(crossRight.children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`])
                                break;
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`])
                        
                    }
                }
            }
            if(crossLeft !== undefined){
                if(crossLeft.children.length === 1 && crossLeft.children[0].getAttribute('id').includes('black') && crossLeft.getAttribute('id') !== `chessCol${Number(position[0]) + 1}-${Number(position[1])}`){
                    if(crossLeft.children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(crossLeft.children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`])
                    }
                } 
            }
        } else {    // 그외의 경우
            pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1])}`])
        }
        
        return pointArr
    },
    'white_look' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        let pointArr = [];
        chessClear();
        for(let i = Number(position[0]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                break
            }
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${i}-${position[1]}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${i}-${position[1]}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[0]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                break
            }
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${i}-${position[1]}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${i}-${position[1]}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[1]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white')){
                break
            }
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${position[0]}-${i}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${position[0]}-${i}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[1]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white')){
                break
            }
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${position[0]}-${i}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${position[0]}-${i}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }
        return pointArr
    },
    'white_knight' : (parent, target, setClick) => {
        
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        let pointArr = [];
        chessClear();

        // 앞으로 3칸
        if(Number(position[0]) + 3 <= 8 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`])
                    }
                }
        }
        if(Number(position[0]) + 3 <= 8 && Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`])
                    }
                }
        }

        // 뒤로 3칸
        if(Number(position[0]) - 3 >= 1 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`])
                    }
                }
                
        }
        if(Number(position[0]) - 3 >= 1 && Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`])
                    }
                }
                
        }
        

        // 왼쪽으로 3칸
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 3 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`])
                    }
                }
                
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 3 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`])
                    }
                }
                
        }

        // 오른쪽으로 3칸
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 3 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`])
                    }
                }
                
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 3 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).childNodes.length === 0){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).children.length > 0){
                        for(let i = 0; i < 7; i++){
                            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).children[0].getAttribute('id').includes(obj_names[i])){
                                pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`])
                                break
                            }
                        }
                    }else{
                        pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`])
                    }
                }
                
        }
        return pointArr
    },
    'white_bishop' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();
        let pointArr = [];
        // 오른쪽 대각선 \방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]],`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`])
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`])
                                break
                            }
                        }
                        break
                } 
                pointArr.push([0, `chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`]);
            }
        }
        // 왼쪽 대각선 /방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`])
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`])
            }
        }
        return pointArr
    },
    'white_queen' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        let pointArr = [];
        chessClear();
        for(let i = Number(position[0]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                break
            }
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${i}-${position[1]}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${i}-${position[1]}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[0]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                break
            }
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${i}-${position[1]}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${i}-${position[1]}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[1]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white')){
                break
            }
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${position[0]}-${i}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${position[0]}-${i}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        for(let i = Number(position[1]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white')){
                break
            }
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                for(let j = 0; j < 7; j++){
                    if(document.getElementById(`chessCol${position[0]}-${i}`).children[0].getAttribute('id').includes(obj_names[j])){
                        pointArr.push([obj_score[obj_names[j]], `chessCol${position[0]}-${i}`])
                        break
                    }
                }
                break
            }
            pointArr.push([0, `chessCol${position[0]}-${i}`])
        }

        // 오른쪽 대각선 \방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]],`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`])
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`])
                                break
                            }
                        }
                        break
                } 
                pointArr.push([0, `chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`]);
            }
        }
        // 왼쪽 대각선 /방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`])
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white')){
                        break
                }else if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                    document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black')){
                        for(let j = 0; j < 7; j++){
                            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(obj_names[j])){
                                pointArr.push([obj_score[obj_names[j]], `chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`])
                                break
                            }
                        }
                        break
                }
                pointArr.push([0, `chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`])
            }
        }
        return pointArr
    },
    'white_king' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();
        let pointArr = [];
        // 위
        if(Number(position[0]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) - 1}-${position[1]}`])
            else if(document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes[0]?.getAttribute('id').includes('black')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${position[1]}`])
                        break
                    }
                }
            }
        }
        // 아래
        if(Number(position[0]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) + 1}-${position[1]}`])
            else if(document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes[0]?.getAttribute('id').includes('black')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${position[1]}`])
                        break
                    }
                }
            }
        }
        // 오른쪽
        if(Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${position[0]}-${Number(position[1]) + 1}`])
            else if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${position[0]}-${Number(position[1]) + 1}`])
                        break
                    }
                }
            }
        }
        // 왼쪽
        if(Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${position[0]}-${Number(position[1]) - 1}`])
            else if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${position[0]}-${Number(position[1]) - 1}`])
                        break
                    }
                }
            }
        }

        // 오른쪽 대각선 위
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`])
            else if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`])
                        break
                    }
                }
            }
        }
        // 오른쪽 대각선 아래
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`])
            else if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`])
                        break
                    }
                }
            }
        }
        // 왼쪽 대각선 위
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`])
            else if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`])
                        break
                    }
                }
            }
        }
        // 왼쪽 대각선 아래
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes?.length === 0)
                pointArr.push([0, `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`])
            else if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black')){
                for(let i = 0; i < 7; i++){
                    if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute(obj_names[i])){
                        pointArr.push([obj_score[obj_names[i]], `chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`])
                        break
                    }
                }
            }
        }
        return pointArr
    }
    
}

const attackPoint = (position, color) => {

    let opponent = color === 'black' ? 'white' : 'black'

    // 폰, 킹 : 자신을 중심으로 3x3의 상대가 있는지
    let dx = [0, -1, -1, -1, 0, 1, 1];
    let dy = [1, 1, 0, -1, -1, -1, 0];
    for(let i = 0; i < 7; i++){
        if(8 >= Number(position[0]) + dx[i] >= 1 && 8 >= Number(position[1]) + dy[i] >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + dx[i]}-${Number(position[1]) + dy[i]}`)?.children !== undefined && document.getElementById(`chessCol${Number(position[0]) + dx[i]}-${Number(position[1]) + dy[i]}`)?.children.length > 0){
                if(document.getElementById(`chessCol${Number(position[0]) + dx[i]}-${Number(position[1]) + dy[i]}`).children[0].getAttribute('id').includes(opponent)){
                    console.log('part1')
                    return -1
                }
            }
        }
    }

    // 나이트
    dx = [-2, -1, 1, 2, 2, -1, 1, -2];
    dy = [1, 2, 2, 1, -1, -2, -2, -1];
    for(let i = 0; i < 7; i++){
        if(8 >= Number(position[0]) + dx[i] >= 1 && 8 >= Number(position[1]) + dy[i] >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + dx[i]}-${Number(position[1]) + dy[i]}`)?.children !== undefined && document.getElementById(`chessCol${Number(position[0]) + dx[i]}-${Number(position[1]) + dy[i]}`)?.children.length > 0){
                if(document.getElementById(`chessCol${Number(position[0]) + dx[i]}-${Number(position[1]) + dy[i]}`).children[0].getAttribute('id').includes(opponent) &&
                    document.getElementById(`chessCol${Number(position[0]) + dx[i]}-${Number(position[1]) + dy[i]}`).children[0].getAttribute('id').includes('knight')){
                    console.log('part2')
                    return -1
                }
            }
        }
    }


    // 룩 : 룩, 비숍의 범위는 퀸과 같기에 둘을 확인하면서 확인이 된다.
    for(let i = Number(position[0]) + 1; i <= 8; i++){
        if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes(opponent) &&
            document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('look')){
            console.log('part3')
            return -1
        }
    }
    
    for(let i = Number(position[0]) - 1; i > 0; i--){
        console.log("part4 search : " + document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id'))
        if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes(opponent) &&
            document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('look')){
            console.log('part4')
            return -1
        }
    }

    for(let i = Number(position[1]) + 1; i <= 8; i++){
        if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes(opponent) &&
            document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('look')){
            console.log('part5')
            return -1
        }
    }

    for(let i = Number(position[1]) - 1; i > 0; i--){
        if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes(opponent) &&
            document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('look')){
            console.log('part6')
            return -1
        }
    }

    // 비숍
    for(let i = 1; i <= 8; i++){
        if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(opponent) &&
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('bishop')){
                    console.log('part7')
                    return -1
            }
        }
    }
    for(let i = 1; i <= 8; i++){
        if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(opponent) &&
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('bishop')){
                    console.log('part8')
                    return -1
            }
        }
    }
    for(let i = 1; i <= 8; i++){
        if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 &&
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes(opponent) &&
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('bishop')){
                    console.log('part9')
                    return -1
            }
        }
    }

    for(let i = 1; i <= 8; i++){
        if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 &&
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes(opponent) &&
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('bishop')){
                    console.log('part10')
                    return -1
            }
        }
    }

    return 0;
}

export {bot_move, attackPoint};