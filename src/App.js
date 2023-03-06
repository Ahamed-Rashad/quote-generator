import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Twitter, FileCopy } from "@material-ui/icons";
import './App.css'

const useStyles = makeStyles({
  
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "60%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 4px 8px rgba(0, 0, 0, .1)",
  },
  quote: {
    fontSize: "1.5rem",
    lineHeight: 1.3,
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 16,
  },
  author: {
    fontSize: "1rem",
    fontWeight: 400,
    textAlign: "right",
    marginTop: 16,
  },
  button: {
    margin: "0 8px",
  },
});

function QuoteBox() {
  const classes = useStyles();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  }, []);

  const handleNewQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    alert("Quote copied to clipboard");
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote}" - ${author}`
  )}`;

  return (
    <div className="App">
      <h1 style={{ fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>Random Quote Generator</h1>
      <Box className={classes.box}>
        <h1 className={classes.quote}>{quote}</h1>
        <span className={classes.author}>- {author}</span>
        <br/>
        <div>
          <Button
            variant="contained"
            color="primary"
            href={twitterUrl}
            target="_blank"
            rel="noopener"
            startIcon={<Twitter />}
            className={classes.button}
          >
            Share
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            startIcon={<FileCopy />}
            className={classes.button}
          >
            Copy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewQuote}
            className={classes.button}
          >
            New Quote
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default QuoteBox;

