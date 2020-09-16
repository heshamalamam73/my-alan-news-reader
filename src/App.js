import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewCards from "./components/newscards/NewCards";
import useStyles from "./styles.js";
import wordsToNumbers from "words-to-numbers";
const alanKey =
  "33237ef6ac0d7f686a7fcfc1bbc560552e956eca572e1d8b807a3e2338fdd0dc/stage";
const alanLogoSrc = "https://alan.app/voice/images/previews/preview.jpg";

const App = () => {
  const [newArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadLines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText("please try that again . ");
          } else if (article) {
            window.open(articles[number].url, "_blank");
            alanBtn().playText("opining ..");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={alanLogoSrc} className={classes.alanLogo} />
      </div>
      <NewCards articles={newArticles} activeArticle={activeArticle} />
    </div>
  );
};
export default App;
