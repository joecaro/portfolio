import { ButtonLink } from "@/components/Button";

export default function Page() {
    return (
        <div className='p-4 w-full h-full bg-black'>
            <h1>Test Page</h1>
            <ButtonLink href='/'>Go Home</ButtonLink>
        </div>
    );
}
