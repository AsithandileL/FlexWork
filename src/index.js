document.getElementById('getJobs').addEventListener('click',getJobs)
async function getJobs() {
    let url = 'https://jobicy.com/api/v2/remote-jobs';
     try {
        let response = await fetch(url);

        if(!response.ok){
            throw new Error("Something went wrong");
        }
        else{
            let jobs = await response.json();
            //console.log(jobs.jobs[0].companyName);
            document.getElementById('display').innerHTML = `Job tittle: ${jobs.jobs[0].jobTitle}`;
            
        }
     } catch (error) {
        console.warn(error.message);
     }
    
}