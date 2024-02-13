import React, {useState} from "react";
import {Button, Textarea} from "@nextui-org/react";

export default function NewStoredNote() {

    const [isLoading, setIsLoading] = useState(false)
    const [note, setNote] = useState("")

    async function uploadNote() {
        setIsLoading(true)

        await fetch(process.env.NEXT_PUBLIC_EC2_ENDPOINT + "/api/insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                note: note,
                printNow: false,
            })
        })
            .then((res: Response) => res.json())
            .then((data: any) => {
                console.log(data)
                setIsLoading(false)
            })
            .catch((err: any) => {
                    console.log(err)
                    setIsLoading(false)

        })

        setNote("")

    }

    return (
        <>
            <h1 className="font-semibold mb-1">Pen a note</h1>
            <p>This note will be added to the database. On a random day, it will be printed on Nina&apos;s thermal printer.</p>
            <Textarea
                className={"mt-4"}
                variant={"bordered"}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your love note here" />
            <Button
                isLoading={isLoading}
                className={"mt-4"} size="md" color={"primary"}
                onClick={ uploadNote }
            >
                {isLoading ? "Uploading..." : "Upload"}
            </Button>
        </>
    )
}