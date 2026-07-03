"use client";


export default function HomePageClient() {
    // const { pending } = useFormStatus();


    return (
        <button
            type="submit"
            // disabled={pending}
            className="disabled:bg-green-800 bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
        >
            {/* {pending ? "Submitting..." : "Submit"} */} submit
        </button>
    );
}
