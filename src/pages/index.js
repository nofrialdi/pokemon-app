import { useState } from "react";
import { useGlobalContext } from "@/context/global";
import Router from "next/router";

export default function Home() {
	const { allPokemonData } = useGlobalContext();
	// console.log(allPokemonData);

	const [search, setSearch] = useState("");

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};
	return (
		<main>
			<form action="" className="search-form">
				<div className="input-control">
					<input
						type="text"
						value={search}
						onChange={handleSearch}
						placeholder="Search for a Pokemon..."
					/>
					<button className="submit-btn" type="submit">
						Search
					</button>
				</div>
			</form>
			{search && <div className="search-results"></div>}
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
									<h1>{pokemon.name}</h1>
									<p>More Detail &nbsp;&rarr;</p>
								</div>
							</div>
						);
					})
				) : (
					<h1>Loading...</h1>
				)}
			</div>
		</main>
	);
}
