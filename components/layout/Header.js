import React, { useContext } from "react"
import Search from "../ui/Search"
import Navigation from "./Navigation"
import Link from "next/link"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import Button from "../ui/Button"
import { FirebaseContex } from "../../firebase"

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`

const Header = () => {
  const { user, firebase } = useContext(FirebaseContex)

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Search />

          <Navigation />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hello: {user.displayName}
              </p>

              <Button bgColor={true} onClick={() => firebase.logoff()}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor={true}>Login</Button>
              </Link>
              <Link href="/account-create">
                <Button>Crear Cuenta</Button>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  )
}

export default Header
