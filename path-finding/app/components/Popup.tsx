import './styles/Popup.css'
import { useSwitchs } from './SwitchCtx'

export default function Popup({triggerPop}: {triggerPop: boolean}) {

    const {showInstraction,setShowInstraction} = useSwitchs()
    return triggerPop ? (
        <div className="popup">
            <div className='popup-inner'>
                <div className='popup-title'>How to use it?</div>
                <button className="close-btn" onClick={()=> setShowInstraction(false)}>CLOSE</button>
                <ol className='instructions'>
                    <li className='inst-ctx'>Click 'Place Start,' then click anywhere on the grid board to set the start point. Repeat the process with 'Place Goal' to set the goal point.</li>
                    <li className='inst-ctx'>Select your preferred algorithm and click 'Start Pathfinding'.</li>
                    <li className='inst-ctx'>Optionally, you can draw walls using "Placing Walls" and erase them with "Erasing walls".</li>
                    <li className='inst-ctx'>Don’t want to spend time creating a maze by hand? No problem! Click 'Generate Map' to automatically create a unique maze!</li>
                    <li className='inst-ctx'>
                        <ul>
                            <li className='caution'>- For heuristic alogrithm, this is using "manhattan heuristic"</li>
                            <li className='caution'>- You can check the 'cell to goal score' to evaluate which algorithm is better, but this may not guarantee a significant difference between the algorithms, depending on the maze you tested with.</li>
                            <li className='caution'>- Try pathfinding with a no-wall maze to see how each algorithm scans the maze to find a path! This is a great way to differentiate algorithms like DFS, BFS, and others. However, it may not be as effective for distinguishing between the Greedy algorithm and A* since these two show differences only in certain maze structures.</li>
                            <li className='caution'>- The algorithms implemented here only consider the current cell's 'up,' 'down,' 'right,' and 'left' neighbors or successors. Diagonal cells are not considered as neighbors.</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    ) : ""
}