"use client";



//definição do tipo de cada variável que a função vai receber
interface Props {
  nome: string;
  descricao: string;
  imgSrc: string;
}

export default function CharacterCard({ nome, descricao, imgSrc }: Props) {
  return (
    <section className="character-card">
      <h2>{nome}</h2>
      <img src={imgSrc} alt="Foto do personagem" />
      <p>{descricao}</p>
    </section>
  );
}