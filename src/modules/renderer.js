const Renderer = (() => {
    let conditionIcon, error, weatherFields;

    const _loadGif = (name) => {
        return import(`../assets/gifs/${name}.gif`).then((gif) => gif.default);
    };

    const _cacheDom = () => {
        conditionIcon = document.querySelector(".condition-icon");
        error = document.querySelector(".error");
        weatherFields = document.querySelectorAll(".card h1, .card h2");
    };

    const renderWeather = (data) => {
        const icon = data.icon;
        _loadGif(icon).then((gif) => (conditionIcon.src = gif));
        weatherFields.forEach((field) => {
            const val = data[field.id];
            field.textContent = val;
        });
    };

    const displayError = (message) => {
        error.classList.add("active");
        error.textContent = message;
    };

    const hideError = () => {
        error.classList.remove("active");
    };

    _cacheDom();

    return { renderWeather, displayError, hideError };
})();

export default Renderer;
