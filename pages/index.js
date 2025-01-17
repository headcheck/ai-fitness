import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import twitterLogo from '../assets/twitter-logo.svg';
import { useState } from 'react';

// Constants
const TWITTER_HANDLE = "headcheck";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Home = () => {
    const [userInput, setUserInput] = useState('');
    const [apiOutput, setApiOutput] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    const callGenerateEndpoint = async () => {
        setIsGenerating(true);

        console.log("Calling OpenAI...")
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        const { output } = data;
        console.log("OpenAI replied...", output.text)

        setApiOutput(`${output.text}`);
            setIsGenerating(false);
    }

    const onUserChangedText = (event) => {
        setUserInput(event.target.value);
    };
  return (
    <div className="root">
      <Head>
        <title>Who's Your Donor</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Who's Your Donor?</h1>
          </div>
          <div className="header-subtitle">
            <h2>Enter the name of a campaign candidate to find out</h2>
          </div>
        </div>
        <div className="prompt-container">
            <textarea placeholder="enter name of campaign candidate here" className="prompt-box" value={userInput}
                onChange={onUserChangedText}/>
        </div>
        <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}>
              <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Fetch Donors</p>}
              </div>
          </a>
        </div>
          {apiOutput && (
                  <div className="output">
                      <div className="output-header-container">
                          <div className="output-header">
                              <h3>Output</h3>
                          </div>
                      </div>
                      <div className="output-content">
                          <p>{apiOutput}</p>
                      </div>
                  </div>
      )}
      </div>


      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>

    <div className="footer-container">
        <a
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
        >
            <div className="badge">
                <Image src={twitterLogo} alt="twitter logo" />
                <p>{`@${TWITTER_HANDLE}`}</p>
            </div>
        </a>
    </div>

        <div className="footer-container-right">
            <a
                href="https://github.com/headcheck/gpt3-writer-extension"
                target="_blank"
                rel="noreferrer">Download Chrome Extension</a>
        </div>


    </div>
  );
};

export default Home;
