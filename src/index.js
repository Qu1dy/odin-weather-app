import "./style.css";
import Weather from "./modules/weatherAPI";
import Renderer from "./modules/renderer";

const eventHandler = (() => {
    const form = document.querySelector("form");
    const switchButton = document.querySelector("#switch-units");
    const windspeed = document.querySelector("#windspeed");

    const isDataValid = (data) => {
        if (!data) {
            Renderer.displayError("Location not found!");
            return false;
        } else {
            Renderer.hideError();
            return true;
        }
    };

    const _getAndShowData = async (loc) => {
        const data = await Weather.get(loc);
        if (!isDataValid(data)) return;
        Renderer.renderWeather(data);
    };

    const _onSearch = async (e) => {
        e.preventDefault();
        const elements = form.elements;
        const locInput = elements[0];
        const loc = locInput.value;
        _getAndShowData(loc);
    };

    const _onSwitchButtonClick = () => {
        windspeed.classList.remove(Weather.getUnitGroup().toLowerCase());
        Weather.changeUnitGroup();
        switchButton.textContent = Weather.getUnitGroup();
        windspeed.classList.add(Weather.getUnitGroup().toLowerCase());
        form.requestSubmit();
    };

    const _handleEvents = () => {
        form.addEventListener("submit", async (e) => await _onSearch(e));
        switchButton.addEventListener("click", _onSwitchButtonClick);
    };

    const init = () => {
        _handleEvents();
        _getAndShowData("texas");
    };

    return { init };
})();

eventHandler.init();
