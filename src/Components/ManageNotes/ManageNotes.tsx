import React, {useContext, useEffect, useMemo, useState} from "react";
import {
    Chip,
    Spinner,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Pagination, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import {DotsVertical, Trash} from 'tabler-icons-react';

import {useNotesContext} from "@/app/NotesContextProvider";


export default function ManageNotes() {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isDeletingID, setIsDeletingID] = useState("");
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);

    const {allNotes, setAllNotes} = useNotesContext();
   // define the type of the item
    type item = {
        note: string,
        sent: boolean,
        _id: string,
    }

    useEffect( () => {
        getNotes();

    }, []);

    const rowsPerPage = 6;

    const pages = Math.ceil(rows.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return rows.slice(start, end);
    }, [page, rows]);


    async function deleteNote(noteID: string) {
        setIsDeletingID(noteID);

        await fetch(process.env.NEXT_PUBLIC_EC2_ENDPOINT + "/api/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: noteID
            }),
        })
            .then((res: Response) => res.json())
            .then((data: any) => {
                console.log(data);
                setIsDeletingID("");
            })
            .catch((err: any) => {
                console.log(err);
                setIsDeletingID("");
            });

        // remove the note from the list
        setRows(rows.filter((row: any) => row._id != noteID));
    }



        async function getNotes() {
            setIsLoadingData(true);
            await fetch(process.env.NEXT_PUBLIC_EC2_ENDPOINT + "/api/notes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res: Response) => res.json())
                .then((data: any) => {
                    console.log(data);
                    // sort data by sent (false first)
                    data.sort((a: item, b: item) => (a.sent === b.sent) ? 0 : a.sent ? 1 : -1);
                    setRows(data);
                    setAllNotes(data.map((d: item) => d.note));
                    setIsLoadingData(false);
                })
                .catch((err: any) => {
                    console.log(err);
                    setIsLoadingData(false);
                });
        }

    const columns = [
        {
            key: "note",
            label: "NOTE",
        },
        {
            key: "sent",
            label: "STATUS",
        },
        {
            key: "actions",
            label: "ACTIONS",
        },
    ];





    return (
        <>
        <h1 className="font-semibold mb-1">Manage Notes</h1>
    <Table aria-label="Example table with dynamic content"
           bottomContent={
               <div className="flex w-full justify-center">
                   <Pagination
                       isCompact
                       showControls
                       showShadow
                       color="secondary"
                       page={page}
                       total={pages}
                       onChange={(page) => setPage(page)}
                   />
                  </div>
              }
    >
        <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>
            {items.map((item: item) => (

                <TableRow key={item._id}>
                    <TableCell>{item.note}</TableCell>
                    <TableCell>{item.sent ? <Chip color={"success"} size="sm" variant="flat">Sent</Chip> : <Chip color={"warning"} size="sm" variant="flat">Pending</Chip>}</TableCell>
                    <TableCell>
                        <div className="relative flex justify-end items-center gap-2">
                            <Dropdown className="dark:bg-[#1e1e2d] dark:text-gray-500">
                                <DropdownTrigger>
                                    <Button isIconOnly size="sm" variant="light">
                                        <DotsVertical size={18} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu  >
                                    <DropdownItem>Edit</DropdownItem>
                                    <DropdownItem
                                    onClick={() => deleteNote(item._id)}
                                    >Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>

    </Table>
</>
    )
}