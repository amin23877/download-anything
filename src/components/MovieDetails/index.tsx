import { get } from "@/api";
import { notFound } from "next/navigation";

const getOneMovie = async (id: string) => {
    let resp;
    try {
        resp = await get("torrent?torrent_id=" + id);
    } catch (e) {
        console.log(e);
        notFound();
    }
    return resp;
};

async function MovieDetails({ id }: { id: string }) {
    const movie = await getOneMovie(id);

    return <>{movie.id}</>;
}

export default MovieDetails;
