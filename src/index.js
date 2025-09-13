import "./style.css";
import Weather from "./modules/weatherAPI";
import Renderer from "./modules/renderer";

const eventHandler = (() => {
    const form = document.querySelector("form");

    const isDataValid = (data) => {
        if (!data) {
            Renderer.displayError("Location not found!");
            return false;
        } else {
            Renderer.hideError();
            return true;
        }
    };

    const _onSearch = async (e) => {
        e.preventDefault();
        const elements = form.elements;
        const locInput = elements[0];
        const loc = locInput.value;
        const data = await Weather.get(loc);
        if (!isDataValid(data)) return;
        Renderer.renderWeather(data);
    };

    const _handleEvents = () => {
        form.addEventListener("submit", async (e) => await _onSearch(e));
    };

    const init = () => {
        _handleEvents();
    };

    return { init };
})();

eventHandler.init();
