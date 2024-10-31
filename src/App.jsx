import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [que, setQue] = useState("")
  const [ans, setAns] = useState("")
  const [loading, setLoading] = useState(false)

  async function generateAnswer(){
    setAns("loading")
    setLoading(true);
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDlYFh8eA3zpCvZZ8Hy-DIhPIH3Q67KOeI",
      method:"post",
      data:{
        contents:[
          {parts:[{text:que}]}],
      },
    })
    console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
    const rawText = response['data']['candidates'][0]['content']['parts'][0]['text'];
    const cleanedText = rawText.replace(/\*/g, '').trim();
    const noHashText = cleanedText.replace(/#/g, '');
    const boldedText = noHashText.replace(/^(.*):/gm, '<strong>$1:</strong>');
    setAns(boldedText);
  }

  return (

    <>
    <div className='flex items-center justify-center flex-col gap-5 p-5 bg-gray-100 min-h-screen'>
      <div className='text-2xl font-bold'>
        Chat App
      </div>
      <textarea 
        className='border border-gray-300 rounded-lg p-2 w-[600px] h-24 resize-none'
        value={que} 
        onChange={(e) => { setQue(e.target.value) }}
        placeholder="Type your question here..."
      ></textarea>
      <button 
        className='bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 w-[600px]'
        onClick={generateAnswer}
      >
        Generate
      </button>
      <h2 className='text-xl font-semibold'>Generated Answer</h2>
      {loading ? ( // Conditionally render the <pre> tag based on loading state
        <pre 
          id='answer' 
          className='w-[600px] bg-white border border-gray-300 rounded-lg p-2 whitespace-pre-wrap break-words' 
          dangerouslySetInnerHTML={{ __html: ans }}
        />
      ) : null}


    </div>
    </>
  )
}

export default App
