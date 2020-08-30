import React, { useEffect, useState } from 'react';
import './App.css';
import alanBtn from "@alan-ai/alan-sdk-web"
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from "./styles"
import wordsToNumbers from "words-to-numbers"

const alanKey = "4dfb8f8fc12871bb900a56d427eacd492e956eca572e1d8b807a3e2338fdd0dc/stage"

function App() {

  const classes = useStyles()

  const [newsArticles,setNewsArticles] = useState([])
  const [activeArticle,setActiveArticle]=useState(-1)

  useEffect(()=>{
    alanBtn({
      key: alanKey,
      onCommand:({command,articles,number})=>{
        if(command=== 'newHeadlines'){
          setNewsArticles(articles);
        }else if(command === "hightlight"){
            setActiveArticle((prevActiveArticle)=>prevActiveArticle+1)
        }else if(command ==="open"){
          const parsedNumber = number.length >2 ?wordsToNumbers(number,{fuzzy:true}):number
          const article = articles[parsedNumber-1];

          if(parsedNumber >20){
            alanBtn().playText("Please try that again")
          }else if(article){
            window.open(articles[parsedNumber].url,'_blank');
            alanBtn().playText("Opening...")
            
          }
        }else if(command === "changeTheme"){
          if(document.body.style.backgroundColor==="black")
          document.body.style ="background:white;"
          else
          document.body.style ="background:black;"
        }
      }
    })
  },[])

  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img src="https://pbs.twimg.com/profile_images/697158410425495556/0fjHbvX4.jpg" className={classes.alanLogo} alt="alan logo"></img>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
