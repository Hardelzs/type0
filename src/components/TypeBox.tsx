import { useEffect, useState, useRef } from "react";
import { sentences } from "../data/Sentences";

const getRandomSentence = (level: "easy" | "medium" | "hard") =>
  sentences[level][Math.floor(Math.random() * sentences[level].length)];

// const typeSound = new Audio("/sounds/type.mp3");
const sucessSound = new Audio("/sounds/success.mp3");
const errorSound = new Audio("/sounds/error.mp3");
const finishSound = new Audio("/sounds/finish.mp3");

const TypeBox = () => {
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showbutton, setShowButton] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [sentence, setSentence] = useState(getRandomSentence(difficulty));

  useEffect(() => {
    if (started && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [started, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      calculateWPMAndAccuracy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    setSentence(getRandomSentence(difficulty));
  }, [difficulty]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) setStarted(true);
    const val = e.target.value;
    setInput(val);
    if (val === sentence) {
      calculateWPMAndAccuracy();
      clearInterval(intervalRef.current!);
    }
  };

  const calculateWPMAndAccuracy = () => {
    const wordsTyped = input.trim().split(/\s+/).length;
    const correctChars = input
      .split("")
      .filter((char, i) => char === sentence[i]).length;
    const totalChars = input.length;

    const acc =
      totalChars === 0 ? 0 : Math.round((correctChars / totalChars) * 100);
    setAccuracy(acc);

    const wpmValue = Math.round(wordsTyped);
    setWpm(wpmValue);

    setShowButton(true);
    if (acc === 100) {
      finishSound.play();
    } else {
      errorSound.play();
    }
  };

  const resetGame = () => {
    setInput("");
    setTimeLeft(10);
    setWpm(0);
    setAccuracy(0);
    setStarted(false);
    clearInterval(intervalRef.current!);
    setShowButton(false);
  };

  const finishGame = () => {
    if (accuracy > 50) {
      sucessSound.play();
    }
    setSentence(getRandomSentence(difficulty));
    setInput("");
    setTimeLeft(10);
    setWpm(0);
    setAccuracy(0);
    setStarted(false);
    clearInterval(intervalRef.current!);
    setShowButton(false);
  };

  const renderHighlightedText = () => {
    const iscompleted = input.length === sentence.length && input === sentence;
    return (
      <p className="text-xl font-mono break-words max-w-3xl mx-auto">
        {sentence.split("").map((char, i) => {
          let color = "text-gray-400";
          if (i < input.length) {
            color = input[i] === char ? "text-blue-700" : "text-red-500";
          }
          if (iscompleted) color = "text-green-600";
          return (
            <span key={i} className={`${color}`}>
              {char}
            </span>
          );
        })}
      </p>
    );
  };

  return (
  
    <div className="space-y-6 text-center px-4 py-10">
      <h1 className="text-2xl font-bold">⌨️ Typing Speed Test</h1>

      <div>{renderHighlightedText()}</div>

      <input
        value={input}
        onChange={handleInputChange}
        disabled={timeLeft === 0}
        className="border border-gray-400 p-3 w-full max-w-2xl text-xl rounded-md outline-none"
        placeholder="Start typing..."
      />

      <div className="flex justify-center gap-8 text-lg">
        <div>
          ⏱ Time Left : <span className="font-bold">{timeLeft}s</span>
        </div>
        <div>
          🏃‍♂️ WPM : <span className="font-bold">{wpm}</span>
        </div>
        <div>
          🎯 Accuracy : <span className="font-bold">{accuracy}%</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 ">
        <button
          onClick={resetGame}
          className="bg-red-400 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          🔄 Restart
        </button>

        {showbutton && (
          <button
            onClick={finishGame}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            ✅ Finish
          </button>
        )}
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => {
              setDifficulty(level as "easy" | "medium" | "hard");
              resetGame();
            }}
            className={`px-4 py-2 rounded ${
              difficulty === level
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeBox;
