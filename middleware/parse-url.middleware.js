module.exports = (baseUrl) => (req, res) => {
    const params = {}
    const parsedUrl = new URL(req.url, baseUrl)

    parsedUrl.searchParams.forEach((key, value) => {
        params[key] = value
    })

    req.pathname = parsedUrl.pathname
    req.params = params
}
