import { useBoardInfo } from "../SwitchCtx";

interface GenerateMapProps {
    setWalls:React.Dispatch<React.SetStateAction<number[][]>>;
}
export const GenerateMap = ({setWalls}:GenerateMapProps) => {

    let height = 25;
    let width = 50;
    // initalize map with walls 
    for(let i=0; i<height; i++) {
        for(let j=0; j<width; j++) {
            // get element, then paint them as walls
            let cell = document.getElementById(`${i}-${j}`)
            cell?.classList.add("wall-cell");
            // somehow set walls 
            setWalls((prevWall)=> [...prevWall, [i, j]]);
        }
    }
    
}