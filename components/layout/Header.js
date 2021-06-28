import React from 'react';
import Search from "../ui/Search";
import Navigation from "./Navigation";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Search />

                    <Navigation />
                </div>

                <div>
                    <p>Hello: Armando</p>

                    <button type="button">Cerrar Sesión</button>

                    <Link href="/">Login</Link>
                    <Link href="/">Crear Cuenta</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
