import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

const MainDiv = styled.div`
  height: auto;
  width: auto;
  padding: 3em;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background-color: yellow;
`;

const SearchDiv = styled.div`
  height: 20vh;
  width: auto;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  height: 3em;
  width: 20em;
  border-radius: 18px;
  border: .5px solid black;
  padding-left: 1em;
  font-size: .8em;

  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  height: 3em;
  width: 8em;
  margin-left: 1em;
  font-size: .8em;
  border-radius: 18px;
  border: none;
  background-color: blue;
  color: white;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

const ContentDiv = styled.div`
  height: auto;
  width: auto;
`;

const CardsDiv = styled.div`
  height: auto;
  width: 90%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  
`;

const Card = styled.div`
  height: auto;
  width: 16em;
  border: 1px solid black;
  border-radius: 5px;
  margin: .5em;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .5);
  background-color: white;

  :hover {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, .8);

  }

`;

const CardContent = styled.div`
  margin: .5em;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const CardTitle = styled.h3`
  font-size: 1.3em;
  margin: .5em;
  color: black;
`;

const ReadMore = styled.a`
  margin: .5em;
  text-decoration: none;
  color: gray;

  :hover {
    font-size: .8em;
    color: blue;
  }
`;

const Link = styled.a`
  text-decoration: none;
  
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 800;
`;



function App() {
  const [data, setData] = useState({ hits: []});
  const [query, setQuery] = useState("gpt-3");
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=gpt-3',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      
      setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <MainDiv>
        <center><Title>Hacker News</Title></center>
      <SearchDiv>
        <Input 
          type='text'
          value={''}
          onChange={event => setQuery(event.target.value)}
          placeholder='Search for a topic..eg(GPT-3)'
        />
        <Button type='button' onClick={() => 
            setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
          }
        >Search</Button>
      </SearchDiv>
      <ContentDiv>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CardsDiv>
            {data.hits.map(item => (
              <Link href={item.url} target='_blank'>
                <Card key={item.objectID}>
                  <CardContent>
                    <CardTitle>{item.title}</CardTitle>
                    <ReadMore href={item.url} target='_blank'>Read More &#8594;</ReadMore>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </CardsDiv>
        )}
      </ContentDiv>
    </MainDiv>
  )
}

export default App
