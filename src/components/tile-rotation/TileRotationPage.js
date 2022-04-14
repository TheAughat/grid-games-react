import TileGrid from './TileGrid';
import {useEffect, useState} from 'react';

const TileRotationPage = ({receivedRows = 2, receivedCols = 2, imgLink}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [gridImg, setGridImg] = useState(new Image);
    const [imgWH, setImgWH] = useState({w: undefined, h: undefined});
    const [pieces, setPieces] = useState({rows: receivedRows, cols: receivedCols});
    const [imgArr, setImgArr] = useState([]);
    const [gameWon, setGameWon] = useState(false);
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
    }, []);


    function checkWin(arr = imgArr) {
        const result = (arr.filter((element) => element.rot % 4 !== 0)).length === 0;
        if (result) {
            setGameWon(true);
            // setImgLoaded(false);
        }
        return result;
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
        </div>
    );
};

export default TileRotationPage;
