import React, {useState} from "react";
import {Textarea} from "@nextui-org/react";

// Load wink-nlp package.
import winkNLP from "wink-nlp";
// Load english language model — light version.
import model from "wink-eng-lite-web-model";

import similarity from "wink-nlp/utilities/similarity";
// Instantiate winkNLP.
const nlp = winkNLP( model );
// Obtain "its" helper to extract item properties.
const its = nlp.its;
// Obtain "as" reducer helper to reduce a collection.
const as = nlp.as;
import styles from "./NoteInput.module.css"
import {useNotesContext} from "@/app/NotesContextProvider";

export default function NoteInput({note, setNote}: {note: string, setNote: (note: string) => void}) {

    const [mostSimilarNote, setMostSimilarNote] = useState("")
    const [mostSimilarNoteScore, setMostSimilarNoteScore] = useState(0)
    const {allNotes, setAllNotes} = useNotesContext();



    function handleNoteChange(e: any) {
        if (note.length == 0) {
            setMostSimilarNote("")
            setMostSimilarNoteScore(0)
        }
        renderSimilarityScore()
    }



    // a function to return an array of similarity scores with their corresponding notes
    function getSimilarityScores() {
        return allNotes.map((n) => {
            const DBNoteDoc = nlp.readDoc(n.toLowerCase());
            const inputNoteDoc = nlp.readDoc(note.toLowerCase());

            const DBNoteBow = DBNoteDoc.tokens().out(its.value, as.bow);
            const inputNoteBow = inputNoteDoc.tokens().out(its.value, as.bow);
            // @ts-ignore
            const similarityScore = similarity.bow.cosine(DBNoteBow, inputNoteBow);
            return {
                note: n,
                similarity: similarityScore
            }
        })
    }

    function renderSimilarityScore() {

        // get the similarity scores
        const similarityScores = getSimilarityScores();
        if (similarityScores.length > 0) {
            // get the note with the highest similarity score
            const highestSimilarityScore = similarityScores.reduce((a, b) => a.similarity > b.similarity ? a : b);
            setMostSimilarNote(highestSimilarityScore.note);
            setMostSimilarNoteScore(highestSimilarityScore.similarity);
        }
    }



    return (
        <div>
            <Textarea
            className={"mt-4"}
            variant={"bordered"}
            value={note}
            onChange={event => {setNote(event.target.value)}}
            onKeyUp={handleNoteChange}
            placeholder="Write your love note here" />
            <div className={styles.similarityContainer}>
                <div className={styles.similaritySlider}>
                    <span style={{width: `${mostSimilarNoteScore * 100}%`}} className={
                        mostSimilarNoteScore < .2 ? styles.similarityLow :
                            mostSimilarNoteScore < .4 ? styles.similarityMediumLow :
                                mostSimilarNoteScore < .6 ? styles.similarityMedium :
                                    mostSimilarNoteScore < .8 ? styles.similarityMediumHigh : styles.similarityHigh
                    }></span>
                </div>


                {mostSimilarNoteScore > 0.5 ? <i className={styles.similarityText}>This note is {Math.round(mostSimilarNoteScore * 100)}% similar to the note: &quot;{mostSimilarNote}&quot;</i> : null}
            </div>
        </div>
    )
}
