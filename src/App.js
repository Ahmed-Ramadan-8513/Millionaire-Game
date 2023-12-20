import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Trivia from "./components/Trivia/Trivia";
import Timer from "./components/Timer/Timer";
import Start from "./components/userName/Start";

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stopWatch, setStopWatch] = useState(false);
  const [moneyWin, setMoneyWin] = useState("£0");
  const prizes = useMemo(
    () =>
      [
        { id: 1, amount: "£100" },
        { id: 2, amount: "£200" },
        { id: 3, amount: "£300" },
        { id: 4, amount: "£500" },
        { id: 5, amount: "£1,000" },
        { id: 6, amount: "£2,000" },
        { id: 7, amount: "£4,000" },
        { id: 8, amount: "£8,000" },
        { id: 9, amount: "£16,000" },
        { id: 10, amount: "£32,000" },
        { id: 11, amount: "£64,000" },
        { id: 12, amount: "£125,000" },
        { id: 13, amount: "£250,000" },
        { id: 14, amount: "£500,000" },
        { id: 15, amount: "£1,000,000" },
      ].reverse(),
    []
  );
  useEffect(() => {
    if (questionNumber > 1) {
      setMoneyWin(prizes.find((m) => m.id === questionNumber - 1).amount);
    }
  }, [prizes, questionNumber]);

  const handelRestart = () => {
    window.location.reload();
  };
  return (
    <div className="App">
      {userName ? (
        <>
          <div className="main">
            {stopWatch || questionNumber === 16 ? (
              <>
                <h1 className="endText"> You Have Won :  {moneyWin}</h1>
                <button className="playAgainButton" onClick={handelRestart}>
                  Play Again
                </button>
              </>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setStopWatch={setStopWatch}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    setStopWatch={setStopWatch}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {prizes.map((item) => (
                <li
                  key={item.id}
                  className={
                    questionNumber === item.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNum">{item.id}</span>
                  <span className="monyListItemAmount">{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
