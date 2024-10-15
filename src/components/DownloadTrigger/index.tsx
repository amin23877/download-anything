"use client";

import { get } from "@/api";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DownloadTrigger({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await get("torrent/download?id=" + id);
        setLoading(false);
        router.refresh();
    };

    return (
        <Button variant="contained" onClick={handleClick} disabled={loading}>
            Request Download Link
        </Button>
    );
}

export default DownloadTrigger;
