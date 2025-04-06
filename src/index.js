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
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
        
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
        
        let fullYear = document.getElementById('date');
        let year = new Date(Date.now()).getFullYear();
        fullYear.innerHTML = year;

    } catch (error) {
        console.warn(error.message);
    }
}
