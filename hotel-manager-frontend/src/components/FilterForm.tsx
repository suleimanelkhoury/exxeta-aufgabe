import { filterRooms } from "../utils/api";

// Define props interface to receive `setRooms` function
interface FilterFormProps {
  setRooms: React.Dispatch<React.SetStateAction<any[]>>; // Function to update rooms state
}

const FilterForm: React.FC<FilterFormProps> = ({ setRooms }) => {
  // Handles form submission and filters rooms
  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.target as HTMLFormElement);
    const query = new URLSearchParams(formData as any).toString(); // Convert form data to query string

    try {
      // Make API call to filter rooms based on the query
      const data = await filterRooms(query);
      setRooms(data); // Update the room list based on the filtered results
    } catch (error) {
      console.error("Error filtering rooms:", error);
    }
  };

  return (
    <form onSubmit={handleFilter} className="mb-4">
      {/* Filter form fields */}
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
