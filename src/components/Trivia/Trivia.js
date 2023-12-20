import "./Trivia.css";
import quizQuestions from "../../assets/Data/data";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../../assets/sound/src_sounds_play.wav"
import correct from "../../assets/sound/src_sounds_correct (2).mp3";
import wrong from "../../assets/sound/src_sounds_wrong.mp3";

const Trivia = ({ questionNumber, setQuestionNumber, setStopWatch }) => {
  const [stopClick,setStopClick]= useState(true)
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("Answer");
  const [letsPlay] = useSound(play);
  const [correctAnswers] = useSound(correct);
  const [wrongAnswers] = useSound(wrong);

useEffect(() => {
  letsPlay()
}, [letsPlay]);


  useEffect(() => {
    setQuestion(quizQuestions[questionNumber - 1]);
  }, [questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handelClick = (a) => {
    if (!stopClick) {
    return
    } else {
      setStopClick(false)
      setSelectedAnswer(a);
    setClassName("answer active");
    delay(1000, () =>
      setClassName(
        question.correctAnswer === a ? "answer correct" : "answer wrong"
      )
    );
    delay(4000, () => {
      if (question.correctAnswer === a) {
      correctAnswers()
      delay(1000, () => {
        setQuestionNumber((prev) => prev + 1)
        setSelectedAnswer(null)
        setStopClick(true)
      })
      } else {
        wrongAnswers()
        setStopWatch(true)
      }
    }
    );
  }
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((answer, index) => (
          <div
            onClick={() => {
              handelClick(answer);
            }}
            key={index}
            className={selectedAnswer === answer ? className : "answer"}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
