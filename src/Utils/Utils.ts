export const getRepoFullName = (owner: string, repo: string) => {
    return `${owner}/${repo}`;
}

export const getOwnerAndRepoFromFullName = (repoFullName: string) => {
    return repoFullName.split("/");
}