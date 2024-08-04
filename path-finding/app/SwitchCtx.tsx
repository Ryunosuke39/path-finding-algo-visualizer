import { createContext, useContext, useState } from "react";

// for children <Navbar /> and <Board />
interface SwitchsProps {
    children: React.ReactNode;
}

// for default context value, add useState value 
interface Switchs {
    // placing state 
    placingStart: boolean;
    setPlacingStart: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BoardInfo {
    //start state 
    start: number[];
    setStart: React.Dispatch<React.SetStateAction<number[]>>;
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
    const [placingStart, setPlacingStart] = useState<boolean>(false)

    // board functions
    const [start, setStart] = useState([0, 0]);

    return (
        <SwitchsContext.Provider value={{ placingStart, setPlacingStart }}>
            <BoardInfoContext.Provider value={{ start, setStart }}>
                <div>{ children }</div>
            </BoardInfoContext.Provider>
        </SwitchsContext.Provider>
    )
}