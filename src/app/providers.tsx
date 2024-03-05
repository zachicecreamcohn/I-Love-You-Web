// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {NotesContextProvider} from './NotesContextProvider'
import React from "react";

export function Providers({children}: { children: React.ReactNode }) {
    return (
            <NotesContextProvider>
                <NextUIProvider>
                {children}
                </NextUIProvider>
            </NotesContextProvider>
    )
}