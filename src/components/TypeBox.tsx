import { useState } from "react";
import { sentences } from "../data/Sentences";

const getRandomSentence = () =>
  sentences[Math.floor(Math.random() * sentences.length)];

const TypeBox = () => {
  const [sentence, setSentence] = useState(getRandomSentence);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setInput(val);

    if (val === sentence) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime!) / 1000 / 60; // in minutes
      const words = val.split(" ").length;
      setWpm(Math.round(words / timeTaken));
    }
  };

  const resetGame = () => {
    setSentence(getRandomSentence());
    setInput("");
    setStartTime(null);
    setWpm(0);
  };

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-medium">{sentence}</h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="border p-2 w-full max-w-md"
        placeholder="Start typing..."
      />
      <div>WPM: {wpm}</div>
      <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded">
        Restart
      </button>
    </div>
  );
};

export default TypeBox;
