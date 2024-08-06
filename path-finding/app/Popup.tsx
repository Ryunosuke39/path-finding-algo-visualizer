import './Popup.css'
import { useSwitchs } from './SwitchCtx'

export default function Popup({triggerPop}: {triggerPop: boolean}) {

    const {setShowInstraction} = useSwitchs()
    return triggerPop ? (
        <div className="popup">
            <div className='popup-inner'>
                <div>How to use it?</div>
                <button className="close-btn" onClick={()=> setShowInstraction(false)}>close</button>
                <ol>
                    <li>Click "Place Start", Click anywhere you would like to place start point on the grid board</li>
                    <li>Click "Done" to Exist "Place Start" once you placed a starting cell</li>
                    <li>Click "Place Goal" same as "Place Start", Do not forget to exist "Place Goal"</li>
                    <li>Optionally, you can draw walls to experiment path search algorithm.</li>
                    <li>You can use "Erasing Walls" to modify existing walls</li>
                    <li>Set Your Choise of Algorithm AI</li>
                    <li>Finally "Start Path Finding" to visualize it!</li>
                </ol>
            </div>
        </div>
    ) : ""
}