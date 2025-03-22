export const useApi = () => {
    const get = async <R>(url: string): Promise<R> => {
        const response = await fetch(`http://localhost:3001/${url}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data: R = await response.json();
        return data;
    };

    return {
        get
    };
};
