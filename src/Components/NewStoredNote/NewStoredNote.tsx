import React, {useState} from "react";
import {Button, Textarea} from "@nextui-org/react";
import NoteInput from "@/Components/NoteInput/NoteInput";

export default function NewStoredNote() {

    const [isLoading, setIsLoading] = useState(false)
    const [note, setNote] = useState("")
    // const {allNotes, setAllNotes} = useNotesContext();

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
            <NoteInput note={note} setNote={setNote}/>
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