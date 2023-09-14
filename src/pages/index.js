import { useGlobalContext } from "@/context/global";

export default function Home() {
	const { allPokemonData } = useGlobalContext();
	// console.log(allPokemonData);
	return (
		<main>
			<div className="all-pokemon">
				{allPokemonData ? (
					allPokemonData.map((pokemon) => {
						return (
							<div key={pokemon.id} className="pokemon">
								<div className="card-image">
									<img src={pokemon.sprites.other.home.front_shiny} alt={pokemon.name} />
								</div>
								<div className="card-body">
									<h1>{pokemon.name}</h1>
								</div>
								<div>
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
