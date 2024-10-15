import { post } from "@/api";
import { IMovie } from "@/interfaces/movie";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const MovieCard = dynamic(() => import("@/components/MovieCard"), {
    ssr: false,
});

const getSearchResult = async (q: string) => {
    let resp;
    try {
        resp = await post("torrent", {
            query: q,
            limit: 5,
            get_image: true,
        });
    } catch (e) {
        console.log(e);
        notFound();
    }
    return resp;
};

async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
    const resp = await getSearchResult(searchParams.q);

    if (resp)
        return (
            <div className="flex flex-col gap-[8px] p-[16px] items-center">
                {resp.map((movie: IMovie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        );
}

export default SearchPage;
