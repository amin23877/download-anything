import { get } from "@/api";
import DownloadStatus from "@/components/DownloadStatus";
import DownloadTrigger from "@/components/DownloadTrigger";

export const dynamic = "force-dynamic";

const getMovieId = async (id: string) => {
    let resp;
    try {
        resp = await get("torrent/download/status?id=" + id);
    } catch (e) {
        console.log(e);
        resp = "not downloaded";
    }
    return resp;
};

async function MoviePage({ params }: { params: { id: string } }) {
    const resp = await getMovieId(params.id);

    return (
        <>
            {resp === "not downloaded" ? (
                <DownloadTrigger id={params.id} />
            ) : (
                <DownloadStatus id={params.id} />
            )}
        </>
    );
}

export default MoviePage;
