"use client";

import { login } from "@/actions/user.actions";
import { useActionState } from "react";

export default function HomePageClient() {
    // const { pending } = useFormStatus();

    const [state, action, pending] = useActionState(login, initialState)

    return (
        <button
            type="submit"
            disabled={pending}
            className="disabled:bg-green-800 bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
        >
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}
