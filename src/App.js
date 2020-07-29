import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'rc-pagination';

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
  height: 10vh;
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
`;

const CardsDiv = styled.div`
  height: auto;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  
`;

const Card = styled.div`
  height: auto;
  width: 16em;
  border: none;
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

const ReadMore = styled.p`
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
  font-size: 3em;
  font-weight: 800;
`;

const Footer = styled.p`
  font-size: 1em;
  font-weight: 600;
  bottom: 1px;
  text-align: center;
`;

const NameLink = styled.a`
  text-decoration: none;
  color: black;

  :hover {
    text-decoration: none;
    color: blue;
  }
`;

const Loading = styled.div`
  height: 50vh;
`;



function App() {
  const [data, setData] = useState({ hits: []});
  const [query, setQuery] = useState("gpt-3");
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=${query}`,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const changeQuery = event => {
    setQuery(event.target.value);
    setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
  }

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
        <center><Title>Hacker News</Title>*Search anything techie...</center>
      <SearchDiv>
        <Input 
          type='text'
          value={query}
          onChange={changeQuery}
        />
        <Button type='button' onClick={() => 
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
          }
        >Search</Button>
      </SearchDiv>
      <ContentDiv>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <CardsDiv>
            {data.hits.map(item => (
                <Link href={item.url} target='_blank' key={item.objectID}>
                  <Card>
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
      <Footer>Made with &#10084; by <NameLink href='https://kibuika.netlify.app/'>Steve Kibuika</NameLink></Footer>
    </MainDiv>
  )
}

export default App
