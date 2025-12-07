import Image from "next/image";

import '@/app/styles/principal.css';

import UserInfo from "./user-info";
import LogoutButton from "./logout-btn";

import { validarSessao } from "../libs/session";

import Link from "next/link";

import lupa from 'public/lupa.png';
import logo from 'public/logo.png';

export default async function Header(){

    const logado = await validarSessao();

    let userEmail: string = "";

    //a variável logado pode vir como nula
    //se logado não for nulo, pega a propriedade userEmail dele; o email do usuário
    if(logado){
        userEmail = logado?.usuarioEmail as string; 
    }


    return(
        <header>
            <div className="div-logo">
                <div className="div-img-logo">
                    <Image 
                        src={logo}
                        alt="logo"
                        width={60}
                        height={60}
                    />
                </div>
    
                <p id="logo">Cine Filmes</p>
            </div>
           
            <form action="">
                <input type="text" id="filme" name="filme_selecionado" placeholder="Digite um filme que busca..."/>
    
                <button className="buscar">
                    <Image 
                        src={lupa}
                        alt="lupa"
                        className="lupa"
                        width={30}
                        height={30}
                    />
                </button>
            </form>

           

            <section>
                <Link href={'/principal/criar'} className="botao_adicionar">Adicionar</Link>
            </section>

            <section>

                {logado && <UserInfo userEmail={userEmail}/>} 
                {logado && <LogoutButton/>}
                
            </section>
        </header>
    )
}