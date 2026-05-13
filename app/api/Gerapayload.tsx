import formataTexto from "../function/formataTexto";



type PropsGerarPayloadPix = {
  chave: string;
  nome: string;
  cidade: string;
  valor?: undefined | string;
}; 


 export default function gerarPayloadPix({ chave, nome, cidade, valor }: PropsGerarPayloadPix) {

  function format(id: string, value: string) {
    const size = value.length.toString().padStart(2, "0");
    return id + size + value;
  }

  const nomeUppercase = formataTexto(nome).slice(0,25)

  const cidadeUppercase = formataTexto(cidade).slice(0,15)


  let payload =
    "000201" +
    format("26",
      format("00", "BR.GOV.BCB.PIX") +
      format("01", chave)
    ) +
    "52040000" +
    "5303986";

  if (valor) {
    payload += format("54", valor);
  }

  payload +=
    "5802BR" +
    format("59", nomeUppercase) +
    format("60", cidadeUppercase) +
    "62070503***";

  // CRC16
  function crc16(str:string) {
    let crc = 0xffff;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) !== 0 ? (crc << 1) ^ 0x1021 : crc << 1;
      }
    }
    return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
  }

  payload += "6304";
  payload += crc16(payload);

  return payload;
}

