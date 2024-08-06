import { createContext, useContext, useState } from "react";

// for children <Navbar /> and <Board />
interface SwitchsProps {
    children: React.ReactNode;
}

// board representaton for serach algo
/* start = "S" goal = "G", wall = "#", path(or space) =  " " 
*/

// for default context value, add useState value 
interface Switchs {
    // placing state 
    placingStart: boolean;
    setPlacingStart: React.Dispatch<React.SetStateAction<boolean>>;
    // placing state 
    placingEnd: boolean;
    setPlacingEnd: React.Dispatch<React.SetStateAction<boolean>>;
    // placing walls
    placingWall: boolean;
    setPlacingWall: React.Dispatch<React.SetStateAction<boolean>>;
    // allow drawing wall only when user holding mouse down
    isMouseDown: boolean; 
    setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
    // for earsing 
    erasingWall: boolean;
    setErasingWall: React.Dispatch<React.SetStateAction<boolean>>;

    // algo choise
    currentAlgo: string;
    setCurrentAlgo: React.Dispatch<React.SetStateAction<string>>;
    startSearch: boolean;
    setStartSearch: React.Dispatch<React.SetStateAction<boolean>>;

    // ? Popup
    showInstraction: boolean;
    setShowInstraction: React.Dispatch<React.SetStateAction<boolean>>;
}

// board states 
interface BoardInfo {
    // start state 
    start: number[];
    setStart: React.Dispatch<React.SetStateAction<number[]>>;
    // end state 
    end: number[];
    setEnd: React.Dispatch<React.SetStateAction<number[]>>;
    // walls state 
    walls: number[][];
    setWalls: React.Dispatch<React.SetStateAction<number[][]>>;
    // completed board info for search algorithm 
    board: string[][];
    setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
}

// use switch contexts
export function useSwitchs() {
    const context = useContext(SwitchsContext);
    if(!context) {
        throw new Error('use Switch must be used within a SwitchProvider')
    }
    return context
}

// use board info contexts
export function useBoardInfo() {
    const context = useContext(BoardInfoContext);
    if(!context) {
        throw new Error('use Switch must be used within a SwitchProvider')
    }
    return context;
}

// context for passing all button state to any other component including navbar and board 
const SwitchsContext = createContext<Switchs | null>(null)
const BoardInfoContext = createContext<BoardInfo | null>(null)

export function SwitchCtxProvider({ children }:SwitchsProps ) {

    // navbar functions
    const [placingStart, setPlacingStart] = useState<boolean>(false);
    const [placingEnd, setPlacingEnd] = useState<boolean>(false);
    // navbar functions - drawing wall states 
    const [placingWall, setPlacingWall] = useState<boolean>(false);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    // navbar functions - erasing wall states
    const [erasingWall, setErasingWall] = useState<boolean>(false);
    // algorithm choise 
    const [currentAlgo, setCurrentAlgo] = useState<string>("");
    // start search
    const [startSearch, setStartSearch] = useState<boolean>(false);
    // ? Popup
    const [showInstraction, setShowInstraction] = useState<boolean>(false);

    // board functions
    const [start, setStart] = useState<number[]>([]);
    const [end, setEnd] = useState<number[]>([]);
    const [walls, setWalls] = useState<number[][]>([]);
    const [board, setBoard] = useState<string[][]>([]); // "S" for start and so on

    return (
        <SwitchsContext.Provider value={{ 
            placingStart, 
            setPlacingStart,
            placingEnd,
            setPlacingEnd,
            // wall draw operations
            placingWall, 
            setPlacingWall,
            isMouseDown,
            setIsMouseDown,
            // wall erase operations
            erasingWall,
            setErasingWall,
            // algo 
            currentAlgo, 
            setCurrentAlgo,
            // start sreach button
            startSearch, 
            setStartSearch, 
            // ? popup
            showInstraction,
            setShowInstraction,
        }}>
            <BoardInfoContext.Provider value={{ 
                start, 
                setStart,
                end,
                setEnd,
                walls,
                setWalls,
                board,
                setBoard,
            }}>
                <div>{ children }</div>
            </BoardInfoContext.Provider>
        </SwitchsContext.Provider>
    )
}