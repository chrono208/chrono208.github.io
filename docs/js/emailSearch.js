document.getElementById('searchEmail').addEventListener('click', async (event) => {
    event.preventDefault();

    const userInput = document.getElementById('userInput').value.trim();
    const resultDiv = document.getElementById('result');
    const apiKey = document.getElementById('userAPIInput');

    if (!userInput) {
        resultDiv.innerHTML = 'Please enter some text.';
        return;
    }

    let apiUrl = "";
    
    if (mode === 'email') {
        if(apiKey.value.trim() !== ""){
            apiUrl = `https://api.hunter.io/v2/people/find?email=${encodeURIComponent(userInput)}&api_key=${encodeURIComponent(apiKey.value)}`;
        }
        else{
            apiUrl = `https://api.hunter.io/v2/people/find?email=${encodeURIComponent(userInput)}&api_key=8f61e8021b108b39681f1d241b51e48f57a815cd`;
        }

        try {
            resultDiv.innerHTML = 'Searching...'

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();

            const person = json.data;

            if(!person){
                resultDiv.innerHTML = 'No data found or not a company email.'
                return;
            }

            const fullname = person.name?.fullName;
            const domain = person.employment?.domain;
            const emailProvider = person.emailProvider;
            const indexedAt = person.indexedAt;
            const activeAt = person.activeAt;


            resultDiv.innerHTML = `
            <div class="resultBox">
                <p><strong>Name:</strong> ${fullname}</p>
                <p><strong>Domain:</strong> ${domain}</p>
                <p><strong>Email Provider:</strong> ${emailProvider}</p>
                <p><strong>Indexed At:</strong> ${indexedAt}</p>
                <p><strong>Active At:</strong> ${activeAt}</p>
            </div>
                `;
        } catch (error) {
            resultDiv.innerHTML = `Error: ${error.message}`;
            console.error('Error fetching data:', error);
        }
    } else {
        if(apiKey.value.trim() !== ""){
            apiUrl = `https://api.ipinfo.io/lite/${encodeURIComponent(userInput)}?token=${encodeURIComponent(apiKey.value)}`;
        }
        else{
            
            apiUrl = `https://api.ipinfo.io/lite/${encodeURIComponent(userInput)}?token=d86d15e80dd3a0`;
        }

        try {
            resultDiv.innerHTML = 'Searching...'

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();

            const ip = json;

            if(!ip){
                resultDiv.innerHTML = 'No data found or not a IP Address.'
                return;
            }

            const ipData = ip.ip;
            const asn = ip.asn;
            const as_name = ip.as_name;
            const as_domain = ip.as_domain;
            const country_code = ip.country_code;
            const country = ip.country;
            const continent_code = ip.continent_code;
            const continent = ip.continent;


            resultDiv.innerHTML = `
            <div class="resultBox">
                <p><strong>IP:</strong> ${ipData}</p>
                <p><strong>ASN:</strong> ${asn}</p>
                <p><strong>AS Name:</strong> ${as_name}</p>
                <p><strong>AS Domain:</strong> ${as_domain}</p>
                <p><strong>Country Code:</strong> ${country_code}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Continent Code:</strong> ${continent_code}</p>
                <p><strong>Continent:</strong> ${continent}</p>
            </div>
                `;
        } catch (error) {
            resultDiv.innerHTML = `Error: ${error.message}`;
            console.error('Error fetching data:', error);
        }
    }
    

});

let mode = 'email'; // default

document.getElementById('ipAddressButton').addEventListener('click', (event) => {
    event.preventDefault();
    const inputDiv = document.getElementById('userInput');
    mode = 'ip';
    document.getElementById('userInput').placeholder = '8.8.8.8';
    inputDiv.value = "";
});

document.getElementById('emailButton').addEventListener('click', (event) => {
    event.preventDefault();
    const inputDiv = document.getElementById('userInput');    
    mode = 'email';
    document.getElementById('userInput').placeholder = 'jane.fraser@citi.com';
    inputDiv.value = "";
});