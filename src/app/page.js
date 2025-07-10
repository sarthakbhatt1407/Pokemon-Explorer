"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Provider } from "@/components/ui/provider";
import MainHome from "../pages/mainhome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonsDetails from "@/pages/pokeDetails";

export default function Home() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/pokemon/:id" element={<PokemonsDetails />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}
