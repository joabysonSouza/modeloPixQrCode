"use client";

import { useState } from "react";
import QRCodeTeste from ".././app/images/qrcodeTeste.png";
import modeloPix from ".././app/images/modeloPix.jpg";
import gerarPayloadPix from "../app/api/Gerapayload";
import formatarChave from "./function/formatarChave";
import Image from "next/image";

export default function Home() {
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [tipoChave, setTipoChave] = useState("");

  const nomeTeste = "joao do vale serra";
  const chaveTeste = "75982318123";

  async function gerarQR() {
    if (!key || !name || !city) return;

    const payload = gerarPayloadPix({
      chave: formatarChave(key, tipoChave),
      nome: name,
      cidade: city,
      valor: amount,
    });

    //  TODO concerta o nome tem chave em ingels e depois em portugues
    //   const qr = await QRCode.toDataURL(payload);

    //   setQrCode(qr);
    //   setName("");
    //   setCity("");
    //   setAmount("");
    //   setTipoChave("");
    //   setKey("");
  }

  return (
    <div className="relative w-screen h-screen">
      <h1>Gerador de QR Code Pix</h1>

      <select
        name=""
        id=""
        value={tipoChave}
        onChange={(e) => setTipoChave(e.target.value)}
        className=" m-10 p-5"
      >
        <option value="">Selecione o tipo da chave</option>

        <option value="telefone">Telefone</option>
        <option value="email">Email</option>
        <option value="cpf">CPF</option>
        <option value="aleatória">Chave Aleatória</option>
      </select>

      <form className=" w-full h-full flex flex-col  ">
        <input
          placeholder="Chave Pix"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-175 p-5 m-10"
        />
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-175 p-5 m-10"
        />
        <input
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-175 p-5 m-10"
        />
        <input
          placeholder="Valor (opcional)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-175 p-5 m-10"
        />
        <div className="w-full flex justify-start m-8">
          <button onClick={gerarQR} className="curso-pointer">
            Gerar QR Code
          </button>
        </div>
      </form>
      <div >
        {/* Fundo do comprovante */}
        <Image
          src={modeloPix}
          alt="QR Code Pix"
          width={500}
          height={400}
          className="absolute top-10 right-40 z-0"
        />

        {/* Conteúdo em cima do comprovante */}
        <div className="absolute top-10 right-16 w-125 h-125 z-10">
          {/* QR Code */}
          <Image
            src={QRCodeTeste}
            alt="QR"
            className="absolute top-60  left-2 w-80"
          />

          {/* Nome */}
          <p className="absolute -bottom-32 left-25 text-red-500 font-bold text-2xl ">
            {nomeTeste}
          </p>

          {/* Chave Pix */}
          <p className="absolute -bottom-24 left-35 text-red-500 font-bold text-2xl">
            {chaveTeste}
          </p>
        </div>
      </div>
    </div>
  );
}

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "10px",
//     marginTop: "50px",
//   },
//   input: {
//     padding: "20px",
//     width: "700px",
//     gap: "20px",
//   },
//   button: {
//     padding: "10px 20px",
//     cursor: "pointer",
//   },
// };
