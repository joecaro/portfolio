import { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => {
    return (
        <>
            
            <div style={{ minHeight: "100vw" }}>
                {children}
            </div>
        </>
    );
};

export default Page;
