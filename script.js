document.addEventListener("DOMContentLoaded", function () {
    const url_input = document.getElementById("url_input");
    const fetch_button = document.getElementById("fetch_button");
    const data_container = document.getElementById("data_container");

    fetch_button.addEventListener("click", function () {
        const url = url_input.value;

        if (url) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    if (Array.isArray(data) && data.length > 0) {
                        const table = document.createElement("table");
                        const thead = table.createTHead();
                        const tbody = table.createTBody();
                        const headerRow = thead.insertRow();

                        for (const key in data[0]) {
                            const th = document.createElement("th");
                            th.textContent = key;
                            headerRow.appendChild(th);

                            if (!isNaN(data[0][key])) {
                                th.style.textAlign = "center";
                            }
                        }

                        thead.style.textAlign = "center";

                        data.forEach(function (item) {
                            const row = tbody.insertRow();
                            for (const key in item) {
                                const cell = row.insertCell();
                                cell.textContent = item[key];

                                // Center-align columns with integer data type
                                if (!isNaN(item[key])) {
                                    cell.style.textAlign = "center";
                                }
                            }
                        });

                        data_container.innerHTML = "";
                        data_container.appendChild(table);
                    } else {
                        data_container.innerHTML = "Data not found";
                    }
                } else if (xhr.readyState === 4 && xhr.status !== 200) {
                    console.error("An error occurred in retrieving data");
                    data_container.innerHTML = "An error occurred in retrieving data";
                }
            };
            xhr.send();
        } else {
            data_container.innerHTML = "Please enter the URL first";
        }
    });
});
