import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.onClick}> {props.name} </button>
)

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>

          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={(good - bad) / total} />
          <StatisticsLine text="positive" value={(good / total) * 100 + '%'} />

        </tbody>
      </table>
    </>
  )
}

const StatisticsLine = (props) => (
  <tr><td>{props.text} {props.value}</td></tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} name='good' />
      <Button onClick={() => setNeutral(neutral + 1)} name='neutral' />
      <Button onClick={() => setBad(bad + 1)} name='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App