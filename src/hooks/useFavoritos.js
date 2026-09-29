import { useEffect, useState } from "react";

export default function useFavoritos(){
    const[favoritos, setFavoritos] = useState(() =>{
        const favoritosGuardados = localStorage.getItem("favoritos");

        return favoritosGuardados ? JSON.parse(favoritosGuardados):[];

    })

    useEffect(()=> {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    function toggleFavorito(id){
        setFavoritos((favoritosAtuais) => {
            if(favoritosAtuais.includes(id)){
                return favoritosAtuais.filter((favortioId)=> favortioId !== id);
            }

            return [...favoritosAtuais, id];
        });
    }

    function isFavorito(id){
        return favoritos.includes(id);
    }

    return{
        favoritos,
        toggleFavorito,
        isFavorito,
    };
}