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
            ans[i][j] = Math.abs(endX - i) + Math.abs(endY - j);
        }
    }
    
    return ans;
}