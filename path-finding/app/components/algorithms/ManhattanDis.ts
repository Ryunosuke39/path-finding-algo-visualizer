interface ManhattanDis {
    end: number[];
    height: number;
    width: number;
}

export const ManhattanDis = ({end, height, width}: ManhattanDis) => {
    let ans: number[][] = Array.from({ length: height }, ()=> Array(width).fill(0));

    let [endX, endY] = end;

    for(let i=0; i<height; i++) {
        for(let j=0; j<width; j++) {
            ans[i][j] = Math.abs(endX - j) + Math.abs(endY - i);
        }
    }
    // test 
    // console.log(`ans: ${ans}`)
    // for(let k=0; k<ans.length; k++) {
    //     console.log(`start: ${ans[k]}`)
    // }
    
    return ans;
}