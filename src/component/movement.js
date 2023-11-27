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

const move_chess = {    // 각 말별로 이동 규칙 : 이동 규칙이나 범위가 각각 다르기 때문에
    'black_phone' : (parent, target, setClick) => {
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
                document.getElementById(`chessCol3-${Number(position[1])}`).style.background = 'red';
            }
            if(document.getElementById(`chessCol4-${Number(position[1])}`).children.length === 0){
                document.getElementById(`chessCol4-${Number(position[1])}`).style.background = 'red';
            }
        } else if(position[0] === '8' || position[0] === '1'){ // 마지막 라인에 갔을 때 말 바꾸기
            console.log('sucess')
        } else if((crossRight?.children.length === 1 && crossRight?.children[0].getAttribute('id').includes('white')) || (crossLeft?.children.length === 1 && crossLeft?.children[0].getAttribute('id').includes('white'))){
            // 대각선 상의 상대 말이 있을 경우
            if(crossRight !== undefined){
                if(crossRight.children.length === 1 && crossRight.children[0].getAttribute('id').includes('white') && crossRight.getAttribute('id') !== `chessCol${Number(position[0]) + 1}-${Number(position[1])}`){
                    crossRight.style.background = 'red'; 
                }
            }
            if(crossLeft !== undefined){
                if(crossLeft.children.length === 1 && crossLeft.children[0].getAttribute('id').includes('white') && crossLeft.getAttribute('id') !== `chessCol${Number(position[0]) + 1}-${Number(position[1])}`){
                    crossLeft.style.background = 'red'; 
                } 
            }
        } else {    // 그외의 경우
            document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1])}`).style.background = 'red';
        }
    },
    'black_look' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        
        chessClear();
        for(let i = Number(position[0]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black'))
                break
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
        }

        for(let i = Number(position[0]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black'))
                break
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
        }

        for(let i = Number(position[1]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black'))
                break
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
        }

        for(let i = Number(position[1]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black'))
                break
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
        }

    },
    'black_knight' : (parent, target, setClick) => {
        
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        
        chessClear();

        // 앞으로 3칸
        if(Number(position[0]) + 3 <= 8 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        if(Number(position[0]) + 3 <= 8 && Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).style.background = 'red';
        }

        // 뒤로 3칸
        if(Number(position[0]) - 3 >= 1 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        if(Number(position[0]) - 3 >= 1 && Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).style.background = 'red';
        }
        

        // 왼쪽으로 3칸
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 3 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).style.background = 'red';
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 3 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).style.background = 'red';
        }

        // 오른쪽으로 3칸
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 3 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).style.background = 'red';
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 3 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).childNodes[0]?.getAttribute('id').includes('white') ||
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).style.background = 'red';
        }

    },
    'black_bishop' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();

        // 오른쪽 대각선 \방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black'))
                    break
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).style.background = 'red';
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black'))
                    break
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).style.background = 'red';
            }
        }

        // 왼쪽 대각선 /방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black'))
                    break
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).style.background = 'red';
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black'))
                    break
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).style.background = 'red';
            }
        }
        
    },
    'black_queen' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        
        chessClear();
        // 직선 이동
        for(let i = Number(position[0]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black'))
                break
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
        }

        for(let i = Number(position[0]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black'))
                break
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white')){
                document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
        }

        for(let i = Number(position[1]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black'))
                break
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white')){
                document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
        }

        for(let i = Number(position[1]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black'))
                break
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
        }


        // 대각선 이동
        // 오른쪽 대각선 \방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black'))
                    break
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).style.background = 'red';
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black'))
                    break
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).style.background = 'red';
            }
        }

        // 왼쪽 대각선 /방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('black'))
                    break
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).style.background = 'red';
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('black'))
                    break
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).style.background = 'red';
            }
        }
    },
    'black_king' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();

        // 위
        if(Number(position[0]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes[0]?.getAttribute('id').includes('white'))
                document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).style.background = 'red';
        }
        // 아래
        if(Number(position[0]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes[0]?.getAttribute('id').includes('white'))
                document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).style.background = 'red';
        }
        // 오른쪽
        if(Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white'))
                document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        // 왼쪽
        if(Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white'))
                document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).style.background = 'red';
        }

        // 오른쪽 대각선 위
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white'))
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        // 오른쪽 대각선 아래
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('white'))
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        // 왼쪽 대각선 위
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white'))
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).style.background = 'red';
        }
        // 왼쪽 대각선 아래
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('white'))
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).style.background = 'red';
        }

    },
    'white_phone' : (parent, target, setClick) => {
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
        // 폰 코드 수정하기
        chessClear();
        if(position[0] === '7'){    // 처음 움직이는 폰일 경우
            if(document.getElementById(`chessCol6-${Number(position[1])}`).children.length === 0){
                document.getElementById(`chessCol6-${Number(position[1])}`).style.background = 'red';
            }
            if(document.getElementById(`chessCol5-${Number(position[1])}`).children.length === 0){
                document.getElementById(`chessCol5-${Number(position[1])}`).style.background = 'red';
            }
        } else if(position[0] === '8' || position[0] === '1'){ // 마지막 라인에 갔을 때 말 바꾸기
            console.log('sucess')
        } else if((crossRight?.children.length === 1 && crossRight?.children[0].getAttribute('id').includes('black')) || (crossLeft?.children.length === 1 && crossLeft?.children[0].getAttribute('id').includes('black'))){
            // 대각선 상의 상대 말이 있을 경우
            if(crossRight !== undefined){
                if(crossRight.children.length === 1 && crossRight.children[0].getAttribute('id').includes('black') && crossRight.getAttribute('id') !== `chessCol${Number(position[0]) + 1}-${Number(position[1])}`){
                    crossRight.style.background = 'red'; 
                }
            }
            if(crossLeft !== undefined){
                if(crossLeft.children.length === 1 && crossLeft.children[0].getAttribute('id').includes('black') && crossLeft.getAttribute('id') !== `chessCol${Number(position[0]) + 1}-${Number(position[1])}`){
                    crossLeft.style.background = 'red'; 
                } 
            }
        } else {    // 그외의 경우
            document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1])}`).style.background = 'red';
        }
    },
    'white_look' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();
        for(let i = Number(position[0]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white'))
                break
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
        }

        for(let i = Number(position[0]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white'))
                break
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
        }

        for(let i = Number(position[1]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white'))
                break
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
        }

        for(let i = Number(position[1]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white'))
                break
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
        }
    },
    'white_knight' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();

        // 앞으로 3칸
        if(Number(position[0]) + 3 <= 8 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        if(Number(position[0]) + 3 <= 8 && Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) + 3}-${Number(position[1]) - 1}`).style.background = 'red';
        }

        // 뒤로 3칸
        if(Number(position[0]) - 3 >= 1 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        if(Number(position[0]) - 3 >= 1 && Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) - 3}-${Number(position[1]) - 1}`).style.background = 'red';
        }
        

        // 왼쪽으로 3칸
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 3 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 3}`).style.background = 'red';
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 3 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 3}`).style.background = 'red';
        }

        // 오른쪽으로 3칸
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 3 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 3}`).style.background = 'red';
        }
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 3 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).childNodes[0]?.getAttribute('id').includes('black') ||
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).childNodes.length === 0)
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 3}`).style.background = 'red';
        }

    },
    'white_bishop' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();

        // 오른쪽 대각선 \방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white'))
                    break
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).style.background = 'red';
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white'))
                    break
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).style.background = 'red';
            }
        }

        // 왼쪽 대각선 /방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white'))
                    break
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).style.background = 'red';
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white'))
                    break
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).style.background = 'red';
            }
        }
    },
    'white_queen' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        
        chessClear();
        // 직선 이동
        for(let i = Number(position[0]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white'))
                break
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
        }

        for(let i = Number(position[0]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('white'))
                break
            if(document.getElementById(`chessCol${i}-${position[1]}`).children.length > 0 && document.getElementById(`chessCol${i}-${position[1]}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${i}-${position[1]}`).style.background = 'red';
        }

        for(let i = Number(position[1]) + 1; i <= 8; i++){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white'))
                break
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
        }

        for(let i = Number(position[1]) - 1; i > 0; i--){
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('white'))
                break
            if(document.getElementById(`chessCol${position[0]}-${i}`).children.length > 0 && document.getElementById(`chessCol${position[0]}-${i}`).children[0]?.getAttribute('id').includes('black')){
                document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
                break
            }
            document.getElementById(`chessCol${position[0]}-${i}`).style.background = 'red';
        }


        // 대각선 이동
        // 오른쪽 대각선 \방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white'))
                    break
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) + i}`).style.background = 'red';
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white'))
                    break
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) - i}`).style.background = 'red';
            }
        }

        // 왼쪽 대각선 /방향
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) + i <= 8 && Number(position[1]) - i >= 1){
                if(document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).childNodes[0]?.getAttribute('id').includes('white'))
                    break
                document.getElementById(`chessCol${Number(position[0]) + i}-${Number(position[1]) - i}`).style.background = 'red';
            }
        }
        for(let i = 1; i <= 8; i++){
            if(Number(position[0]) - i >= 1 && Number(position[1]) + i <= 8){
                if(document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes?.length === 1 && document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).childNodes[0]?.getAttribute('id').includes('white'))
                    break
                document.getElementById(`chessCol${Number(position[0]) - i}-${Number(position[1]) + i}`).style.background = 'red';
            }
        }
    },
    'white_king' : (parent, target, setClick) => {
        setClick(target);
        const position = parent.getAttribute('id').replace('chessCol','').split('-')
        chessClear();

        // 위
        if(Number(position[0]) - 1 >= 1){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).childNodes[0]?.getAttribute('id').includes('black'))
                document.getElementById(`chessCol${Number(position[0]) - 1}-${position[1]}`).style.background = 'red';
        }
        // 아래
        if(Number(position[0]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).childNodes[0]?.getAttribute('id').includes('black'))
                document.getElementById(`chessCol${Number(position[0]) + 1}-${position[1]}`).style.background = 'red';
        }
        // 오른쪽
        if(Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black'))
                document.getElementById(`chessCol${position[0]}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        // 왼쪽
        if(Number(position[1]) - 1 >= 1){
            if(document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black'))
                document.getElementById(`chessCol${position[0]}-${Number(position[1]) - 1}`).style.background = 'red';
        }

        // 오른쪽 대각선 위
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black'))
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        // 오른쪽 대각선 아래
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) + 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).childNodes[0]?.getAttribute('id').includes('black'))
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) + 1}`).style.background = 'red';
        }
        // 왼쪽 대각선 위
        if(Number(position[0]) - 1 >= 1 && Number(position[1]) - 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black'))
                document.getElementById(`chessCol${Number(position[0]) - 1}-${Number(position[1]) - 1}`).style.background = 'red';
        }
        // 왼쪽 대각선 아래
        if(Number(position[0]) + 1 <= 8 && Number(position[1]) - 1 <= 8){
            if(document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes?.length === 0 || document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).childNodes[0]?.getAttribute('id').includes('black'))
                document.getElementById(`chessCol${Number(position[0]) + 1}-${Number(position[1]) - 1}`).style.background = 'red';
        }

    },
}

export {move_chess};