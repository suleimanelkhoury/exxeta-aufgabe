import { filterRooms } from "../utils/api";

interface FilterFormProps {
  setRooms: React.Dispatch<React.SetStateAction<any[]>>;
}

const FilterForm: React.FC<FilterFormProps> = ({ setRooms }) => {
  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = new URLSearchParams(formData as any).toString();

    // Make API call to filter rooms
    try {
      const data = await filterRooms(query);
      setRooms(data); // Update room list with filtered results
    } catch (error) {
      console.error("Error filtering rooms:", error);
    }
  };

  return (
    <form onSubmit={handleFilter} className="mb-4">
      <label>
        Room Size:
        <select name="room_size" className="ml-2">
          <option value="">All</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
      </label>
      <label className="ml-4">
        Has Minibar:
        <select name="has_minibar" className="ml-2">
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <button type="submit" className="ml-4 bg-blue-500 text-white px-2 py-1">
        Filter
      </button>
    </form>
  );
};

export default FilterForm;