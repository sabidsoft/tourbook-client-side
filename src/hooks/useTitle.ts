import { useEffect } from "react";

const useTitle = (title: string): void => {
    useEffect(() => {
        if (title === "Home") {
            document.title = `Tourbook`;
        } else {
            document.title = `${title} | Tourbook`;
        }
    }, [title])
}

export default useTitle;