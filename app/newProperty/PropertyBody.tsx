"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
export default function PropertyBody() {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [beds, setBeds] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [allowsPets, setAllowsPets] = useState("");
  const [hasWifi, setHasWifi] = useState("");
  const [hasParking, setHasParking] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { newProperty } = useAuth();
  // Imagens da propriedade //
  interface ImageWithCategory {
    file: File;
    category: string;
  }
  
  const [images, setImages] = useState<Record<string, File | null>>({
    CoverImage: null,
    BedroomImage: null,
    BathroomImage: null,
    KitchenImage: null,
    LivingRoomImage: null,
    ExteriorImage: null,
  });
  function handleImageChange(
    category: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0] ?? null;
        // Validar se o arquivo é uma imagem
    if( file && !file.type.startsWith("image/")) {
      setError("Por favor, envie apenas arquivos de imagem");
      return;
    }
    setImages((prev) => ({ ...prev, [category]: file }));

  }

  async function handlePropertySubmit(
    e: React.SyntheticEvent<HTMLFormElement>,
  ) {

    e.preventDefault();
    const formData = new FormData();
    formData.append("propertyType", propertyType);
    formData.append("location", location);
    formData.append("pricePerNight", pricePerNight);
    formData.append("maxGuests", maxGuests);
    formData.append("bedrooms", bedrooms);
    formData.append("beds", beds);
    formData.append("bathrooms", bathrooms);
    formData.append("allowsPets", allowsPets);
    formData.append("hasWifi", hasWifi);
    formData.append("hasParking", hasParking);
    formData.append("description", description);
    
    Object.entries(images).forEach(([category, file]) => {
      if (file) formData.append(category, file);
    });
    const result = await newProperty(formData);
    if(result.success) {
      router.push("/success");
    } else {
      setError(result.message || "não foi possível postar a propriedade");
    }
  }
  return (
    <div className="text-neutral-600">
      <div className="flex flex-col items-center text-center max-w-7xl mx-auto border-4 border-neutral-600 shadow-sm">
        <Image
          src="https://picsum.photos/3100/500?random=51"
          alt=""
          width={1600}
          height={900}
          className="object-contain justify-center items-center"
        />
      </div>

      <div className="flex flex-col items-center text-center max-w-7xl mx-auto mt-12">
        <h1 className="font-semibold text-3xl mb-6">Poste sua propriedade</h1>
      </div>

      <div className="max-w-3xl mx-auto mt-12 px-4">
        <form
          action="#"
          method="POST"
          className="flex flex-col gap-8"
          onSubmit={handlePropertySubmit}
        >
          {/* TYPE */}
          <div>
            <label htmlFor="type" className="text-xl font-bold">
              Tipo de propriedade
            </label>

            <select
              name="type"
              id="type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="block mt-2 border-2 border-neutral-500 rounded-lg p-3 w-full"
            >
              <option value="" disabled>
                Selecione um tipo de propriedade
              </option>

              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Casa-de-campo">Casa de campo</option>
              <option value="Cabana">Cabana</option>
              <option value="Loft">Loft</option>
              <option value="Quarto">Quarto</option>
              <option value="Hotel">Hotel</option>
              <option value="Condominio">Condomínio</option>
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label htmlFor="location" className="text-xl font-bold">
              Localização
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Ex: Belo Horizonte, MG"
              className="block mt-2 border-2 border-neutral-500 rounded-lg p-3 w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* PRICE */}
          <div>
            <label htmlFor="price_per_night" className="text-xl font-bold">
              Preço por noite
            </label>

            <input
              type="number"
              name="price_per_night"
              id="price_per_night"
              min="0"
              step="0.01"
              placeholder="Ex: 250.00"
              className="block mt-2 border-2 border-neutral-500 rounded-lg p-3 w-full"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
            />
          </div>

          {/* MAX GUESTS */}
          <div>
            <label htmlFor="max_guests" className="text-xl font-bold">
              Máximo de hóspedes
            </label>

            <input
              type="number"
              name="max_guests"
              id="max_guests"
              min="1"
              placeholder="Ex: 4"
              className="block mt-2 border-2 border-neutral-500 rounded-lg p-3 w-full"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>

          {/* BEDROOMS */}
          <div>
            <label htmlFor="bedrooms" className="text-xl font-bold">
              Quartos
            </label>

            <input
              type="number"
              name="bedrooms"
              id="bedrooms"
              min="0"
              placeholder="Ex: 2"
              className="block mt-2 border-2 border-neutral-500 rounded-lg p-3 w-full"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>

          {/* BEDS */}
          <div>
            <label htmlFor="bedrooms" className="text-xl font-bold">
              Camas
            </label>

            <input
              type="number"
              name="beds"
              id="beds"
              min="0"
              placeholder="Ex: 2"
              className="block mt-2 border-2 border-neutral-500 rounded-lg p-3 w-full"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            />
          </div>
          {/* BATHROOMS */}
          <div>
            <label htmlFor="bathrooms" className="text-xl font-bold">
              Banheiros
            </label>

            <input
              type="number"
              name="bathrooms"
              id="bathrooms"
              min="0"
              placeholder="Ex: 2"
              className="block mt-2 border-2 border-neutral-500 rounded-lg p-3 w-full"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />
          </div>

          {/* PETS */}
          <div>
            <span className="text-xl font-bold">Permite animais?</span>

            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="allows_pets"
                  value="true"
                  onChange={(e) => setAllowsPets(e.target.value)}
                />
                Sim
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="allows_pets"
                  value="false"
                  defaultChecked
                  onChange={(e) => setAllowsPets(e.target.value)}
                />
                Não
              </label>
            </div>
          </div>

          {/* WIFI */}
          <div>
            <span className="text-xl font-bold">Possui Wi-Fi?</span>

            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_wifi"
                  value="true"
                  onChange={(e) => setHasWifi(e.target.value)}
                />
                Sim
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_wifi"
                  value="false"
                  defaultChecked
                  onChange={(e) => setHasWifi(e.target.value)}
                />
                Não
              </label>
            </div>
          </div>

          {/* PARKING */}
          <div>
            <span className="text-xl font-bold">Possui estacionamento?</span>

            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_parking"
                  value="true"
                  onChange={(e) => setHasParking(e.target.value)}
                />
                Sim
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_parking"
                  value="false"
                  defaultChecked
                  onChange={(e) => setHasParking(e.target.value)}
                />
                Não
              </label>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label htmlFor="description" className="text-xl font-bold">
              Descrição
            </label>

            <textarea
              name="description"
              id="description"
              rows={6}
              placeholder="Descreva sua propriedade..."
              className="block mt-2 border-2 border-neutral-500 rounded-lg p-3 w-full resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* IMAGES */}
          <div className="flex flex-col items-center text-center max-w-7xl mx-auto mt-12">
            <h1 className="font-semibold text-3xl mb-6">
              Imagens da propriedade
            </h1>
            <div className="flex flex-col items-center text-center max-w-7xl mx-auto mt-12">
              <div className="flex flex-col rounded-lg p-6 text-sm">
                <p className="text-2xl">Imagem de capa</p>
                <input
                  type="file"
                  name="CoverImage"
                  className="font-semibold rounded-lg p-2 text-sm ml-5 bg-neutral-100"
                  onChange={(e) => handleImageChange("CoverImage", e)}
                />
              </div>

              <div className="flex flex-col rounded-lg p-6 text-sm">
                <p className="text-2xl">Imagem do quarto</p>
                <input
                  type="file"
                  name="BedroomImage"
                  className="font-semibold rounded-lg p-2 text-sm ml-5 bg-neutral-100"
                  onChange={(e) => handleImageChange("BedroomImage", e)}
                />
              </div>

              <div className="flex flex-col rounded-lg p-6 text-sm">
                <p className="text-2xl">Imagem do banheiro</p>
                <input
                  type="file"
                  name="BathroomImage"
                  className="font-semibold rounded-lg p-2 text-sm ml-5 bg-neutral-100"
                  onChange={(e) => handleImageChange("BathroomImage", e)}
                />
              </div>

              <div className="flex flex-col rounded-lg p-6 text-sm">
                <p className="text-2xl">Imagem da cozinha</p>
                <input
                  type="file"
                  name="KitchenImage"
                  className="font-semibold rounded-lg p-2 text-sm ml-5 bg-neutral-100"
                  onChange={(e) => handleImageChange("KitchenImage", e)}
                />
              </div>

              <div className="flex flex-col rounded-lg p-6 text-sm">
                <p className="text-2xl">Imagem da sala</p>
                <input
                  type="file"
                  name="LivingRoomImage"
                  className="font-semibold rounded-lg p-2 text-sm ml-5 bg-neutral-100"
                  onChange={(e) => handleImageChange("LivingRoomImage", e)}
                />
              </div>

              <div className="flex flex-col rounded-lg p-6 text-sm">
                <p className="text-2xl">Imagem externa</p>
                <input
                  type="file"
                  name="ExteriorImage"
                  className="font-semibold rounded-lg p-2 text-sm ml-5 bg-neutral-100"
                  onChange={(e) => handleImageChange("ExteriorImage", e)}
                />
              </div>
            </div>
          </div>
          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-neutral-800 text-white font-bold rounded-lg p-4 hover:bg-neutral-700"
          >
            Publicar propriedade
          </button>
        </form>
      </div>
    </div>
  );
}
