import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 960; // 4:3
const MAX_INPUT_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function resizeTo4x3(input: Buffer): Promise<Buffer> {
  // aplica a orientação EXIF antes de medir a imagem
  const rotated = await sharp(input).rotate().toBuffer();
  const { width, height } = await sharp(rotated).metadata();
  if (!width || !height) throw new Error("Imagem inválida");

  // maior área 4:3 possível, centralizada
  let cropW = width;
  let cropH = height;
  if (width / height > 4 / 3) {
    cropW = Math.floor((height * 4) / 3);
  } else {
    cropH = Math.floor((width * 3) / 4);
  }
  const left = Math.floor((width - cropW) / 2);
  const top = Math.floor((height - cropH) / 2);

  return sharp(rotated)
    .extract({ left, top, width: cropW, height: cropH })
    .resize({
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      fit: "inside", 
      withoutEnlargement: true,
    })
    .flatten({ background: "#ffffff" }) // coloca fundo branco em png transparente
    .webp({ quality: 85 })  // transforma o arquivo em webp
    .toBuffer(); // transforma o arquivo em buffer
}

export async function uploadToCloudinary(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Tipo de arquivo não permitido");
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error("Imagem muito grande");
  }

  const original = Buffer.from(await file.arrayBuffer());
  const buffer = await resizeTo4x3(original);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "airbnb-clone", resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          return reject(error ?? new Error("Upload sem resultado"));
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

export default cloudinary;