import { useEffect, useState } from "react";

function lerFavoritos() {
  try {
    const guardados = JSON.parse(localStorage.getItem("favoritos"));
    return Array.isArray(guardados) ? guardados : [];
  } catch {
    return [];
  }
}

export default function useFavoritos() {
  const [favoritos, setFavoritos] = useState(lerFavoritos);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  function toggleFavorito(id) {
    setFavoritos((favoritosAtuais) => {
      if (favoritosAtuais.includes(id)) {
        return favoritosAtuais.filter((favoritoId) => favoritoId !== id);
      }
      return [...favoritosAtuais, id];
    });
  }

  function isFavorito(id) {
    return favoritos.includes(id);
  }

  return { favoritos, toggleFavorito, isFavorito };
}
