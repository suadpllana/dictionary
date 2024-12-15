    import React from "react";
    import { useState, useRef, useEffect } from "react";
    import { words } from "./words";

    const Dictionary = () => {
    const [dictionaryData, setDictionaryData] = useState([]);
    const [word , setWord] = useState(() => {
        const savedWord = localStorage.getItem("dictionaryWord")
        return savedWord ? JSON.parse(savedWord) : ""
    })

    useEffect(() => {
        localStorage.setItem("dictionaryWord" , JSON.stringify(word) )
    } , [word])

       
    const inputRef = useRef(null);
    const [error, setError] = useState("")


    async function searchWord() {
        try{
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputRef.current.value}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            if(data.title === "No Definitions Found"){
               
                alert("The word was not found!")
                setDictionaryData([])
                   inputRef.current.value = ``
                return
             
            }
            setDictionaryData(data);
            inputRef.current.value = ``
        }
        catch(err){
          console.error(err)
       
        }
   
    }
    function enterFunction(e){
        if(e.key === "Enter"){
            searchWord()
        }
    }

    const wordOfTheDay = () => {
        const randomIndex = Math.floor(Math.random() * words.length)
        setWord(words[randomIndex])
    };
    setTimeout(() => {
        wordOfTheDay()
    }, 20000)

    useEffect(() => {
        searchWord();
    }, []);

    return (
        <div>
             <h2 className="mb-1.5 text-center font-bold text-lg mt-2.5 " >Word of the Day is {word ? word : "Chagrin"}</h2>
        <div className="w-[80%] md:w-[40%] bg-white rounded text-center mx-auto mt-10">
            <h1 className="text-2xl">English Dictionary</h1>
           
            <input className="w-3/5 h-8" onKeyDown={(e) => enterFunction(e)} ref={inputRef} type="text" placeholder="Search for a word" />
            <button className="w-10 h-10 bg-chartreuse-300 rounded-full text-lg cursor-pointer ml-8" onClick={searchWord}>🔎</button>
            {dictionaryData.length > 0  ? (
            <></>
            ) : (
            <>
                <p>
                Type any existing word and press enter or click the button to get its meaning, example,
                aesthetic, etc.
                </p>
            </>
            )}
            
            {error ? {error} : <></>}
            {dictionaryData.length > 0 ? (
            <>
                <div className="flex flex-row justify-between items-center overflow-hidden">
                <div className="ml-5">
                    <h2 className=" mb-2.5 title">{dictionaryData[0].word ? dictionaryData[0].word : ""}</h2>
                    <p>{dictionaryData[0].meanings[0].partOfSpeech ? dictionaryData[0].meanings[0].partOfSpeech : ""} / {dictionaryData[0].phonetic ? dictionaryData[0].phonetic : ""}</p>
                </div>

                <div className="ml-5">
                    <audio className="w-28" 
                    src={dictionaryData[0].phonetics[1] ? dictionaryData[0].phonetics[1].audio : "" }
                    controls
                    ></audio>
                </div>
                </div>
                <div className="border-2 border-gray-500 w-full text-left overflow-y-scroll max-h-[215px]">
                <h2 className="font-bold text-lg">Meaning</h2>
                <p>1.{dictionaryData[0].meanings[0].definitions[0].definition ? dictionaryData[0].meanings[0].definitions[0].definition : "None found"}</p>
                <p>2.{dictionaryData[0].meanings[0].definitions[1] ? dictionaryData[0].meanings[0].definitions[1].definition : "No more definitions found"}</p>
                <p className="mb-2.5 ">3.{dictionaryData[0].meanings[0].definitions[2] ? dictionaryData[0].meanings[0].definitions[2].definition : "No more definitions found"}</p>
                <h2 className="text-lg font-bold">Example</h2>
                <p className="mb-2.5">{dictionaryData[0].meanings[0].definitions[0].example ? dictionaryData[0].meanings[0].definitions[0].example : <span>No examples found</span>}</p>
                <h2 className="text-lg font-bold">Synonyms</h2>
                <div className="flex flex-wrap">
                    {dictionaryData[0].meanings[0].synonyms.length > 0 ? dictionaryData[0].meanings[0].synonyms.map((synonym,index) => (
                       
                                     <span  key={index} >{synonym} , </span>
                       
               
                    )) : <span>No synonyms Found</span>}
                     </div>
                </div>
                
            </>
            ) : (
            <></>
            )}
        </div>
        </div>
    );
    };

    export default Dictionary;
