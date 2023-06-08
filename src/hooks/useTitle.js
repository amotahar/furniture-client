const { useEffect } = require("react")

const useTitle = title => {
    useEffect(() => {
        document.title = `${title}-Wood Sell`;

    }, [title])
}

export default useTitle;
