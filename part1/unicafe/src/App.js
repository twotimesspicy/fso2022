import { useState } from 'react'

const Header = ({name}) => <h1>{name}</h1>
const Button = ({name, handleClick}) => {
    return (
        <button onClick={handleClick}>{name}</button>
    )
}
const StatisticsLine = ({name, value}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if(good + neutral + bad == 0) {
        return (<p>No feedback given</p>)
    }

    return (
        <table>
            <StatisticsLine name={'good'} value = {good} />
            <StatisticsLine name={'neutral'} value = {neutral} />
            <StatisticsLine name={'bad'} value = {bad} />
            <StatisticsLine name={'all'} value = {good + neutral + bad} />
            <StatisticsLine name={'average'} value = {(good - bad) / (good + neutral + bad)} />
        </table>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)
    return (
        <div>
            <Header name={'give feedback'} />
            <Button name={'good'} handleClick={handleGoodClick} />
            <Button name={'neutral'} handleClick={handleNeutralClick} />
            <Button name={'bad'} handleClick={handleBadClick} />

            <Header name={'statistics'} />

            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App
