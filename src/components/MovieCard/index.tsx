"use client";

import { IMovie } from "@/interfaces/movie";
import classes from "./MovieCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import { numberFormatter } from "@/utils/numberHelper";
// import { ChevronRight } from "@mui/icons-material";

function MovieCard({ movie }: { movie: IMovie }) {
    return (
        <Link href={"/movie/" + movie.id} className={classes.container}>
            {movie.image ? (
                <Image
                    src={movie.image}
                    alt={movie.name}
                    width={100}
                    height={150}
                />
            ) : (
                <div></div>
            )}
            <div className={classes.details}>
                <span className={classes.name}>{movie.name}</span>
                <span className={classes.size}>
                    File Size : {numberFormatter(movie.size, 2)}B
                </span>
                {movie.imdb && (
                    <a
                        href={"https://www.imdb.com/title/" + movie.imdb}
                        target="_blank"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        Open imdb page
                    </a>
                )}
            </div>
        </Link>
    );
}

export default MovieCard;
