import { filterVehicles } from "../utils/api";

interface FilterFormProps {
  setVehicles: React.Dispatch<React.SetStateAction<any[]>>;
}

const FilterForm: React.FC<FilterFormProps> = ({ setVehicles }) => {
  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = new URLSearchParams(formData as any).toString();

    try {
      const data = await filterVehicles(query);
      setVehicles(data);
    } catch (error) {
      console.error("Error filtering vehicles:", error);
    }
  };

  return (
    <form onSubmit={handleFilter} className="mb-4">
      <label>
        Make:
        <input type="text" name="make" className="ml-2 border p-1" />
      </label>
      <label className="ml-4">
        Model:
        <input type="text" name="model" className="ml-2 border p-1" />
      </label>
      <label className="ml-4">
        Transmission:
        <select name="transmission" className="ml-2 border p-1">
          <option value="">Any</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </label>
      <button type="submit" className="ml-4 bg-blue-500 text-white px-2 py-1">
        Filter
      </button>
    </form>
  );
};

export default FilterForm;
