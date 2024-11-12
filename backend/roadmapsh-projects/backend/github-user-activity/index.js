#!/usr/bin/env node

// Get command line arguments
const args = process.argv.slice(2);

// Git url to fetch users
const BASIC_GITHUB_URL = "https://api.github.com/users/";

// Authorized commands on the cli
const authorizedCommands = [
    "activity",
    "profile",
    "help"
]

// Help message
const helpMessage = `   
    Usage: github [command] [username]
    Commands:
        activity
        profile
        help
    `;

// Fetch data profile from github username 
async function fetchGithubData(username) {
    const response = await fetch(`${BASIC_GITHUB_URL}${username}`);
    const data = await response.json();
    return data;
}

// Fetch activity from github username
async function fetchGitHubActivity(username) {
    const response = await fetch(`${BASIC_GITHUB_URL}${username}/events`);
    const data = await response.json();
    return data;
}

// Display activity line by line 
function displayActivity(activity) {
    activity.forEach((event) => {
        const formattedDate = new Date(event.created_at);
        switch(event.type) {
            case "PushEvent":
                console.log(` - Pushed to ${event.repo.name} on ${formattedDate}`);
                break;
            case "PullRequestEvent":
                console.log(` - ${event.payload.action} pull request on ${event.repo.name} on ${formattedDate}`);
                break;
            case "CreateEvent":
                console.log(` - Created ${event.payload.ref_type} named ${event.repo.name} on ${formattedDate}`);
                break;
            case "DeleteEvent":
                console.log(` - Deleted ${event.payload.ref_type} named ${event.repo.name} on ${formattedDate}`);
                break;
            case "WatchEvent":
                console.log(` - Watched ${event.repo.name} on ${formattedDate}`);
                break;
            case "IssuesEvent":
                console.log(` - ${event.payload.action} issue on ${event.repo.name} on ${formattedDate}`);
                break;
            case "IssueCommentEvent":
                console.log(` - Commented on issue on ${event.repo.name} on ${formattedDate}`);
                break;
            case "ForkEvent":
                console.log(` - Forked ${event.repo.name} on ${formattedDate}`);
                break;
            case "ReleaseEvent":
                console.log(` - Released ${event.payload.release.tag_name} on ${event.repo.name} on ${formattedDate}`);
                break;
            case "MemberEvent":
                console.log(` - ${event.payload.action} member on ${event.repo.name} on ${formattedDate}`);
                break;
            default:
                console.log(" - Event not recognized + " + event.type);
        }
    })
}

// Display profile informations
function displayData(data) {
    console.log(`Name: ${data.name}`);
    console.log(`Username: ${data.login}`);
    console.log(`Followers: ${data.followers}`);
    console.log(`Following: ${data.following}`);
    console.log(`Public Repos: ${data.public_repos}`);
    console.log(`Public Gists: ${data.public_gists}`);
    console.log(`Bio: ${data.bio}`);
}

// Check if the user has entered any command
const username = args[1];
const command = args[0];

if (args.length < 2 || !authorizedCommands.includes(command)) {
    console.log(helpMessage);
    return;
}

// Execute the command
switch(command) {
    case "activity":
        fetchGitHubActivity(username)
            .then((data) => {
                displayActivity(data);
            })
            .catch((error) => {
                console.log("Error fetching data: " + error);
            });
        break;
    case "profile":
        fetchGithubData(username)
            .then((data) => {
                displayData(data);
            })
            .catch((error) => {
                console.log("Error fetching data: " + error);
            });
        break;
    case "help":
        console.log(helpMessage);
        break;
    default:
        console.log("Invalid command");
        console.log(helpMessage);
        break;
}
