import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useDisconnect } from "wagmi"
import styles from "./header.module.css"
import { walletFormat } from "../utils"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const { disconnect } = useDisconnect()


  return (
    <header>
      <Head>
          <title>Cpone Minter</title>
          <meta name="description" content="Cryptographic Proof of NFT Endorsement" />
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.imageText}>
        <Image
          src="/buzz-on-moon.jpeg"
          alt="Buzz on the moon"
          width={75}
          height={60}
        />  &nbsp;<h2><div className={styles.orangeOne}>Cryptographic Proof of NFT Endorsement</div></h2>
      </div>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? walletFormat(session.user.name)}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  disconnect()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/siwe">
              Connect Wallet
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
