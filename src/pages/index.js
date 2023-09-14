import { useGlobalContext } from "@/context/global";

export default function Home() {
	const { allPokemonData } = useGlobalContext();
	console.log(allPokemonData);
	return <main></main>;
}
