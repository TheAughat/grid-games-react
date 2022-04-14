import TileRotationPage from "../tile-rotation/TileRotationPage";
import { useState, useRef } from "react";
import '../styles/tile-rotation-menu.css';

const TileRotationMenu = () => {
    const links = [
        'https://cdn.discordapp.com/attachments/855481815065296950/961621406553083904/definitive_logo.png',
        'https://cdn.discordapp.com/attachments/855481815065296950/963953582711898132/24845333_132666047401743_5967991833865748480_n.jpg',
        'https://cdn.discordapp.com/attachments/855481815065296950/963953663636832306/rcd2.png',
        'https://cdn.discordapp.com/attachments/855481815065296950/963953676035194890/rcd3.png',
        'https://cdn.discordapp.com/attachments/855481815065296950/963954154307465276/3.png',
        'https://cdn.discordapp.com/attachments/855481815065296950/963954289049485323/2.png',
        'https://cdn.discordapp.com/attachments/855481815065296950/964210152083439616/7.png',
        'https://cdn.discordapp.com/attachments/855481815065296950/964210151026458694/8.png',
        'https://cdn.discordapp.com/attachments/855481815065296950/964210151391371274/9.png',
        'https://cdn.discordapp.com/attachments/855481815065296950/964210151768870942/10.png',

        
    ];
    const [begunGame, setBegunGame] = useState(false);
    const [difficulty, setDifficulty] = useState({rows: 3, cols: 3});
    const [showError, setShowError] = useState(false);
    const [imgLink, setImgLink] = useState(links[0]);
    const imgRef = useRef();
    const diffRef = useRef();


    function handleDifficultyChoice() {
        switch (diffRef.current.value) {
            case 'Noob':
                setDifficulty({rows: 2, cols: 2});
                setShowError(false);
                break;
            case 'Easy':
                setDifficulty({rows: 3, cols: 3});
                setShowError(false);
                break;
            case 'Medium':
                setDifficulty({rows: 4, cols: 4});
                setShowError(false);
                break;
            case 'Hard':
                setDifficulty({rows: 5, cols: 5});
                setShowError(false);
                break;
            case 'Insane':
                setDifficulty({rows: 8, cols: 8});
                setShowError(false);
                break;
            default:
                setShowError(true);
                return;
        }
    }


    function handleGameStart() {
        if (diffRef.current.value === 'select') {
            setShowError(true);
            return;
        }
        if (!showError) {
            selectImage();
            setBegunGame(true);
        }
    }


    const selectImage = () => {
        setImgLink(links[parseInt(imgRef.current.value.split(' ')[1]) - 1]);
    };


    return (
        <>
            {(begunGame)?
            <TileRotationPage receivedRows={difficulty.rows} receivedCols={difficulty.cols} imgLink={imgLink}/>

            :

            <div className="tile-menu-container">
                <h2>Select Image:</h2>
                {/* <div>images</div> */}
                <select ref={imgRef}>
                    {links.map((img, index) => {
                        return <option key={index}>Image {index + 1}</option>
                    })}
                </select>
                <h3>Select difficulty:</h3>
                <select ref={diffRef} onChange={handleDifficultyChoice}>
                    <option>Noob</option>
                    <option selected>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                    <option>Insane</option>
                </select>
                <br/>
                <button onClick={handleGameStart}>Begin!</button>
                {(showError)?<p className="error-msg">Error: Please select a valid difficulty level</p>:null}
            </div>
            }
        </>
    );
};

export default TileRotationMenu;
