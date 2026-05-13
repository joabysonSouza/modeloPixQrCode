export default function formatarChave(chave: string , tipoChave:string): string {

  if (tipoChave === "telefone") {
    const numeros = chave.replace(/\D/g, "");

    return "+55" + numeros;
  }

  if (tipoChave === "cpf") {
    return chave.replace(/\D/g, "");
  }

  return chave.trim();
}