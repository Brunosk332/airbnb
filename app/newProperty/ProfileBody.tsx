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
      <div className="flex flex-col items-center text-center max-w-7xl mx-auto mt-12">
        <form
          action="POST"
          className="flex flex-col items-center text-center mx-auto"
        >
          <label htmlFor="propertyType" className="text-neutral-600">
            <span className="text-xl font-bold">Tipo de propriedade:</span>
            <select
              name="propertyType"
              id="propertyType"
              defaultValue=""
              className="border-2 border-neutral-500 font-semibold rounded-lg p-2 text-sm ml-5"
            >
              <option value="" disabled>
                Selecione um tipo depropriedade
              </option>

              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Casa-de-campo">Casa de campo</option>
              <option value="Cabana">Cabana</option>
              <option value="Loft">Loft</option>
              <option value="Quarto">Quarto</option>
              <option value="Hotel">Hotel</option>
              <option value="Condominio">Condominio</option>
            </select>
          </label>
        </form>
      </div>
    </div>
  );
}
