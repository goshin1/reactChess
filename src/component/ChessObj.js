export default function ChessObj(roomInfo, profile, j, id){

    return <div className="chessMen content" id={id}
    draggable='true' key={id} onClick={(event) => {
        if(roomInfo.turn === profile.id){
            console.log("흰색" + event.target.id.includes('white') && roomInfo.white === profile.id)
            if((event.target.id.includes('white') && roomInfo.white === profile.id) ||
                (event.target.id.includes('black') && roomInfo.black === profile.id)){
                    move_chess[title[j]](parent, obj, setClick)
                }
        }
    }}>

    </div>
}