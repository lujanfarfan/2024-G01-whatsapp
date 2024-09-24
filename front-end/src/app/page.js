"use client";
import Link from "next/link";
import Button from "./components/button";

export default function Home() {
    return (
        <Link href="/chats">
            <Button text = "chats"/>
        </Link>
    );
}
