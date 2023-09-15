import { useState } from "react";
import { useGlobalContext } from "@/context/global";
import Router from "next/router";
import Image from "next/image";

// import { logo } from "../public/logo_Pokemon.png";

export default function Home() {
	const { allPokemonData, searchResults, next, getPokemon, loading, realTimeSearch } =
		useGlobalContext();

	const [search, setSearch] = useState("");

	const handleChange = (e) => {
		setSearch(e.target.value);

		realTimeSearch(search);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		realTimeSearch(search);
	};

	const displaySearchResults = () => {
		return searchResults.map((pokemon) => {
			return (
				<div
					key={pokemon.id}
					onClick={() => {
						Router.push(`/pokemon/${pokemon.name}`);
					}}
					className="pokemon-name"
				>
					{pokemon.name}
				</div>
			);
		});
	};

	return (
		<main>
			<div className="header">
				<div className="title">
					<Image src="/logo_Pokemon.png" layout="fixed" width={250} height={100} />
				</div>
				<form action="" className="search-form" onSubmit={handleSearch}>
					<div className="input-control">
						<input
							type="text"
							value={search}
							onChange={handleChange}
							placeholder="Search for a Pokemon..."
						/>
						<button className="submit-btn" type="submit">
							Search
						</button>
					</div>
				</form>
			</div>

			{search && searchResults.length > 0 && (
				<div className="search-results">{displaySearchResults()}</div>
			)}

			<div className="all-pokemon">
				{allPokemonData ? (
					allPokemonData.map((pokemon) => {
						return (
							<div
								key={pokemon.id}
								className="card"
								onClick={() => {
									Router.push(`/pokemon/${pokemon.name}`);
								}}
							>
								<div className="card-image">
									<img src={pokemon.sprites.other.home.front_shiny} alt={pokemon.name} />
								</div>
								<div className="card-body">
									<h3>{pokemon.name}</h3>
									<p>More Details &nbsp; &rarr;</p>
								</div>
							</div>
						);
					})
				) : (
					<h1>Loading...</h1>
				)}
			</div>

			<div className="next">
				{allPokemonData.length > 0 && (
					<button className="next-btn" onClick={next}>
						Load More &darr;
					</button>
				)}
			</div>
		</main>
	);
}
