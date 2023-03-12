import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Temp from "./components/Temp";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Temp />
      <Hero />
      <hr />
    </>
  );
}