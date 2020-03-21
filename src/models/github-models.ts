// /:owner/:repo/

export interface RepoGh {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner_Repo;
    html_url: string;
    description?: any;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage?: any;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url?: any;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: License_Repo;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    temp_clone_token?: any;
    organization: Organization_Repo;
    network_count: number;
    subscribers_count: number;
}

export interface Owner_Repo {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface License_Repo {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

export interface Organization_Repo {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}


// /:owner/:repo/branches

export interface BranchGh {
    name: string;
    commit: Commit_Branch;
    protected: boolean;
}

export interface Commit_Branch {
    sha: string;
    url: string;
}

// /:owner/:repo/commits

export interface CommitGh {
    sha: string;
    node_id: string;
    commit: Commit_Commit;
    url: string;
    html_url: string;
    comments_url: string;
    author: Author2;
    committer: Committer2;
    parents: Parent[];
}

export interface Author_Commit {
    name: string;
    email: string;
    date: Date;
}

export interface Committer_Commit {
    name: string;
    email: string;
    date: Date;
}

export interface Tree_Commit {
    sha: string;
    url: string;
}

export interface Verification_Commit {
    verified: boolean;
    reason: string;
    signature: string;
    payload: string;
}

export interface Commit_Commit {
    author: Author_Commit;
    committer: Committer_Commit;
    message: string;
    tree: Tree_Commit;
    url: string;
    comment_count: number;
    verification: Verification_Commit;
}

export interface Author2 {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Committer2 {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Parent {
    sha: string;
    url: string;
    html_url: string;
}


// Comparison

export interface ComparisonBranchGh {
    url: string;
    html_url: string;
    permalink_url: string;
    diff_url: string;
    patch_url: string;
    base_commit: BaseCommit_ComparisonBranch;
    merge_base_commit: MergeBaseCommit_ComparisonBranch;
    status: string;
    ahead_by: number;
    behind_by: number;
    total_commits: number;
    commits: any[];
    files: any[];
}

export interface Author_ComparisonBranch {
    name: string;
    email: string;
    date: Date;
}

export interface Committer_ComparisonBranch {
    name: string;
    email: string;
    date: Date;
}

export interface Tree_ComparisonBranch {
    sha: string;
    url: string;
}

export interface Verification_ComparisonBranch {
    verified: boolean;
    reason: string;
    signature: string;
    payload: string;
}

export interface Commit_ComparisonBranch {
    author: Author_ComparisonBranch;
    committer: Committer_ComparisonBranch;
    message: string;
    tree: Tree_ComparisonBranch;
    url: string;
    comment_count: number;
    verification: Verification_ComparisonBranch;
}

export interface Author2_ComparisonBranch {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Committer2_ComparisonBranch {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Parent_ComparisonBranch {
    sha: string;
    url: string;
    html_url: string;
}

export interface BaseCommit_ComparisonBranch {
    sha: string;
    node_id: string;
    commit: Commit_ComparisonBranch;
    url: string;
    html_url: string;
    comments_url: string;
    author: Author2;
    committer: Committer2;
    parents: Parent[];
}

export interface Author3_ComparisonBranch {
    name: string;
    email: string;
    date: Date;
}

export interface Committer3_ComparisonBranch {
    name: string;
    email: string;
    date: Date;
}

export interface Tree2_ComparisonBranch {
    sha: string;
    url: string;
}

export interface Verification2_ComparisonBranch {
    verified: boolean;
    reason: string;
    signature: string;
    payload: string;
}

export interface Commit2_ComparisonBranch {
    author: Author3_ComparisonBranch;
    committer: Committer3_ComparisonBranch;
    message: string;
    tree: Tree2_ComparisonBranch;
    url: string;
    comment_count: number;
    verification: Verification2_ComparisonBranch;
}

export interface Author4_ComparisonBranch {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Committer4_ComparisonBranch {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Parent2_ComparisonBranch {
    sha: string;
    url: string;
    html_url: string;
}

export interface MergeBaseCommit_ComparisonBranch {
    sha: string;
    node_id: string;
    commit: Commit2_ComparisonBranch;
    url: string;
    html_url: string;
    comments_url: string;
    author: Author4_ComparisonBranch;
    committer: Committer4_ComparisonBranch;
    parents: Parent2_ComparisonBranch[];
}