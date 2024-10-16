"use client";

import { get } from "@/api";
import { Button, LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { UploadRounded } from "@mui/icons-material";

function DownloadStatus({ id }: { id: string }) {
    const router = useRouter();
    const [stop, setStop] = useState(false);

    const { data, error, isLoading } = useSWR(stop ? null : "/torrent/download/status?id=" + id, get, {
        refreshInterval: 1000,
    });

    useEffect(() => {
        if (data?.progress === "100%") {
            setStop(true);
        }
    }, [data]);

    if (error)
        return (
            <div>
                <p>Something went wrong</p>
                <Button
                    onClick={() => {
                        router.refresh();
                    }}
                >
                    Reload Page
                </Button>
            </div>
        );

    return (
        <>
            <div className="w-[100%] flex flex-col items-center gap-5">
                {stop ? <div>Download Completed</div> : <div>Please Wait till we prepare your required file!</div>}
                {!stop && (
                    <>
                        <div>{data?.progress}</div>
                        <div className="w-[50%] ">
                            <LinearProgress
                                variant={isLoading ? "indeterminate" : "determinate"}
                                value={Number(data?.progress.replace("%", ""))}
                            />
                        </div>
                        <div className="flex gap-[15px] text-sm text-gray-600">
                            <span>
                                <UploadRounded />
                                {data?.upload_rate}
                            </span>
                            <span>
                                <DownloadRoundedIcon />
                                {data?.download_rate}
                            </span>
                        </div>
                    </>
                )}
                <a href={`${process.env.NEXT_PUBLIC_HOST}torrent/video_stream?id=${id}`} download>
                    <Button variant="contained">{stop ? "Download Link" : "Stream Link"}</Button>
                </a>
            </div>
        </>
    );
}

export default DownloadStatus;
