import '@/app/styles/principal.css';

import Image from "next/image";

import conexaoBD from '../libs/conexao-bd';

const bd: string = 'filmes-db.json';

import Filme from "../ui/filme-card";

import Header from "../ui/header";

export default async function PaginaInicial() {

    const dados = await conexaoBD.retornarBD(bd);

    const filme = dados.map(f => {
        return <Filme {...f} key={f.id} />
    })



  return (
        <>
            <Header />

            <h1>CINE FILMES</h1>
            
            <div className="cards">
                {filme}
            </div>
                
            <div className="footer">
                <p>Feito com &hearts; por GitHub</p>
            </div>
        </>
  );
}
