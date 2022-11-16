import React, { useState } from "react";
import styled from 'styled-components';
import "./App.css";
import searchIcon from './search-icons.svg';
import MovieComponent from './components/MovieComponent';

import MovieInfoComponent from './components/MovieInfoComponent';
import Axios from "axios";

export const API_KEY = "b721f669";
const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Header = styled.div`
background-color: black;
color: white;
display: flex;
justify-content: space-between;
flex-direction: row;
align-items: center;
padding: 15px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 13px 13px;
  border-radius: 20px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const SearchIcon = styled.img`
  width: 15px;
  height: 15px;
`;


const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  opacity : 0.8;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;




function App() {
	const [searchQuery, updateSearchQuery] = useState();

	const [movieList, updateMovieList] = useState([]);
	const [selectedMovie, onMovieSelect] = useState();
  
	const [timeoutId, updateTimeoutId] = useState();

	const fetchData = async (searchString) => {
	  const response = await Axios.get(
		`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
	  );
	  updateMovieList(response.data.Search);
	};
  
	const onTextChange = (e) => {
	  onMovieSelect("")
	  clearTimeout(timeoutId);
	  updateSearchQuery(e.target.value);
	  const timeout = setTimeout(() => fetchData(e.target.value), 500);
	  updateTimeoutId(timeout);
	};

	return(
	<Container>
		<Header>
			<AppName>
				 Movie App
			</AppName>
			<SearchBox>
             <SearchIcon src={searchIcon} />
             <SearchInput placeholder="Search Movie Here..." value={searchQuery} onChange={onTextChange} >
			 </SearchInput>   
			</SearchBox>
		</Header>
		{selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
		<MovieListContainer>
		{movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          "No Movie Search."
        )}
			
		</MovieListContainer>
		</Container>
        
	
	)       

}

export default App;
