"use server";

import { redirect } from "next/navigation";

export interface LoginState {
    success: boolean;
    message: string;
}

export async function login(previousState: LoginState, formData: FormData): Promise<LoginState> {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;


    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        console.log("Login successful!");
        return {
            success: true,
            message: "Login successful"
        }
    } else {
        console.log("Login unsuccessful!");
        return {
            success: false,
            message: "Invalid credentials"
        }
    }
}
