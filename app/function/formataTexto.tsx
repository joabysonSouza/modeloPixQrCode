
 export default function formataTexto(texto: string): string {
  return texto
    .normalize("NFD") // separa acento
    .replace(/[\u0300-\u036f]/g, "") // remove acento
    .toUpperCase(); // tudo maiúsculo
}