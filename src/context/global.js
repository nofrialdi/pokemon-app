import { debounce } from "lodash";
import React, { createContext, useEffect, useReducer, useState } from "react";

const GlobalContext = createContext({});

//actions
const LOADING = "LOADING";
const GET_POKEMON = "GET_POKEMON";
const GET_ALL_POKEMON = "GET_ALL_POKEMON_DATA";
const GET_ALL_POKEMON_DATA = "GET_ALL_POKEMON_DATA";
const GET_SEARCH = "GET_SEARCH";
const SEARCH_POKEMON = "SEARCH_POKEMON";
const GET_POKEMON_DATABASE = "GET_POKEMON_DATABASE";
const NEXT = "NEXT";

//reducers
const reducer = (state, action) => {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_ALL_POKEMON:
			return {
				...state,
				allPokemon: action.payload,
				loading: false,
			};
		case GET_POKEMON:
			return {
				...state,
				pokemon: action.payload,
				loading: false,
			};
		case GET_POKEMON_DATABASE:
			return {
				...state,
				pokemonDataBase: action.payload,
				loading: false,
			};
		case GET_SEARCH:
			return {
				...state,
				searchResults: action.payload,
				loading: false,
			};
	}

	return state;
};

export const GlobalProvider = ({ children }) => {
	//base Url
	const baseUrl = "https://pokeapi.co/api/v2/";
	const initialState = {
		allPokemon: [],
		pokemon: {},
		pokemonDataBase: [],
		searchResults: [],
		next: "",
		loading: false,
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	const [allPokemonData, setAllpokemonData] = useState([]);

	const allPokemon = async () => {
		dispatch({ type: "LOADING" });

		const res = await fetch(`${baseUrl}pokemon?limit=20`);
		const data = await res.json();
		// console.log(data);
		dispatch({ type: GET_ALL_POKEMON, payload: data.results });

		//fetch caracters data
		const allPokemonData = [];

		for (const pokemon of data.results) {
			// console.log(pokemon);
			const pokemonRes = await fetch(pokemon.url);
			// console.log(pokemonRes);
			const pokemonData = await pokemonRes.json();
			// console.log(pokemonData);
			allPokemonData.push(pokemonData);
		}
		setAllpokemonData(allPokemonData);
	};

	//get pokemon
	const getPokemon = async (name) => {
		dispatch({ type: LOADING });

		const res = await fetch(`${baseUrl}pokemon/${name}`);
		const data = await res.json();
		dispatch({ type: GET_POKEMON, payload: data });
	};

	//get all pokemon data
	const getPokemonDatabase = async () => {
		dispatch({ type: LOADING });

		const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
		const data = await res.json();

		dispatch({ type: "GET_POKEMON_DATABASE", payload: data.results });
	};

	//realtime search
	const realTimeSearch = debounce(async (search) => {
		dispatch({ type: LOADING });
		//search pokemon database
		const res = state.pokemonDataBase.filter((pokemon) => {
			return pokemon.name.includes(search);
		});

		// console.log(search);
		dispatch({ type: "GET_SEARCH", payload: res });
		// console.log(res);
	}, 500);

	useEffect(() => {
		getPokemonDatabase();
		allPokemon();
	}, []);

	return (
		<GlobalContext.Provider value={{ ...state, allPokemonData, getPokemon, realTimeSearch }}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	return React.useContext(GlobalContext);
};
