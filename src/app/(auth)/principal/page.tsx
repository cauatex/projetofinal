'use client';

import '@/app/styles/principal.css';

import { redirect } from "next/navigation";

import Image from "next/image";

import logo from 'public/logo.png';

import carrinho from 'public/shopping-cart-white-icon.webp';


export default function Home() {
  return (
    <header>
      <div className="div-logo">
        <div className="div-img-logo">
           <Image 
              src={logo}
              alt="logo"
            />
        </div>

        <p id="logo">Cine Filmes</p>
      </div>

      <form action="">
        <input type="text" id="filme" name="filme_selecionado" placeholder="Digite um filme que busca..."/>

        <button className="buscar">
          <Image 
            src="https://static.thenounproject.com/png/loupe-icon-2005735-512.png"
            alt="lupa"
          />
        </button>
      </form>

      <button className="botao_entrar">
        Entrar
      </button>

      <button className="botao_carrinho">
        <Image 
          src={carrinho}
          alt="carrinho"
        />
      </button>
    </header>
    

  )
}
