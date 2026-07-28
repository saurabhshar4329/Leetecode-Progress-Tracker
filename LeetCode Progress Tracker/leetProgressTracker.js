document.addEventListener("DOMContentLoaded",function() {

    const searchButton = document.getElementById("search-button");
    const userNameInput = document.getElementById("user-input");
    const easyLevel = document.getElementById("easy-lable");
    const hardLevel = document.getElementById("hard-lable");
    const mediumLevel = document.getElementById("medium-lable");

    const statsContainer = document.querySelector(".stats-container");
    const easyProgramCircle = document.querySelector(".easy-program");
    const mediumProgramCircle = document.querySelector(".medium-program");
    const hardProgramCircle = document.querySelector(".hard-program");
    const cardStatsContainer = document.querySelector(".stats-cards");


    function validateUsername(username){
        if(username.trim() ==="") {
            alert("username should not be empty");
            return false;
        }
        const regularExpression = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regularExpression.test(username);
        if(!isMatching){
            alert("invalid username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {

        try{
            searchButton.textContent = "searching.......";
            searchButton.disabled = true;

            const proxyUrl = `http://cors-anywhere.herokuapp.com/`
            const targetUrl = 'https://leetcode.com/graphql/';

            const myHeaders = new Headers();
            myHeaders.append("Content-Type","application/json");

            const graphql = JSON.stringify( {
            query: `
                query userSessionProgress($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                            totalSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                        }
                    }
                }
            `,
                variables: {
                "username": `${username}`
                }   
            })

            const requestOption = {
                method:"POST",
                headers:myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyUrl+targetUrl, requestOption);

            if(!response.ok){
                throw new Error("unable to fetch the user's details");
            }
            const parsedata = await response.json();
            console.log("Login data: ", parsedata);

            displayUserData(parsedata);
        }
        catch(error) {
            statsContainer.innerHTML = `${error.message}`
        }
        finally {
            searchButton.textContent = "search";
            searchButton.disabled = false;
        }
        
    }


    function updateProgress(solved,total, lable, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        lable.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedata) {
        const totalQus = parsedata.data.allQuestionsCount[0].count;
        const totalEasyQus = parsedata.data.allQuestionsCount[1].count;
        const totalMediumQus = parsedata.data.allQuestionsCount[2].count;
        const totalHardQus = parsedata.data.allQuestionsCount[3].count;


        const totalSolvedQus = parsedata.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const totalSolvedEasyQus = parsedata.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const totalSolvedMediumQus = parsedata.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const totalSolvedHardQus = parsedata.data.matchedUser.submitStats.acSubmissionNum[3].count;


        updateProgress(totalSolvedEasyQus, totalEasyQus, easyLevel, easyProgramCircle);
        updateProgress(totalSolvedMediumQus, totalMediumQus, mediumLevel, mediumProgramCircle);
        updateProgress(totalSolvedHardQus, totalHardQus, hardLevel, hardProgramCircle);
       

        const cardsData = [
            {label: "overall Submission", value:parsedata.data.matchedUser.submitStats.totalSubmissionNum[0].submissions },
            {label: "overall Easy Submission", value:parsedata.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
            {label: "overall Medium Submission", value:parsedata.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
            {label: "overall Hard Submission", value:parsedata.data.matchedUser.submitStats.totalSubmissionNum[3].submissions }
        ];
        console.log("cards ka data yaha h", cardsData);

        cardStatsContainer.innerHTML = cardsData.map(
            data => {
                return`
                <div class="card">
                <h4>${data.label}</h4>
                <p>${data.value}</p>
                </div>`
            }
        ).join(" ");

    }
    searchButton.addEventListener("click", function() {
        const username = userNameInput.value;
        console.log("logging username : ", username);
        if(validateUsername(username)) {
            fetchUserDetails(username);
        }
    })


})