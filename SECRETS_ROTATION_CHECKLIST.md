# Secrets Rotation Checklist (urgent)

Follow this checklist immediately if any secret (API key, DB URI, private key) has been committed to the repository or exposed.

1) Inventory the exposed secrets
   - Check for any committed `.env`, `*.pem`, `*.key`, or documented secrets in `FIX-REPORT.md`, README, or other files.
   - Files found in this repo to review: `backend/.env`, `frontend/.env.example`, `FIX-REPORT.md`, any CI config files.

2) Rotate the secrets (provider-specific links)
   - MongoDB Atlas (rotate DB user's password / create a new user)
     - Steps: Create a new DB user with a strong password, update the connection string, remove the old user.
     - Docs: https://docs.atlas.mongodb.com/manage-users/

   - Cloudinary (rotate API key/secret)
     - Docs: https://cloudinary.com/documentation/admin_api#authentication

   - Firebase / Google Service Account (rotate private key)
     - Docs: https://firebase.google.com/docs/admin/setup#initialize-sdk
     - Google Cloud Console: Service Accounts → Create a new key, remove the old key.

   - JWT Secret (application signing key)
     - Action: Generate a new cryptographically strong secret and update `JWT_SECRET` in your deployment environment; invalidate or reissue tokens as appropriate.
     - How-to: Use a secure random generator (e.g., OpenSSL or Node crypto). Example: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

   - GitHub/GitLab/CI tokens (personal access tokens / deploy keys)
     - Revoke the old token and create a new one with minimal scopes.
     - Docs: GitHub - https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

   - Any OAuth client secrets (Google, Facebook, etc.)
     - Rotate on provider console and update environment variables.

3) Remove secrets from the repository (stop tracking and optionally remove from history)
   - Stop tracking `.env` and add to `.gitignore`:
     ```bash
     git rm --cached backend/.env
     echo "backend/.env" >> .gitignore
     git add .gitignore
     git commit -m "Remove .env from tracking and ignore it"
     git push
     ```
   - If secrets were committed in the past, consider rewriting history (BFG or git filter-repo) **only** if you understand the consequences (rewriting history requires force-push and coordination):
     - BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/
     - git filter-repo (recommended): https://github.com/newren/git-filter-repo

4) Verify and test
   - Update the service environment variables in your host (Render, Vercel, Netlify, etc.) to the new rotated values.
   - Redeploy and verify the application connects to services (DB, Cloudinary, Firebase).
   - Run any local or staging smoke tests (e.g., `node backend/test-connection.js`).

5) Monitor and notify
   - Verify logs for authentication failures or other errors.
   - If leaked credentials were used externally, follow the provider's incident guidance and notify stakeholders.

6) Prevention (short-term)
   - Add `.env*` to `.gitignore` (already added to root `.gitignore`).
   - Add pre-commit hooks to prevent accidental commits of secret files (husky + lint-staged). Example: prevent commits if `.env` is staged.
   - Store secrets in your host provider (Render/Vercel) or a secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.).

7) Useful commands and snippets
   - Generate a strong JWT secret (Node):
     ```bash
     node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
     ```
   - Test connection locally after setting env (PowerShell):
     ```powershell
     $env:MONGO_URI='mongodb+srv://USER:PASS@cluster0.../recircle_db?retryWrites=true&w=majority'
     node backend/test-connection.js
     ```

If you want, I can prepare a short incident PR that removes `.env` from history (using `git filter-repo`) and a script of the exact commands you should run locally. Ask and I will prepare them.
