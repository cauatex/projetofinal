//essa biblioteca vai abrir os arquivos; como não tem html, não precisa ter extensão .tsx
import {promises as fs} from 'fs';
import path from 'path';

async function retornarBD(arquivo: string): Promise<Array<any>>
{
    const caminhoDB = path.join(process.cwd(), 'src', 'app', 'db', arquivo); 
    const dados = await fs.readFile(caminhoDB, 'utf-8');  //o módulo fs é utilizado para permitir a leitura do arquivo JSON

    return JSON.parse(dados); // armazena o conteúdo da base de dados no vetor dados e devolve esse vetor como promessa
}

async function armazenarBD(arquivo:string, dados:any){
    const caminhoDB = path.join(process.cwd(), 'src', 'app', 'db', arquivo);
    await fs.writeFile(caminhoDB, JSON.stringify(dados, null, 2)) //sobrescreve o arquivo com o conteúdo do vetor dados
}

//funções que a biblioteca conexaoBD possui
const conexaoBD = {
    retornarBD,
    armazenarBD
}

export default conexaoBD;