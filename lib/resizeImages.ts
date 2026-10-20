const MAX_WIDTH = 1280; // 4:3 -> 1280x960
const RATIO = 4 / 3;

export async function resizeImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);

  // área 4:3 centralizada na imagem original
  let sw = bitmap.width;
  let sh = bitmap.height;
  if (sw / sh > RATIO) {
    sw = sh * RATIO;
  } else {
    sh = sw / RATIO;
  }
  const sx = (bitmap.width - sw) / 2;
  const sy = (bitmap.height - sh) / 2;

  // reduz se for maior que 1280 de largura, sem ampliar
  const scale = Math.min(1, MAX_WIDTH / sw);
  const width = Math.round(sw * scale);
  const height = Math.round((width * 3) / 4);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponível");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.85)
  );
  if (!blob) throw new Error("Falha ao gerar a imagem");

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}