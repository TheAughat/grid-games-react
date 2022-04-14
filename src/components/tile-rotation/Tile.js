import { useState, useRef, useEffect } from "react";
import '../styles/tile.css';

const Tile = ({image, imageSize, rowInd, colInd, rot, checkWin, imgArr, btnInd}) => {
    const canRef = useRef();
    const tileRef = useRef();
    const targetDeg = 90;
    let rotDeg = 0;
    let curRot = 0;
    let currentlyRotating = false;


    useEffect(() => {
        addImage();
        tileRef.current.addEventListener('contextmenu', (e) => e.preventDefault());
        tileRef.current.addEventListener('mousedown', (e) => handleRotate(e));
        tileRef.current.addEventListener('touchdown', (e) => handleRotate(e));

        for (let i=0; i<rot; i++) {
            rotDeg += 90;
            curRot += 90;
        }
        canRef.current.style.transform = `rotate(${curRot}deg)`;
        imgArr[find()] = {row: rowInd, col: colInd, rot: Math.abs(rot % 4)};
    }, []);


    function handleRotate(e) {
        if (!currentlyRotating && e.which === 1) {
            currentlyRotating = true;

            rotDeg += targetDeg;

            let onTick = setInterval(() => {
                curRot++;
                if (curRot >= rotDeg) {
                    currentlyRotating = false;
                    checkWin();
                    clearInterval(onTick);
                }
                e.target.style = `transform: rotate(${curRot}deg)`;
            }, 1);
            rot++;
        }
        else if (!currentlyRotating && e.which === 3) {
            currentlyRotating = true;

            rotDeg -= targetDeg;

            let onTick = setInterval(() => {
                curRot--;
                if (curRot <= rotDeg) {
                    currentlyRotating = false;
                    checkWin();
                    clearInterval(onTick);
                }
                e.target.style = `transform: rotate(${curRot}deg)`;
            }, 1);
            rot--;
        }
        imgArr[find()] = {row: rowInd, col: colInd, rot: Math.abs(rot % 4)};
    }


    function find() {
        for (let i=0; i<imgArr.length; i++) {
            if (imgArr[i].row === rowInd && imgArr[i].col === colInd) return i;
        }
        return -1;
    }


    function addImage() {
        const ctx = canRef.current.getContext('2d');

        canRef.current.width = imageSize.w;
        canRef.current.height = imageSize.h;
        
        ctx.drawImage(
            image,
            colInd * image.width / imageSize.cols,
            rowInd * image.height / imageSize.rows,
            image.width / imageSize.cols,
            image.height / imageSize.rows,
            0,
            0,
            imageSize.w,
            imageSize.h
        );

        tileRef.current.style = `max-height: ${canRef.current.height + 2}px`;
    }


    return (
        <button className='tile-btn' ref={tileRef}>
            <canvas ref={canRef} onLoad={addImage}></canvas>
        </button>
    );
};

export default Tile;

