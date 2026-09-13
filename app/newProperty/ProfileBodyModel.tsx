import Image from "next/image";

export default function ProfileBody() {
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
        <form action="#" method="POST" className="flex flex-col gap-8">
          {/* TYPE */}
          <div>
            <label htmlFor="type" className="text-xl font-bold">
              Tipo de propriedade
            </label>

            <select
              name="type"
              id="type"
              defaultValue=""
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
            />
          </div>

          {/* PETS */}
          <div>
            <span className="text-xl font-bold">Permite animais?</span>

            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2">
                <input type="radio" name="allows_pets" value="true" />
                Sim
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="allows_pets"
                  value="false"
                  defaultChecked
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
                <input type="radio" name="has_wifi" value="true" />
                Sim
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_wifi"
                  value="false"
                  defaultChecked
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
                <input type="radio" name="has_parking" value="true" />
                Sim
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_parking"
                  value="false"
                  defaultChecked
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
            />
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
