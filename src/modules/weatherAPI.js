const Weather = (() => {
    let unitGroup = "metric";

    const _getData = async (location) => {
        const params = new URLSearchParams({
            key: "CH6PRASLY5BSBPUJ8Q7PLEQC8",
            unitGroup: unitGroup,
            iconSet: "icons1",
        });

        const resp = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?${params}`
        );
        if (!resp.ok) {
            return null;
        }
        return await resp.json();
    };

    const _sanitizeData = (data) => {
        if (!data) return null;
        const location = data.resolvedAddress;
        const cond = data.currentConditions;
        const today = data.days[0];
        const {
            conditions,
            icon,
            datetime,
            humidity,
            feelslike,
            temp,
            windspeed,
        } = cond;
        const { tempmin, tempmax } = today;

        return {
            conditions,
            humidity,
            icon,
            feelslike,
            temp,
            location,
            datetime,
            windspeed,
            tempmin,
            tempmax,
        };
    };

    const get = async (location) => {
        const data = await _getData(location);
        const sanitized = _sanitizeData(data);
        return sanitized;
    };

    const changeUnitGroup = () => {
        unitGroup = unitGroup === "metric" ? "us" : "metric";
    };

    return { get, changeUnitGroup };
})();

export default Weather;
