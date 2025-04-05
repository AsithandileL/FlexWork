window.addEventListener('DOMContentLoaded', getJobs);
async function getJobs() {
    const url = 'https://jobicy.com/api/v2/remote-jobs';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const jobs = await response.json();
        const jobsList = jobs.jobs.slice(0, 50);
        const displayContainer = document.getElementById('display');
        displayContainer.innerHTML = ''; // Clear existing content

        jobsList.forEach(job => {
            const date = new Date(job.pubDate);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${
                (date.getMonth() + 1).toString().padStart(2, '0')
            }/${date.getFullYear()}`;

            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');

            jobCard.innerHTML = `
                <img src="${job.companyLogo}" alt="${job.companyName}" style="width:100px;"><br/>
                <strong>${job.companyName}</strong><br/>
                ${job.jobTitle}<br/>
                ${formattedDate}<br/>
                ${job.annualSalaryMin ? `R${(job.annualSalaryMin*18.5).toLocaleString('en-ZA')} anually` : 'Salary not listed'}<br/><br/>
                <a href="${job.url}" target="_blank">Apply Now <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                <hr/>
            `;

            displayContainer.appendChild(jobCard);
        });
        let fullYear = document.getElementById('date');
        let year = new Date(Date.now()).getFullYear();
        fullYear.innerHTML = year;

    } catch (error) {
        console.warn(error.message);
    }
}
