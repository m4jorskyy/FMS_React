//main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,           // nigdy nie przeterminowuje danych
            cacheTime: Infinity,           // trzyma cache dopóki działa appka
            refetchOnWindowFocus: false,   // nie fetchuje po powrocie okna
            refetchOnReconnect: false,     // nie fetchuje po przywróceniu sieci
            refetchOnMount: false,         // nie fetchuje przy remoncie komponentu
            retry: 2
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </QueryClientProvider>
)
