import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const avg = total ? ((good - bad) / total).toFixed(2) : 0;
  const positive = total ? ((good / total)*100).toFixed(2) : 0;

  if (total === 0) {
    return <div>No feedbacks given</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);




const App = () => {


  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Feedback</h1>
      <Button handleClick={() => setGood(prev => prev + 1)} text="good" />
      <Button handleClick={() => setNeutral(prev => prev + 1)} text="neutral" />
      <Button handleClick={() => setBad(prev => prev + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;