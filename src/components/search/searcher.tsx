import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importa el icono de búsqueda de react-icons/fa
import "./style.css";

interface Props {
  onSearch: (query: string) => void; // Cambié el tipo de onSearch a función que toma un string como argumento
}

const Searcher: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Llama a la función onSearch pasando la consulta como argumento
    onSearch(query);
  };

  return (
    <form className="search-primary" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Ingresa lo que quieras encontrar"
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className="button">
        <FaSearch />
      </button>
    </form>
  );
};

export default Searcher;
