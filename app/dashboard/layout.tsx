import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    // <Suspense
    //   fallback={
    //     <div className="flex h-screen w-full items-center justify-center">
    //       Loading...
    //     </div>
    //   }
    // >
    children
    // </Suspense>
  );
};

export default layout;
