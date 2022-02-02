import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const ColorOption = (props) => {
    return (
        <button
            className="box option" style={{backgroundColor: props.color}}
            onClick={() => props.onClick(props.color)}
        />
    )
}

const Hint = () => {
    return (
        <div className="box hint" />
    )
}

const GameStage = (props) => {

    return (
        <div className="game-stage">
            <div className="box" style={{backgroundColor: props.colors[0]}}/>
            <div className="box" style={{backgroundColor: props.colors[1]}}/>
            <div className="box" style={{backgroundColor: props.colors[2]}}/>
            <div className="box" style={{backgroundColor: props.colors[3]}}/>
            <Hint />
        </div>
    )
}

const Game = () => {
    const [stage, setStage] = useState(0);
    const [step, setStep] = useState(0);
    const [board, setBoard] = useState(startingBoard);
    const [used, setUsed] = useState([])


    const onButtonClick = (color) => {

        if(used.includes(color)) {
            return;
        }

        let copy = {...board};
        copy[stage][step] = color;
        setBoard(copy);
        let usedColors = used.concat(color);
        setUsed(usedColors)
        console.log(used)

        setStep(step + 1)
        if (step === 3) {
            setStep(0)
            setStage(stage + 1)
            setUsed([])
        }

    }

    return (
        <div className="game">
            <div className="game-board">
                <div className="main">
                    {utils.range(0, 9).map(number => (
                        <GameStage key={number} stage={number} colors={board[number]}/>
                    ))}
                </div>
                <div className="color-options">
                    <ColorOption color={colors.purple} onClick={onButtonClick}/>
                    <ColorOption color={colors.green} onClick={onButtonClick} />
                    <ColorOption color={colors.blue} onClick={onButtonClick} />
                    <ColorOption color={colors.yellow} onClick={onButtonClick} />
                    <ColorOption color={colors.red} onClick={onButtonClick} />
                    <ColorOption color={colors.orange} onClick={onButtonClick} />
                </div>
            </div>
        </div>
    )
}

const startingBoard = () => {
    let board = [];
    for(let x = 0; x < 10; x++) {
        board.push([colors.grey, colors.grey, colors.grey, colors.grey])
    }
    return board;
}

const colors = {
    purple: "#b676b1",
    green: "#82CAAF",
    blue: "#75C0E0",
    yellow: "#FECF6A",
    red: "#DF1C44",
    orange: "#FF5722",
    grey: "#ddd"
}

// Math science
const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },
};

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
)