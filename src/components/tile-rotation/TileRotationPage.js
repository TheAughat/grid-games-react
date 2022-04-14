import TileGrid from './TileGrid';
import {useEffect, useState, useRef} from 'react';

const TileRotationPage = ({receivedRows = 2, receivedCols = 2, imgLink}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [gridImg, setGridImg] = useState(new Image);
    const [imgWH, setImgWH] = useState({w: undefined, h: undefined});
    const [pieces, setPieces] = useState({rows: receivedRows, cols: receivedCols});
    const [imgArr, setImgArr] = useState([]);
    const [gameWon, setGameWon] = useState(false);
    const [timeTaken, setTimeTaken] = useState('00:00');
    const timeRef = useRef();
    const [timer, setTimer] = useState(undefined);
    const SCALER = 0.8;


    useEffect(() => {
        let image = new Image;
        image.src = imgLink;
        image.onload = () => {
            setGridImg(image);
            calcImageSize(image);

            let arr = [];
            for (let i=0; i<pieces.rows; i++) {
                for (let j=0; j<pieces.cols; j++) {
                    arr.push({
                        row: i,
                        col: j,
                        rot: Math.floor(Math.random() * 4)
                    });
                }
            }
            setImgArr(arr);

            setImgLoaded(true);

        };
        timerTick();
    }, []);


    function checkWin(arr = imgArr) {
        const result = (arr.filter((element) => element.rot % 4 !== 0)).length === 0;
        if (result) {
            clearInterval(timer);
            setGameWon(true);
        }
        return result;
    }


    function timerTick() {
        const timerID = setInterval(() => {
            let [waste, mins, secs] = timeRef.current.innerText.split(':');
            mins = parseInt(mins);
            secs = parseInt(secs) + 1;
            if (secs >= 60) {
                secs = 0;
                mins++;
            }
            timeRef.current.innerText = (`Time: ${((''+mins).length === 1)?'0'+mins:mins}:${((''+secs).length === 1)?'0'+secs:secs}`);
        }, 1000);
        setTimer(timerID);
    }


    function calcImageSize(image) {
        const resizer = SCALER * Math.min(
            window.innerWidth / image.width,
            window.innerHeight / image.height
        );
        setImgWH({
            w: (resizer * image.width) / pieces.cols,
            h: (resizer * image.height) / pieces.rows
        });
    }


    return (
        <div>
            {(gameWon)?<h1 className='grid-container'>You Win!</h1>:null}
            {(imgLoaded)?<TileGrid gridImg={gridImg} imgWH={imgWH} imgArr={imgArr} 
            rows={pieces.rows} cols={pieces.cols} checkWin={checkWin}/>:null}
            <p className='grid-container timer' ref={timeRef}>Time: {timeTaken}</p>
        </div>
    );
};

export default TileRotationPage;
