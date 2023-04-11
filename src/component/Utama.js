import { useEffect, useState } from "react"
import { getMovie, searchMovie, nowPlaying, topRated, upComing } from "../API"

const Utama = () => {

    const [listMovies, setListMovies] = useState([])
    const urlImg = process.env.REACT_APP_BASEIMGURL

    useEffect ( () => {
        getMovie().then( (hasil) => {
            setListMovies(hasil)
        } )
    }, [])

    const CardMovie = () => {

        return listMovies.map( (list, i)=> {
            return (
                <div key={i} className="card">
                    <img src={`${urlImg}/${list.poster_path}`} alt="gambar" />
                    <h3>{list.title}</h3>
                    <p>{list.vote_average}</p>
                    <p>Release Date: {list.release_date}</p>
                </div>
            )
        } )
    
    }

    const search = async (q) => {
        if(q.length > 3) {
            const query = await searchMovie(q)
            setListMovies(query.results)
        }

        if(q.length < 1) {
            getMovie().then( (hasil) => {
                setListMovies(hasil)
            } )
        }
    }

    const filterBtn = async (q) => {

        if(q === "all"){
            getMovie().then( (hasil) => {
                setListMovies(hasil)
            } )

        } else if (q === "nowPlaying"){
            const final = await nowPlaying()
            setListMovies(final.results)

        } else if (q === "upcoming"){
            const final = await upComing()
            setListMovies(final.results)

        } else if (q === "topRated"){
            const final = await topRated()
            setListMovies(final.results)
        }
    }

    return (
        <>
            <nav>
                <h1>CARI FILM GAN!</h1>
            </nav>

            <main>
                <section>
                    {/* Input cari film */}
                    <input type="text" placeholder="Search Here...." onChange={ ({target}) => search(target.value) }/>


                    <div className="movie">
                        <div className="feature">
                            <select onChange={ ({target}) => filterBtn(target.value) }>
                                <option value="all">All</option>
                                <option value="nowPlaying">Now Playing</option>
                                <option value="topRated">Top Rated</option>
                                <option value="upcoming">Upcoming</option>
                            </select>
                        </div>
                        <div className="movie-list">
                            <CardMovie />
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <h2 style={{ color: 'white' }}>
                    Created by <a href="https://alwisahrul.com/">Kank Alwi</a>
                </h2>
            </footer>
        </>
    )
}

export default Utama