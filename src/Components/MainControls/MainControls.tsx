"use client";

import styles from "./MainControls.module.css";
import React, {useContext} from "react";
import {NextUIProvider, Tabs, Tab, Card, CardBody, Textarea, Button} from "@nextui-org/react";
import NewStoredNote from "@/Components/NewStoredNote/NewStoredNote";
import NewInstantNote from "@/Components/NewInstantNote/NewInstantNote";
import ManageNotes from "@/Components/ManageNotes/ManageNotes";
import {useNotesContext} from "@/app/NotesContextProvider";


export default function MainControls() {
    const {allNotes, setAllNotes} = useNotesContext();
    return (
        <>
            <div className="text-left">


            <div className={styles.mainContent}>

                <div className="flex w-full flex-col">
                    <Tabs aria-label="Options">
                        <Tab key="stored" title="Add Love Note">
                            <Card className={styles.card}>
                                <CardBody>
                                    <NewStoredNote />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="instant" title="Direct Blast">
                            <Card className={styles.card}>
                                <CardBody>
                                    <NewInstantNote />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="manage" title="Manage Notes">
                            <Card className={styles.card + " " + styles.manageNotesCard}>
                                <CardBody>
                                    <ManageNotes/>
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>


            </div>
            </div>

    </>
    );
}
