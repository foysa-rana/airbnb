import { useHeaderContext } from "@/context/headerContext";

const AddGuest = () => {
  const { adults, children, infants, pets, handleIncrement, handleDecrement } =
    useHeaderContext();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg absolute right-0 top-20 w-96">
      {/* Adults */}
      <div className="flex justify-between items-center py-5 border-b-[1px]">
        <div>
          <p className="font-semibold">Adults</p>
          <p className="text-gray-500 text-sm">Ages 13 or above</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleDecrement("adults")}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200"
          >
            -
          </button>
          <span>{adults}</span>
          <button
            onClick={() => handleIncrement("adults")}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="flex justify-between items-center py-5 border-b-[1px]">
        <div>
          <p className="font-semibold">Children</p>
          <p className="text-gray-500 text-sm">Ages 2 – 12</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleDecrement("children")}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200"
          >
            -
          </button>
          <span>{children}</span>
          <button
            onClick={() => handleIncrement("children")}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>

      {/* Infants */}
      <div className="flex justify-between items-center py-5 border-b-[1px]">
        <div>
          <p className="font-semibold">Infants</p>
          <p className="text-gray-500 text-sm">Under 2</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleDecrement("infants")}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200"
          >
            -
          </button>
          <span>{infants}</span>
          <button
            onClick={() => handleIncrement("infants")}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>

      {/* Pets */}
      <div className="flex justify-between items-center py-5">
        <div>
          <p className="font-semibold">Pets</p>
          <p className="text-gray-500 text-sm">Bringing a service animal?</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleDecrement("pets")}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200"
          >
            -
          </button>
          <span>{pets}</span>
          <button
            onClick={() => handleIncrement("pets")}
            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGuest;
