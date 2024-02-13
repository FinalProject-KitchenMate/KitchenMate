'use client'
import { useSearchParams } from "next/navigation";

export default function ClientFlashComponent() {
    const searchParams = useSearchParams();
    const errorMessage = searchParams.get('error');

    return (
        <>
            {errorMessage && (
                <p className="animate-pulse rounded bg-red-500 text-white text-center">
                    {errorMessage}
                </p>
            )}
        </>
    );
}