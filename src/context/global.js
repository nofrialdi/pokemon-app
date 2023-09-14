import React, { createContext, useEffect, useReducer } from "react";

const GlobalContext = createContext({});

//reducers
const reducer = (state, action) => {
	return state;
};

export const GlobalProvider = ({ children }) => {
	//base Url
	const baseUrl = "https://pokeapi.co/api/v2/";
	const initialState = {
		allPokemon: [],
		pokemon: {},
		pokemonDataBase: [],
		searchResult: [],
		next: "",
		loading: false,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const allPokemon = async () => {
		const res = await fetch(`${baseUrl}pokemon?limit=20`);
		const data = await res.json();
		console.log(data);
	};

	useEffect(() => {
		allPokemon();
	}, []);

	return <GlobalContext.Provider value={{ ...state }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
	return React.useContext(GlobalContext);
};
