import React, {useState} from "react";
import {Button, Textarea} from "@nextui-org/react";
import NoteInput from "@/Components/NoteInput/NoteInput";

export default function NewInstantNote() {

    const [isLoading, setIsLoading] = useState(false)
    const [note, setNote] = useState("")

    async function uploadNote() {
        setIsLoading(true)
        console.log("Sending note to print")


        await fetch(process.env.NEXT_PUBLIC_EC2_ENDPOINT + "/api/insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                note: note,
                printNow: true,
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
                }
            )
        setNote("")

    }

    return (
        <>
            <h1 className="font-semibold mb-1">Send a Note Instantly!</h1>
            <p>This note will sent for printing immediately</p>
            <NoteInput note={note} setNote={setNote}/>
            <Button
                onClick={uploadNote}
                className={"mt-4"} size="md" color={"primary"}>
                {isLoading ? "Sending..." : "Send to Print Now"}

            </Button>
        </>
    )
}