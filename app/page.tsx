"use client";

import { login, type LoginState } from "@/actions/user.actions";
import { useActionState } from "react";

const initialState: LoginState = {
    success: false,
    message: "",
}

export default function LoginPage() {

    const [state, action, pending] = useActionState(login, initialState);

    return (
        <main className="flex flex-col gap-4 p-4">
            <section className="flex flex-col gap-4 p-4 bg-gray-100 border border-gray-200">
                <h1 className="text-4xl">Login</h1>

                {state.message && (
                    <div className="bg-red-300/50 border border-red-500 text-red-600 p-4">
                        {state.message}
                    </div>
                )}

                <form className="flex flex-col gap-4" action={action}>
                    <label htmlFor="username">Username: </label>
                    <input
                        name={"username"}
                        id="username"
                        type="text"
                        placeholder="johndoe01"
                        className="bg-white p-2 text-sm"
                    />

                    <label htmlFor="password">Password: </label>
                    <input
                        name={"password"}
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="bg-white p-2 text-sm"
                        minLength={8}
                    />

                    <button
                        type="submit"
                        disabled={pending}
                        className="disabled:bg-green-800 bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
                    >
                        {pending ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </section>
        </main>
    );
}
