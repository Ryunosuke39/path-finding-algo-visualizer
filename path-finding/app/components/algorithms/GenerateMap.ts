import { useBoardInfo } from "../SwitchCtx";

interface GenerateMapProps {
    setWalls:React.Dispatch<React.SetStateAction<number[][]>>;
    start:number[]
}
export const GenerateMap = ({start, setWalls}:GenerateMapProps) => {

    let height = 25;
    let width = 50;
    // initalize map with walls 
    let tempWalls = []
    for(let i=0; i<height; i++) {
        for(let j=0; j<width; j++) {
            // get element, then paint them as walls
            let cell = document.getElementById(`${i}-${j}`)
            cell?.classList.add("wall-cell");
            // somehow set walls 
            // setWalls((prevWall)=> [...prevWall, [i, j]]);
            tempWalls.push([i, j])
        }
    }
    // or maybe setting all cell into walls might be compulatinally frendly 
    setWalls(tempWalls);

    // now creare path 
    // make start as path 
    if( start[0] == undefined && start[1] == undefined ){
        start = [0, 0]
    }

    const deleteWallCell = (rowIdx:number, colIdx:number) => {
        let cell = document.getElementById(`${rowIdx}-${colIdx}`)
        cell?.classList.remove("wall-cell")
    }

}