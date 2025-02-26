import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");

  const passRef = useRef(null);

  const passGen = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*(){[}]~";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      password += str.charAt(index);
    }

    setPass(password);
  }, [length, num, char]);

  const copyPassToClipboard = useCallback(() => {
    if (passRef.current) {
      passRef.current.select();
      passRef.current.setSelectionRange(0, pass.length);
      window.navigator.clipboard.writeText(pass);
    }
  }, [pass]);

  useEffect(() => {
    passGen();
  }, [length, num, char, passGen]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-black">
      <h1 className="text-white text-center my-3 text-2xl font-bold">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input

          type="text"
          value={pass}
          className="outline-none w-full py-1 px-3 text-black"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button
          onClick={copyPassToClipboard}
          className="relative z-0 rounded bg-blue-600 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-blue-900 after:transition-[all_0.3s_ease]  hover:after:w-full ">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={num}
            id="numInput"
            onChange={() => setNum((prev) => !prev)}
          />
          <label htmlFor="numInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={char}
            id="charInput"
            onChange={() => setChar((prev) => !prev)}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
