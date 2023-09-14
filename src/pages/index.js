import { Inter } from "next/font/google";
import { useGlobalContext } from "@/context/global";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const global = useGlobalContext();
	console.log(global);
	return <main></main>;
}
