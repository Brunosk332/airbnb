import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { uploadToCloudinary } from "@/lib/cloudinary";
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  // Form Data //
  const formData = await request.formData();
  const type = formData.get("propertyType") as string;
  const location = formData.get("location") as string;
  const pricePerNight = Number(formData.get("pricePerNight"));
  const maxGuests = Number(formData.get("maxGuests"));
  const bedrooms = Number(formData.get("bedrooms"));
  const bathrooms = Number(formData.get("bathrooms"));
  const allowsPets = formData.get("allowsPets") === "true";
  const hasWifi = formData.get("hasWifi") === "true";
  const hasParking = formData.get("hasParking") === "true";
  const description = formData.get("description") as string;
  // Images //
  const coverImage = formData.get("CoverImage") as File | null;
  const bedroomImage = formData.get("BedroomImage") as File | null;
  const bathroomImage = formData.get("BathroomImage") as File | null;
  const kitchenImage = formData.get("KitchenImage") as File | null;
  const livingRoomImage = formData.get("LivingRoomImage") as File | null;
  const exteriorImage = formData.get("ExteriorImage") as File | null;

  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  if (!sessionToken) {
    return NextResponse.json(
      { error: "Nenhum usuário autenticado" },
      { status: 401 },
    );
  }
  console.log({
    type,
    location,
    pricePerNight,
    maxGuests,
    bedrooms,
    bathrooms,
    description,
    coverImage,
    bedroomImage,
    bathroomImage,
    exteriorImage,
  });
  if (
    !type?.trim() ||
    !location?.trim() ||
    !pricePerNight ||
    pricePerNight <= 0 ||
    !maxGuests ||
    maxGuests <= 0 ||
    !bedrooms ||
    bedrooms <= 0 ||
    !bathrooms ||
    bathrooms <= 0 ||
    !description?.trim() ||
    !coverImage ||
    !bedroomImage ||
    !bathroomImage ||
    !exteriorImage
  ) {
    return NextResponse.json(
      {
        error: "Preencha todos os campos obrigatórios",
      },
      { status: 400 },
    );
  }

  try {
    console.log("teste123012738917289317892");
    const verifyUser = await pool.query(
      `SELECT * FROM airbnb.sessions WHERE session_token = $1`,
      [sessionToken],
    );
    if (verifyUser.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 401 },
      );
    }
    console.log("teste2");
    const verifyUserHost = await pool.query(
      `SELECT is_host FROM airbnb.users WHERE id = $1`,
      [verifyUser.rows[0].user_id],
    );
    if (verifyUserHost.rows[0].is_host === false) {
      return NextResponse.json(
        { error: "Usuário não é anfitrião" },
        { status: 401 },
      );
    }
    // Upload para o  cloudinary //
    async function uploadImages(images: Record<string, File | null>) {
      const uploaded: Record<string, string> = {};
      for (const [category, file] of Object.entries(images)) {
        if (!file) continue;

        const url = await uploadToCloudinary(file);
        uploaded[category] = url;
      }
      return uploaded;
    }
    // Url das imagens do cloudinary //
    const imageUrl = await uploadImages({
      cover: coverImage,
      bedroom: bedroomImage,
      bathroom: bathroomImage,
      kitchen: kitchenImage,
      living_room: livingRoomImage,
      exterior: exteriorImage,
    });

    console.log("teste3");
    // insert da propriedade no banco de dados
    const newProperty = await pool.query(
      `INSERT INTO airbnb.properties (host_id,type, location, price_per_night, max_guests, bedrooms, bathrooms, allows_pets, has_wifi, has_parking, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`,
      [
        verifyUser.rows[0].user_id,
        type,
        location,
        pricePerNight,
        maxGuests,
        bedrooms,
        bathrooms,
        allowsPets,
        hasWifi,
        hasParking,
        description,
      ],
    );
    // id da propriedade 
    const propertyId = newProperty.rows[0].id;
    // insert opara imagens 
    for (const [category, url] of Object.entries(imageUrl)) {
      await pool.query(
        `INSERT into airbnb.images (property_id, url, category) VALUES ($1, $2, $3)`,
        [propertyId, url, category],
      );
    }
    return NextResponse.json(newProperty.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Ocorreu um erro ao salvar a propriedade",
      },
      {
        status: 500,
      },
    );
  }
}
