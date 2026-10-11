const BR_TZ = "America/Sao_Paulo";
export function todayInBrasilia(): Date {
  // en-CA formata como YYYY-MM-DD
  const today = new Intl.DateTimeFormat("pt-BR", {
    timeZone: BR_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const [d, m, y] = today.split("/").map(Number);

  // meia-noite do proximo dia em uTc-3
  return new Date(y, m - 1, d);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate()  + days) ;
  return d;
}
export function formatDate(date: Date | null) {
  return date
    ? date.toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })
    : "Adicionar Data";
}

const currentDate = todayInBrasilia();
export function tomorrowInBrasilia(): Date {
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}