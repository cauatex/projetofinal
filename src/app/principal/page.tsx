import '@/app/styles/principal.css';

import Image from "next/image";

import conexaoBD from '../libs/conexao-bd';

const bd: string = 'filmes-db.json';

import Filme from "../ui/filme-card";

import Header from "../ui/header";

export default async function PaginaInicial() {

    const dados = await conexaoBD.retornarBD(bd); //guarda os dados contidos no filmes-db.json no vetor dados

    //cria o vetor de filmes; .map itera sobre todos os itens de dados
    const filmes = dados.map(f => {
        return <Filme {...f} key={f.id} /> //retorna a estrutura/objeto Filme com todos os atributos de f, que itera sobre o vetor dados inteiro
    })

  return (
        <section className='conteudo-pagina'>
            <Header />

            <h1 className='titulo-principal'>CINE FILMES</h1>
            
            <div className="cards">
                {filmes}
            </div>
                
            <div className="footer">
                <p>Feito com &hearts; por GitHub</p>
            </div>
        </section>
  );
}
