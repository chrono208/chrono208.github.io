document.getElementById('searchEmail').addEventListener('click', async (event) => {
    event.preventDefault();

    const userInput = document.getElementById('userEmailInput').value.trim();
    const resultDiv = document.getElementById('result');
    const apiKey = document.getElementById('userAPIInput');

    if (!userInput) {
        resultDiv.innerHTML = 'Please enter some text.';
        return;
    }

    let apiUrl = "";
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
});