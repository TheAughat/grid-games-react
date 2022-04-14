import { useState, useEffect, useRef } from "react";
import Tile from "./Tile";
import '../styles/tile.css';

const TileGrid = ({gridImg, imgWH, imgArr, rows, cols, checkWin}) => {
    const [imageSize, setImageSize] = useState({
        x: 0, y: 0, w: imgWH.w, h: imgWH.h, rows: rows, cols: cols
    });
    const wrapRef = useRef();


    useEffect(() => {
        wrapGridCSS();
    }, []);


    function wrapGridCSS() {
        const n = rows;
        let colsTempl = '';
        for (let i=0; i<n; i++) {
          colsTempl += '1fr '
        }
        wrapRef.current.style = `grid-template-columns: ${colsTempl}`;
      }


    return (
        <div className="grid-container">
            <div className="grid-wrapper" ref={wrapRef}>
                {imgArr.map((imgData, index) => {
                    return <Tile image={gridImg} imageSize={imageSize} rowInd={imgData.row} colInd={imgData.col} rot={imgData.rot} key={index} checkWin={checkWin} imgArr={imgArr}/>
                })}
            </div>
        </div>
    );
};

export default TileGrid;

