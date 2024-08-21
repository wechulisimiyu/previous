"use client";
import React, { useEffect, useState, Suspense } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
        console.error("Sign-in error:", result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Unexpected error:", err);
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className={styles.container}>
        <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
        <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.input}
          />
          <button className={styles.button}>Login</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <button
          onClick={() => {
            signIn("google").catch((err) => {
              setError("Google sign-in failed.");
              console.error("Google sign-in error:", err);
            });
          }}
          className={styles.button + " " + styles.google}
        >
          Login with Google
        </button>
        <span className={styles.or}>- OR -</span>
        <Link className={styles.link} href="/dashboard/register">
          Create new account
        </Link>
      </div>
    </Suspense>
  );
};

export default Login;