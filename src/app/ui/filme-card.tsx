import Link from "next/link";
import Image from "next/image";

import {redirect} from "next/navigation";
import conexaoBD from "../libs/conexao-bd";

//crio uma struct chamada Filme
export interface FilmeProps{
    id: string,
    nome: string,
    img: string,
    descricao: string,
}

//props recebe um objeto do tipo Filme, que contém todas as informações que estarão no card
export default function Filme(props: FilmeProps){

    const deletarFilme = async () => {

        'use server'

        const bd: string = 'filmes-db.json';
        const filme = await conexaoBD.retornarBD(bd);

        //o filme que vai ser removido
        const filmeToRemove = filme.findIndex((f) => f.id === props.id); //props é o objeto filme

        filme.splice(filmeToRemove, 1); //splice: a partir de qual indice e quantos vai remover, 1 só

        await conexaoBD.armazenarBD(bd, filme); //sobreescreve o arquivo JSON com a nova lista, sem o filme que acabei de remover
        
        redirect('/principal'); //refresh na página, redireciona ora page.tsx
    }

    return(
        <div>
            <h2>{props.nome}</h2>

            <Image
                src={props.img}
                alt={`Imagem do filme ${props.nome}`}
                width={200}
                height={200}
            />

            <p>{props.descricao}</p>

            <div>
                <Link href={`/principal/editar/${props.id}`} id="btn-editar">Editar</Link>

                <form action={deletarFilme}>
                    <button id="btn-deletar">Deletar</button>
                </form>
            </div>

        </div>
    )
}

//editar é uma página rteável parametrizada, vou editar 1 filme específico, identificado pelo id
//crio uma rota dinâmica passando o id do filme junto da rota