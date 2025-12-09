import Image from "next/image";

import '@/app/styles/principal.css';

import UserInfo from "./user-info";
import LogoutButton from "./logout-btn";
import axios from "axios";

import { validarSessao } from "../libs/session";

import Link from "next/link";

import logo from 'public/logo.png';


export default async function Header(){

    const logado = await validarSessao(); //retona o payload dos coockies ou false se a sessão não for validada

    let userEmail: string = "";

    //a variável logado pode vir como nula
    //se logado não for nulo, pega a propriedade usuarioEmail dele; o email do usuário
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
    
                <p id="logo">ine Filmes</p>
            </div>

            <section>
                <Link href={'/principal/criar'}><button  className="botao_adicionar">Adicionar</button></Link>
                {logado && <UserInfo userEmail={userEmail}/>} 
                {logado && <LogoutButton/>}
                
            </section>
        </header>
    )
}