'use client';

import '@/app/styles/principal.css';

import { redirect } from "next/navigation";

import Image from "next/image";


export default function Inicial() {
  return (
    <>
        <header>
            <div className="div-logo">
                <div className="div-img-logo">
                <Image 
                    src="/logo.png"
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
                        src="/lupa.png"
                        alt="lupa"
                        className="lupa"
                        width={30}
                        height={30}
                    />
                </button>
            </form>

            <button className="botao_logout">
                Logout
            </button>

            <button className="botao_adicionar">
                Adicionar
            </button>
        </header>

        <main>
            <h1>CINE FILMES</h1>

            <div className="cards"> 

                <div className="card"> 
                    <div className="img_card"> 
                        <Image 
                            src="/filme1.jpg"
                            alt="filme1"
                            width={300}
                            height={300}
                        />
                    </div>

                    <div className="conteudo">
                        <p className="titulo">Nunca Mais</p>

                        <p>Preço: R$ 15,00</p>

                        <p className="descricao">A garçonete Slim tem sua vida transformada ao se casar com o rico empreiteiro Mitch. Em sua nova vida suburbana, ela parece ter tudo o que deseja. No entanto, seu sonho sofre um revés quando ela descobre que não tem o marido perfeito que pensava.</p>

                        <button>Comprar</button>
                    </div>
                </div>

                <div className="card"> 
                    <div className="img_card"> 
                        <Image 
                            src="/filme2.jpeg"
                            alt="filme2"
                            width={300}
                            height={300}
                        />
                    </div>

                    <div className="conteudo">
                        <p className="titulo">Lilo e Stitch</p>

                        <p>Preço R$ 10,00</p>

                        <p className="descricao">Stitch, um alienígena, chega ao planeta Terra após fugir de sua prisão e tenta se passar por um cachorro para se camuflar. As coisas mudam quando Lilo, uma travessa menina, o adota de um abrigo de animais. Juntos, eles aprendem os valores da amizade e família.</p>
                        
                        <button>Comprar</button>
                    </div>
                </div>

                <div className="card"> 
                    <div className="img_card"> 
                        <Image 
                            src="/filme3.jpeg"
                            alt="filme3"
                            width={300}
                            height={300}
                        />
                    
                    </div>

                    <div className="conteudo">
                        <p className="titulo">Divertidamente 2</p>

                        <p>Preço R$ 15,00</p>

                        <p className="descricao">Riley se encontra mais velha, passando pela tão temida adolescência. Junto com o amadurecimento, a sala de controle também está passando por uma adaptação para dar lugar a novas emoções. As antigas emoções não sabem como se sentir quando novos inquilinos chegam ao local.</p>
                        
                        <button>Comprar</button>
                    </div>
                </div>

            </div>   
        </main>

        <footer className="footer">
            <p>Feito com &hearts; por GitHub</p>
        </footer>
    </>
  );
}
