import { useEffect, useRef, useState } from "preact/hooks";

export function App(props) {
  const [text, setText] = useState("");
  const [clickNo, setClickNo] = useState(0);
  const [todos, setTodos] = useState([]);
  const textRef = useRef(null);

  useEffect(() => {}, [text]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      if (clickNo === 1) {
        let [title, description] = text.split("\n");
        setTodos([...todos, { title: title, description: description }]);
        console.log([...todos, { title: title, description: description }]);
        setText("");
        e.preventDefault();
        setClickNo(0);
      }
      setClickNo((old) => old + 1);
    } else setClickNo(0);
  };

  return (
    <div>
      <div className="header">
        <p>Nela</p>
      </div>
      <div className="todos">
        {todos.map((item) => (
          <div>
            <b>{item.title}</b>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <textarea
        ref={textRef}
        onKeyPress={handleKeyPress}
        onInput={(e) => {
          setText(e.target.value);
        }}
        autoFocus="true"
        value={text}
        className="note-area"
        placeholder="Just start typing"
      />
    </div>
  );
}
