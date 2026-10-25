# Manual home-server deployment

Production: https://jhnbrd.com

Server checkout: `/mnt/projects/Projects/portfolio`. This differs from the local development checkout.

## Update the server

After the release commit is pushed:

```sh
cd /mnt/projects/Projects/portfolio &&
git pull --ff-only origin main &&
docker compose config --quiet &&
docker compose up -d --build
```

The `&&` stops the sequence if an earlier step fails. Keep existing runtime configuration and persistent data intact.

## Verify

```sh
git log -1 --format='%H %s'
docker compose ps
curl -fsS http://127.0.0.1:8000/ -o /dev/null
curl -fsS https://jhnbrd.com/ -o /dev/null
```

Check the updated Lilimio release timestamp in a fresh browser session. The HTTP checks establish reachability, not the exact running frontend revision; this app currently has no build-info endpoint. Compare the source checkout revision with the intended release commit and confirm the new UI after rebuilding.

## Publish and record

Prepare a draft release for the exact tested commit before the update. After the server operator confirms the update and revision, publish that draft, then record the verified commit:

```sh
gh workflow run deployment.yml -f deployed_ref=<verified-server-commit-sha>
```

The workflow records an owner-reported manual deployment under `Production`, with https://jhnbrd.com as its URL. It does not connect to the server or deploy anything. Pushes do not automatically claim successful deployments.
