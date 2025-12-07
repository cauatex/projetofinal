//A biblioteca session cria uma sessão ao fazer login
//token de autenticação: coloca o usuário e a senha no login; o servidor recebe isso e um segredo e cria um token que é devolvido ao usuário
//para acessar páginas que exigem estar logado, deve-se enviar as credenciais e o token
//JOSE é uma biblioteca que faz a assinatura e cria o token 
//O token é como um ingresso de cinema; ele permite acessar páginas que exigem login

'use server'; //está do lado do servidor

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

async function abrirToken(token: string){
    //no arquivo oculto .env, foi criada uma chave TOKEN com um valor aleatório
    
    const chaveCodificada = new TextEncoder().encode(process.env.TOKEN); //chave para decodificar o token

    //a biblioteca jose verifica se existe um token válido e extrai o payload (carga util) dele
    try{
        const {payload} = await jwtVerify(token, chaveCodificada, {
            algorithms: ["HS256"],
        }); //retorna o payload do token (ID e email), decodificando o JWT recebido pela função e levando em conta o mesmo algoritmo utilizado na assinatura do token
        return payload;
    }
    catch(e){
        console.log('Erro ao verificar session token', e);
    }

}

//essa função recebe o ID e o email de um usuário e cria o token quando ele faz login
export async function criarToken(usuarioID: string, usuarioEmail: string){
    const chaveCodificada = new TextEncoder().encode(process.env.TOKEN); //codifica o token secreto de .env e o guarda em chaveCodificada. O TextEncode converte o TOKEN para um vetor de inteiros de 8 bits
    const tempoLimite = Date.now() + 3600; //o token expira em uma hora a partir de sua criação

    //cria a session, criptografa o ID, o email e o segredo e assina o token. ID e Email são o 'payload', os dados que queremos transferir
    //SignJWT cria o token JWT; setProtectedHeader define o cabeçalho do JWT; sign assina o token utilizando a chaveCodificada, tornando-o seguro
    const session = await new SignJWT({usuarioID, usuarioEmail}).setProtectedHeader({
        alg: 'HS256' //especifica o algoritmo de assinatura como HS256
    })
    .setExpirationTime('1h')
    .sign(chaveCodificada); //assina o token utilizando a chave codificada a partir do TOKEN

    //como a função criarToken é async, precisamos criar a listaDeCookies
    const listaDeCookies = await cookies();

    //por meio da listaDeCookies, conseguimos buscar (get) e salvar (set) cookies no navegador
    listaDeCookies.set('session', session, { //armazena o JWT recém criado no cookie
        expires: tempoLimite * 1000,
        path: '/',
        httpOnly: true //faz com que o cookie só possa ser lido pelo servidor http
    });
}

//função que verifica se o usuário está logado
export async function validarSessao(){
    const sessionCookie = (await cookies()).get('session'); //pega o token da fábrica de cookies
    if (sessionCookie){ //se o cookie existir
        const {value} = sessionCookie; //extrai o valor do token; value é um atributo do cookie
        const session = await abrirToken(value); //extrai o payload do cookie
        return session;
    }

    return false;
}

//função que deleta a sessão; desloga o usuário
export async function deletarSessao() {

    const listaDeCookies = await cookies(); //listaDeCookies guarda todos os cookies
    listaDeCookies.delete('session'); 
    //deleta da lista de cookies o cookie que possui o JWT, o token da sessão
}