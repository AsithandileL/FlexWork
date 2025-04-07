let jobsList = []; // Global variable to store the jobs

window.addEventListener('DOMContentLoaded', async () => {
    await getJobs(); // Populate jobsList
    displayJobs(jobsList); // Initial render
    setupSortMenu(); // Attach sort listener
    document.getElementById('searchInput').addEventListener('input', searchJobs);

});

async function getJobs() {
    const url = 'https://jobicy.com/api/v2/remote-jobs';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
        jobsList = data.jobs.slice(0, 50); // Save globally

    } catch (error) {
        console.warn(error.message);
    }
}

// Function to render the jobs
function displayJobs(jobs) {
    const displayContainer = document.getElementById('display');
    displayContainer.innerHTML = ''; // Clear previous content

    jobs.forEach(job => {
        const date = new Date(job.pubDate);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');

        jobCard.innerHTML = `
            <img src="${job.companyLogo}" alt="${job.companyName}" style="width:100px;"><br/>
            <strong style="font-size:1.1em">${job.companyName}</strong><br/><br/>
            <div style="text-align: center; font-size:0.9em">
                Title: ${job.jobTitle}<br/>
                Publish date: ${formattedDate}<br/>
                Salary: ${job.annualSalaryMin ? `R${(job.annualSalaryMin * 19).toLocaleString('en-ZA')} annually` : 'Salary not listed'}<br/><br/>
            </div>
            <a href="${job.url}" target="_blank">Apply Now <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            <hr/>
        `;

        displayContainer.appendChild(jobCard);
    });

    const fullYear = document.getElementById('date');
    if (fullYear) fullYear.innerHTML = new Date().getFullYear();
}

// Function to setup sorting
function setupSortMenu() {
    const sortMenu = document.getElementById('sortMenu');

    sortMenu.addEventListener('change', (e) => {
        const value = e.target.value;
        let sortedJobs = [...jobsList]; // Clone array

        if (value === 'salary') {
            sortedJobs.sort((a, b) => (b.annualSalaryMin || 0) - (a.annualSalaryMin || 0));
        } else if (value === 'category') {
            sortedJobs.sort((a, b) => a.companyName.localeCompare(b.companyName));
        }

        displayJobs(sortedJobs);
    });
}

function searchJobs(event) {
    const query = event.target.value.toLowerCase(); // lowercase for case-insensitive match

    const filteredJobs = jobsList.filter(job => {
        const company = job.companyName.toLowerCase();
        const title = job.jobTitle.toLowerCase();
        return company.includes(query) || title.includes(query);
    });

    displayJobs(filteredJobs); // Re-render with filtered list
}
