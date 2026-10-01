# Deployment prerequisites

The workflow deploys a static site from public/ when public/index.html exists.
Push changes in public/ to main to trigger deployment, or select Run workflow in GitHub Actions.

Configure these repository Actions Secrets privately:
- SSH_HOST: deployment host
- SSH_USER: deployment account
- SSH_PRIVATE_KEY: dedicated deployment private key
- SSH_KNOWN_HOSTS: host key verified through a trusted server connection

Do not commit secret values or private keys.

The server needs SSH public-key authentication, rsync, curl, and Docker.
The dedicated mind41-landing container runs Nginx with deploy/nginx.conf, listening on container port 80 mapped to host port 8088. Mount the full landing directory at the same absolute path inside the container so release symlinks resolve correctly. Validate using docker exec mind41-landing nginx -t.
The deployment account needs permission to create releases and update the current link used by that configuration.

Deployments retain releases, activate through a symbolic link and check the local HTTP endpoint.
A failed HTTP check reverts activation. The separate Verify live landing workflow checks external HTTP access, desktop/mobile layout and interactions.
Domain, HTTPS, firewall setup, and credential provisioning are separate prerequisites.

The first workflow run can succeed with deployment skipped if the site has not been added. This does not mean the website is live.

Registration currently opens the visitor's email application; there is no server-side submission endpoint. Design illustrations are recreated in HTML/CSS using the prior prototype, rather than original exported Figma assets.
