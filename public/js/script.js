async function getCareerAdvice() {
    const careerGoal = document.getElementById('career-goal').value;
    const skills = document.getElementById('skills').value;

    // Validate if at least one of the inputs is provided
    if (!careerGoal.trim() && !skills.trim()) {
        alert('Please enter your career goal or skills!');
        return;
    }

    const adviceContainer = document.getElementById('career-advice');
    adviceContainer.innerHTML = '<div class="spinner"></div> Generating career advice... Please wait.';

    // Construct the prompt for career advice based on input values
    let prompt = "Provide detailed career advice based on the following information:";
    if (careerGoal.trim()) {
        prompt += ` Career Goal: ${careerGoal}.`;
    }
    if (skills.trim()) {
        prompt += ` Skills: ${skills}.`;
    }
    prompt += " Provide actionable steps, suggest relevant resources, and include industry insights.";

    // Fetch the career advice data from the API
    await fetchCareerData(prompt, adviceContainer);
}

async function generateCareerSuggestions() {
    const skills = document.getElementById('skills').value;

    // Validate if skills input is provided
    if (!skills.trim()) {
        alert('Please enter your skills to get career suggestions!');
        return;
    }

    const suggestionsContainer = document.getElementById('career-suggestions');
    suggestionsContainer.innerHTML = '<div class="spinner"></div> Suggesting careers... Please wait.';

    // Construct the prompt for career suggestions based on skills
    const prompt = `Based on these skills: ${skills}, suggest atleast 5 detailed suitable careers with a brief description of why they are a good fit.`;

    // Fetch the career suggestions data from the API
    await fetchCareerData(prompt, suggestionsContainer);
}

async function fetchCareerData(prompt, container) {
    const apiUrl = 'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct'; // API endpoint
    const apiKey = 'Bearer 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'; // Replace with your Hugging Face API key

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: prompt })
        });

        const data = await response.json();

        // Handle API response and display generated text
        if (data && (data.generated_text || (data[0] && data[0].generated_text))) {
            container.innerText = data.generated_text || data[0].generated_text;
        } else {
            container.innerText = 'Sorry, we couldn\'t generate meaningful results. Please try again later.';
        }
    } catch (error) {
        container.innerText = 'An error occurred. Please try again later.Or check your network connection';
        console.error('Error fetching data:', error);
    }
}
