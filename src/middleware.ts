//middleware é um arquivo do próprio NEXT, ele é o meio das requisições

import { validarSessao } from "@/app/libs/session";
import { NextRequest, NextResponse } from "next/server";

//regex retirada diretamente da documentação do NextJS
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

//rotas onde não quero que faça autenticação
const rotasPublicas = [
    '/',
    '/login',
    '/cadastro'
]


//a função recebe a requisição
export async function middleware(req: NextRequest){

    const pathname = req.nextUrl.pathname; //pega o nome da rota

    //verifica se a requisição possui credenciais válidas para criar uma sessão
    const sessao = await validarSessao(); //se já estiver logado vai retornar True

    //se o vetor de rotas públicas incluir aquela rota e o usuário já está logado
    //força a ir para a página principal
    if(rotasPublicas.includes(pathname) && sessao){
        return NextResponse.redirect(new URL('/principal', req.nextUrl));
    }

    //se não está logado e quer acessar uma rota que não é pública, é direcionado para a página de login
    if(!sessao && !rotasPublicas.includes(pathname)){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next();
}