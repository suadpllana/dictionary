    import React from "react";
    import { useState, useRef, useEffect } from "react";
    import { words } from "./words";

    const Dictionary = () => {
    const [dictionaryData, setDictionaryData] = useState([]);
    const [word , setWord] = useState("")
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
    }, 86400000)

    useEffect(() => {
        searchWord();
    }, []);

    return (
        <div>
             <h2 className="word-of-the-day">Word of the Day is {word ? word : "Chagrin"}</h2>
        <div className="container">
            <h1>English Dictionary</h1>
           
            <input onKeyDown={(e) => enterFunction(e)} ref={inputRef} type="text" placeholder="Search for a word" />
            <button onClick={searchWord}>🔎</button>
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
                <div className="dataContainer">
                <div>
                    <h2 className="title">{dictionaryData[0].word ? dictionaryData[0].word : ""}</h2>
                    <p>{dictionaryData[0].meanings[0].partOfSpeech ? dictionaryData[0].meanings[0].partOfSpeech : ""} / {dictionaryData[0].phonetic ? dictionaryData[0].phonetic : ""}</p>
                </div>

                <div>
                    <audio
                    src={dictionaryData[0].phonetics[1] ? dictionaryData[0].phonetics[1].audio : "" }
                    controls
                    ></audio>
                </div>
                </div>
                <div className="meaning">
                <h2>Meaning</h2>
                <p>1.{dictionaryData[0].meanings[0].definitions[0].definition ? dictionaryData[0].meanings[0].definitions[0].definition : "None found"}</p>
                <p>2.{dictionaryData[0].meanings[0].definitions[1] ? dictionaryData[0].meanings[0].definitions[1].definition : "No more definitions found"}</p>
                <p>3.{dictionaryData[0].meanings[0].definitions[2] ? dictionaryData[0].meanings[0].definitions[2].definition : "No more definitions found"}</p>
                <h2>Example</h2>
                <p>{dictionaryData[0].meanings[0].definitions[0].example ? dictionaryData[0].meanings[0].definitions[0].example : <span>No examples found</span>}</p>
                <h2>Synonyms</h2>
                <div className="synonym">
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
