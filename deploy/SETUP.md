# Deployment prerequisites

The workflow deploys a static site from public/ when public/index.html exists.
Push changes in public/ to main to trigger deployment, or select Run workflow in GitHub Actions.

Configure these repository Actions Secrets privately:
- SSH_HOST: deployment host
- SSH_USER: deployment account
- SSH_PRIVATE_KEY: dedicated deployment private key
- SSH_KNOWN_HOSTS: host key verified through a trusted server connection

Do not commit secret values or private keys.

The server needs SSH public-key authentication, rsync, curl, and Nginx.
Have the server administrator review and install deploy/nginx.conf, check the listener is available, and validate and reload Nginx.
The deployment account needs permission to create releases and update the current link used by that configuration.

Deployments retain releases, activate through a symbolic link and check the local HTTP endpoint.
A failed HTTP check reverts activation. A successful check does not verify visual quality or external connectivity.
Domain, HTTPS, firewall setup, and credential provisioning are separate prerequisites.

The first workflow run can succeed with deployment skipped if the site has not been added. This does not mean the website is live.
