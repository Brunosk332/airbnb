export function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");
  
    if (cpf.length !== 11) return false;
  
    // Rejeita CPFs com todos os dígitos iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
  
    // Valida os dois dígitos verificadores
    for (let i = 9; i < 11; i++) {
      let soma = 0;
  
      for (let j = 0; j < i; j++) {
        soma += Number(cpf[j]) * (i + 1 - j);
      }
  
      const resto = (soma * 10) % 11;
      const digito = resto === 10 ? 0 : resto;
  
      if (digito !== Number(cpf[i])) return false;
    }
  
    return true;
  }