const BR_TZ = "America/Sao_Paulo";
// retorna a data atual em uTc-3 
export function todayInBrasilia(): Date {
  // en-CA formata como YYYY-MM-DD
  const today = new Intl.DateTimeFormat("pt-BR", {
    timeZone: BR_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const [d, m, y] = today.split("/").map(Number);

  return new Date(y, m - 1, d);
}

// serve para adicionar dias a uma data
export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate()  + days) ;
  return d;
}

// formata a data para o padrao de data do brasil
export function formatDate(date: Date | null) {
  return date
    ? date.toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })
    : "Adicionar Data";
}

// retorna a data de amanhã em uTc-3
const currentDate = todayInBrasilia();
export function tomorrowInBrasilia(): Date {
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}