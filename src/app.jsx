import { useEffect, useRef, useState } from "preact/hooks";
import useLocalStorage from "./utils/useLocalStorage";
import wordsList from "./wordsList";

export function App(props) {
  const [text, setText] = useState("");
  const [clickNo, setClickNo] = useState(0);
  const [todos, setTodos] = useLocalStorage("nela-todos", []);
  const [suggestion, setSuggestion] = useState("");
  const textRef = useRef(null);

  let enterKey = 13;
  let shiftKey = 16;

  wordsList.sort();

  useEffect(() => {
    setSuggestion("");

    // get last word in text
    let lastWord = text.split(" ").pop();
    //minus lastWord from text
    let textWithoutLastWord = text.slice(0, text.length - lastWord.length);
    let regex = new RegExp("^" + lastWord, "i");
    //loop through words array
    for (let i in wordsList) {
      //check if input matches with any word in words array
      if (regex.test(wordsList[i]) && lastWord != "") {
        //Change case of word in words array according to user input
        wordsList[i] = caseCheck(wordsList[i]);
        //display suggestion
        setSuggestion(textWithoutLastWord + wordsList[i]);
        break;
      }
    }
  }, [text]);

  const caseCheck = (word) => {
    //Array of characters
    word = word.split("");
    let inp = text.split(" ").pop();
    //loop through every character in ino
    for (let i in inp) {
      //if input character matches with character in word no need to change
      if (inp[i] == word[i]) {
        continue;
      } else if (inp[i].toUpperCase() == word[i]) {
        //if inp[i] when converted to uppercase matches word[i] it means word[i] needs to be lowercase
        word.splice(i, 1, word[i].toLowerCase());
      } else {
        //word[i] needs to be uppercase
        word.splice(i, 1, word[i].toUpperCase());
      }
    }
    //array to string
    return word.join("");
  };

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
    if (e.key === "Shift") {
      setText(suggestion);
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
          onKeyUp={handleKeyPress}
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
