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

const Hint = (props) => {
    return (
        <div className="hint">
            <div className="counter">{props.hint.rightColorWrongPlace}</div>
            <div className="counter">{props.hint.rightColorRightPlace}</div>
        </div>
    )
}

const GameStage = (props) => {
    return (
        <div className="game-stage">
            <div className="stage-colors">
                <div className="box" style={{backgroundColor: props.colors[0]}}/>
                <div className="box" style={{backgroundColor: props.colors[1]}}/>
                <div className="box" style={{backgroundColor: props.colors[2]}}/>
                <div className="box" style={{backgroundColor: props.colors[3]}}/>
            </div>
            <div>
                <Hint hint={props.hint}/>
            </div>
        </div>
    )
}

const Game = () => {
    const [stage, setStage] = useState(0);
    const [step, setStep] = useState(0);
    const [board, setBoard] = useState(startingBoard);
    const [used, setUsed] = useState([]);
    const [winningColors, setWinningColors] = useState(randomColors);
    const [hints, setHints] = useState(startingHints);
    const [gameOver, setGameOver] = useState(false);

    // console.log(winningColors)

    const reset = () => {
        setBoard(startingBoard)
        setStep(0);
        setStage(0);
        setUsed([])
        setHints(startingHints)
        setWinningColors(randomColors)
    }

    const onButtonClick = (color) => {

        if (used.includes(color)) {
            return;
        }

        let copy = {...board};
        copy[stage][step] = color;
        setBoard(copy);

        let usedColors = used.concat(color);
        console.log(usedColors)

        let copyOfHints = {...hints};
        let hint = copyOfHints[stage]

        // console.log(color === winningColors[step])
        if(color === winningColors[step]) {
            hint.rightColorRightPlace++;
        }
        if(color !== winningColors[step] && winningColors.includes(color)) {
            hint.rightColorWrongPlace++;
        }

        if (step === 3) {

            if (usedColors.every((v, i) => v === winningColors[i])) {
                reset();
                return;
            }

            setStep(0)
            setStage(stage + 1)
            setUsed([])

            return;
        }

        setUsed(usedColors)
        setHints(copyOfHints)
        setStep(step + 1)

    }

    return (
        <div className="game">
            <div className="game-board">
                <div className="main">
                    {utils.range(0, 9).map(number => (
                        <GameStage key={number} stage={number} colors={board[number]} hint={hints[number]}/>
                    ))}
                </div>
                <div className="control-panel">
                    <div className="color-options">
                        <ColorOption color={colors.purple} onClick={onButtonClick}/>
                        <ColorOption color={colors.green} onClick={onButtonClick}/>
                        <ColorOption color={colors.blue} onClick={onButtonClick}/>
                        <ColorOption color={colors.yellow} onClick={onButtonClick}/>
                        <ColorOption color={colors.red} onClick={onButtonClick}/>
                        <ColorOption color={colors.orange} onClick={onButtonClick}/>
                    </div>
                    <div className="settings">
                        <button className="box setting" onClick={reset}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            <div className="answer">
                <div className="box" style={{backgroundColor: winningColors[0]}}/>
                <div className="box" style={{backgroundColor: winningColors[1]}}/>
                <div className="box" style={{backgroundColor: winningColors[2]}}/>
                <div className="box" style={{backgroundColor: winningColors[3]}}/>
            </div>
        </div>
    )
}

const randomColors = () => {
    const options = [colors.red, colors.orange, colors.blue, colors.green, colors.yellow, colors.purple];
    const used = [];

    while (used.length < 4) {
        let color = options[utils.random(0, 3)]
        if (!used.includes(color)) {
            used.push(color);
        }
    }

    return used;
}

const startingBoard = () => {
    let board = [];
    for (let x = 0; x < 10; x++) {
        board.push([colors.grey, colors.grey, colors.grey, colors.grey])
    }
    return board;
}

const startingHints = () => {
    let hints = [];
    for (let x = 0; x < 10; x++) {
        hints.push({rightColorWrongPlace: 0, rightColorRightPlace: 0})
    }
    return hints;
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