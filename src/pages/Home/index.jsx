import { useEffect, useRef, useState } from "preact/hooks";
import useLocalStorage from "@/hooks/useLocalStorage";
import wordsList from "@/utils/wordsList";
import caseCheck from "@/utils/caseCheck";
import { matchSorter } from "match-sorter";

export function Home(props) {
  const [text, setText] = useState("");
  const [clickNo, setClickNo] = useState(0);
  const [todos, setTodos] = useLocalStorage("nela-todos", []);
  const [suggestion, setSuggestion] = useState("");
  const textRef = useRef(null);

  wordsList.sort();

  useEffect(() => {
    setSuggestion("");
    // get last word in text
    let lastWord = text.split(" ").pop();
    if (lastWord.length < 2) return;
    //minus lastWord from text
    let textWithoutLastWord = text.slice(0, text.length - lastWord.length);
    //fastest search than any packages

    let wordSuggestion = wordsList.find(
      (word) => word.startsWith(lastWord) && word !== lastWord
    );
    wordSuggestion && setSuggestion(textWithoutLastWord + wordSuggestion);
  }, [text]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (clickNo === 1) {
        let [title, ...description] = text.split("\n");
        setTodos([
          ...todos,
          {
            id: Date.now(),
            title: title,
            description: description.join("\n"),
          },
        ]);
        setText("");
        e.preventDefault();
        setClickNo(0);
      }
      setClickNo((old) => old + 1);
    } else setClickNo(0);
    if (e.key === "Tab" || e.key === "ArrowRight") {
      if (suggestion.length < 1) return;
      e.key === "Tab" && e.preventDefault();
      setText(suggestion + " ");
    }
  };

  const deleteTodo = (id) => {
    setTodos((items) => items.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div className="header">
        <p>Nela</p>
      </div>

      <div className="todos">
        {todos.map((item) => (
          <div
            style={{ postion: "relative" }}
            ondblclick={() => deleteTodo(item.id)}
          >
            <p className="title">{item.title}</p>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="note-container">
        <textarea
          ref={textRef}
          onKeyDown={handleKeyPress}
          onInput={(e) => {
            setText(e.target.value);
          }}
          autoFocus="true"
          value={text}
          className="note-area"
          placeholder="Just start typing"
        />
        <span className="note-suggetion">{suggestion}</span>
      </div>
    </div>
  );
}
