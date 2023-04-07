import { Button, Container, Movie, MovieList } from "./components";
import { useState, useEffect, useMemo } from "react";
import { API_KEY } from "../../config/api_key";
import { Link } from "react-router-dom";
import { ReactElement, JSXElementConstructor, ReactFragment } from "react";


export default function Home(){

    const [movies, setMovies] = useState<any[]>([])
    const image_path = "https://image.tmdb.org/t/p/w500"
    const [busca, setBusca] = useState('');
    const moviesFiltered = useMemo(() =>{ 
        const lowerBusca = busca.toLowerCase();
        return movies .filter((movie) => movie.toLowerCase().includes(lowerBusca)
        ); 

    }, [busca]);


    useEffect(() => {
      
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
            .then(response => response.json())
            .then(data => setMovies(data.results))
    }, [])

    return (
        
        <Container>
            <Button>
            <input className="d-flex bd-highlight" type="search" placeholder="Pesquisar" aria-label="Pesquisar"/>
            <button className="btn btn-outline-success my-5 my-sm-10  " type="submit">Pesquisar</button>
            <input type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)}/>
            <ul>
            {moviesFiltered.map ((movies) =>(<li key={movies}>{movies}</li> )) }
                
            </ul>

            </Button>
            
            <h1>Movies</h1>

            <MovieList>
                {
                    movies.map((movie: { id: any; poster_path: any; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined; }) => {
                        return (
                            <Movie>

                                <Link to={`/details/${movie.id}`}><img src={`${image_path}${movie.poster_path}`}/></Link>
                                <span>{movie.title}</span>
                            </Movie>
                        )
                    })
                }
            </MovieList>
        </Container>
    );
}

function startsWith(busca: string): any {
    throw new Error("Function not implemented.");
}
//alt={movie.title}form-control mr-sm-8 