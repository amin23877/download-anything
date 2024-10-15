"use client";
import { InputBase } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import classes from "./Search.module.scss";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

function Search() {
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const q = formData.get("query");
        router.push(`/search?q=${q}`);
    }

    return (
        <main className={classes.main}>
            <div className={classes.title}>Torent</div>
            <div className={classes.container}>
                <form className={classes.inputContainer} onSubmit={onSubmit}>
                    <InputBase
                        sx={{ flex: 1 }}
                        placeholder="Enter your query here"
                        name="query"
                    />
                    <button className={classes.searchBtn} type="submit">
                        <SearchRoundedIcon />
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Search;
