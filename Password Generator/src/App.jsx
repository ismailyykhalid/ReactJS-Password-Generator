import { useEffect, useState, useCallback,useRef } from 'react'



function App() {

  const [length, setLength ] = useState(8)
  const [numAllowed, setNumAllowed] = useState (true)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordkaReference = useRef()


const passGenerator = useCallback(()=>{

  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numAllowed) str += "0123456789"
  if (charAllowed) str += "!@#$%&-_"

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }
  setPassword(pass)
},[length,numAllowed,charAllowed])

useEffect(() => {
  passGenerator()
}, [length, numAllowed, charAllowed, passGenerator])




const copyToClipBoard = useCallback(()=>{
passwordkaReference.current?.select()

window.navigator.clipboard.writeText(password)


const popup = document.createElement("div");
    popup.innerHTML = `Password copied:  ${password}`;
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.padding = "10px 20px";
    popup.style.background = "#333";
    popup.style.color = "#fff";
    popup.style.borderRadius = "5px";
    popup.style.zIndex = "99";

    document.body.appendChild(popup);

    // Popup ko 1 second ke baad gayab karna
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 1500);

   const copybtn = document.getElementById("copy")
   copybtn.addEventListener("click", function() {
    // Style set karein
    copybtn.style.color = "black";
    copybtn.style.background = "white";

    // setTimeout function se 0.5 second ka delay set karein
    setTimeout(function() {
        // Style remove karein
        copybtn.style.color = ""; // Default color (aapke webpage ke hisaab se)
        copybtn.style.background = ""; // Default background (aapke webpage ke hisaab se)
    }, 500); // 500 milliseconds ka delay set kiya hai yahan
});

},[password])







  return (
    
    <div className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md rounded-lg p-6 my-8 text-white">
    <h1 className="text-3xl font-bold text-center mb-4">Password Generator</h1>
    <div className="flex items-center border rounded-lg overflow-hidden mb-4 bg-white bg-opacity-10">
        <input
            type="text"
            value={password}
            className="flex-1 py-2 px-3 outline-none bg-transparent text-white"
            placeholder="Generated Password"
            readOnly
            ref={passwordkaReference}
        />
        <button 
        onClick={copyToClipBoard} id='copy'
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 transition duration-300 ease-in-out">
            COPY
        </button>
    </div>
    <div className="flex items-center text-sm gap-x-4">
        <div className="flex items-center gap-x-1 text-white">
            <label htmlFor="lengthInput">Length:</label>
            <input
                type="range"
                value={length}
                id="lengthInput"
                className="cursor-pointer"
                min="0"
                max="20"
                onChange={(e)=>{
                setLength(e.target.value)
                }}
            />
            <span className="text-gray-200" id="lengthValue">{length}</span>
        </div>
        <div className="flex items-center gap-x-1 text-white">
            <input
                type="checkbox"
                defaultChecked = {numAllowed}
                id="numberInput"
                className="form-checkbox text-blue-300"
                onChange={() => {
                  setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1 text-white">
            <input
            value={charAllowed}
                type="checkbox"
                id="characterInput"
                className="form-checkbox text-blue-300"
                onChange={()=>{
                  setCharAllowed((prev)=> !prev)
                }}
            />
            <label htmlFor="characterInput" className='mt-5'>Special Characters </label>
        </div>
    </div>
</div>


    
  )
}

export default App