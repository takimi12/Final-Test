export const useRandomValue = () => {
    const randomize = () => {
        return Math.round(Math.random() *1000)
    }

    return randomize
}